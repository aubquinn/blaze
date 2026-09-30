import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import { Providers } from "../shared/Providers";
import { SiteShell } from "../shared/SiteShell";

export const metadata: Metadata = {
  title: {
    default: "Aubrey Quinn",
    template: "%s | Aubrey Quinn",
  },
  description: "Software engineering and writing by Aubrey Quinn.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
