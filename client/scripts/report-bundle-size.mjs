import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";

const clientDirectory = fileURLToPath(new URL("..", import.meta.url));
const staticDirectory = join(clientDirectory, ".next", "static");

if (!existsSync(staticDirectory)) {
  console.error("No production assets found. Run `pnpm build` first.");
  process.exit(1);
}

function collectAssets(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectAssets(path);
    }

    return /\.(?:js|css)$/.test(entry.name) ? [path] : [];
  });
}

const assets = collectAssets(staticDirectory).map((path) => {
  const content = readFileSync(path);
  return {
    path: relative(staticDirectory, path).replaceAll("\\", "/"),
    type: path.endsWith(".css") ? "css" : "js",
    rawSize: statSync(path).size,
    gzipSize: gzipSync(content).length,
  };
});

const totalRawSize = assets.reduce((total, asset) => total + asset.rawSize, 0);
const totalGzipSize = assets.reduce((total, asset) => total + asset.gzipSize, 0);
const formatSize = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

console.log("\nProduction client bundle (.next/static JS/CSS)");
console.log(`Assets: ${assets.length}`);
console.log(`Raw: ${formatSize(totalRawSize)}`);
console.log(`Estimated gzip: ${formatSize(totalGzipSize)} per-file total`);
console.log("Largest assets:");

for (const asset of assets.sort((first, second) => second.rawSize - first.rawSize).slice(0, 5)) {
  console.log(
    `  ${formatSize(asset.rawSize).padStart(9)} raw  ${formatSize(asset.gzipSize).padStart(9)} gzip  ${asset.path}`,
  );
}

const appOutputDirectory = join(clientDirectory, ".next", "server", "app");
const prerenderManifestPath = join(clientDirectory, ".next", "prerender-manifest.json");

if (existsSync(prerenderManifestPath)) {
  const prerenderManifest = JSON.parse(readFileSync(prerenderManifestPath, "utf8"));
  const assetsByUrl = new Map(
    assets.map((asset) => [`/_next/static/${asset.path}`, asset]),
  );
  const routeSizes = Object.keys(prerenderManifest.routes)
    .filter((route) => route !== "/_not-found" && route !== "/_global-error")
    .flatMap((route) => {
      const htmlPath = join(
        appOutputDirectory,
        route === "/" ? "index.html" : `${route.slice(1)}.html`,
      );
      if (!existsSync(htmlPath)) {
        return [];
      }

      const html = readFileSync(htmlPath, "utf8");
      const assetUrls = new Set(
        [...html.matchAll(/(?:src|href)="([^"]*\/_next\/static\/[^"?#]+\.(?:js|css)(?:\?[^\"]*)?)"/g)]
          .map((match) => match[1].split("?")[0]),
      );
      const routeAssets = [...assetUrls]
        .map((url) => assetsByUrl.get(url))
        .filter(Boolean);
      const totals = routeAssets.reduce(
        (result, asset) => {
          result[asset.type].rawSize += asset.rawSize;
          result[asset.type].gzipSize += asset.gzipSize;
          return result;
        },
        {
          js: { rawSize: 0, gzipSize: 0 },
          css: { rawSize: 0, gzipSize: 0 },
        },
      );

      return [{ route, assetCount: routeAssets.length, totals }];
    });

  console.log("\nInitial assets referenced by each prerendered route (shared files included)");
  for (const { route, assetCount, totals } of routeSizes) {
    const rawSize = totals.js.rawSize + totals.css.rawSize;
    const gzipSize = totals.js.gzipSize + totals.css.gzipSize;
    console.log(
      `  ${route.padEnd(14)} ${assetCount} assets  ${formatSize(rawSize).padStart(9)} raw  ${formatSize(gzipSize).padStart(9)} gzip  (JS ${formatSize(totals.js.gzipSize)}, CSS ${formatSize(totals.css.gzipSize)})`,
    );
  }
}
