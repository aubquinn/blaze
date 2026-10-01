# Blaze client

The site uses Next.js App Router, React, TypeScript, and the Astryx design system. Its existing Home, ContactForm, and Writing components are reused by the route files.

## Development

Use Node.js 24 LTS and pnpm 11. From `client/`:

```sh
pnpm install
pnpm dev
```

Open http://localhost:3000. Next.js handles the application; Vite is used by Storybook and Vitest only.

## Routes and components

| URL        | Next.js route              | Existing component            |
| ---------- | -------------------------- | ----------------------------- |
| `/`        | `src/app/page.tsx`         | `src/home/Home.tsx`           |
| `/contact` | `src/app/contact/page.tsx` | `src/contact/ContactForm.tsx` |
| `/writing` | `src/app/writing/page.tsx` | `src/writing/Writing.tsx`     |

`src/app/layout.tsx` supplies the document, global Astryx CSS, page metadata, and shared layout. `src/shared/Providers.tsx` supplies the theme in both the application and Storybook. `src/shared/SiteShell.tsx` renders the navigation and the active route's `children`.

Navigation uses Astryx items with `as={Link}` from `next/link`. `usePathname()` supplies the selected state. At 1024px and above the navigation appears at the side; below 1024px the three links remain visible horizontally at the top. `src/app/not-found.tsx` handles unknown URLs.

The current routes are prerendered at build time. Client components provide interactive behavior while the page content is also present in the initial HTML. The Writing page remains a placeholder. The contact form remains the existing UI; sending messages requires a future backend integration.

To add a route, create a `page.tsx` under `src/app` with a default component export. Import a reusable component there and add a navigation entry in `src/navigation/Navigation.tsx` when appropriate.

## Commands

| Command                | Purpose                                                  |
| ---------------------- | -------------------------------------------------------- |
| `pnpm dev`             | Run the Next.js development server                       |
| `pnpm build`           | Build and prerender the production application           |
| `pnpm start`           | Serve an existing production build                       |
| `pnpm typecheck`       | Generate Next.js route types and check TypeScript        |
| `pnpm lint`            | Run Next.js, React, TypeScript, and Storybook lint rules |
| `pnpm storybook`       | Open Storybook on port 6006                              |
| `pnpm build-storybook` | Build Storybook into `storybook-static/`                 |

Storybook uses `@storybook/nextjs-vite` with `nextjs.appDirectory: true` to mock Next.js navigation and images. A story can set `parameters.nextjs.navigation.pathname` to preview a selected route.

The existing Storybook/Vitest integration is retained in `vitest.config.ts`. No routing test suite has been added.

TypeScript 5.9, ESLint 9, and Vitest 4 match the supported peer ranges of the current integrations. The pnpm lockfile fixes the resolved versions; avoid replacing these ranges with `latest`.

## Deployment

Run `pnpm build`, then `pnpm start` on a Node.js host that supports Next.js, or use a Next.js hosting integration. `.next/` is the application build output; the old Vite `dist/` directory is no longer used.

### Docker and App Runner

The `Dockerfile` builds the app with Node.js 24 and pnpm, then copies Next.js standalone output and static assets into a smaller runtime image. From `client/`, build and push it to the ECR repository:

```powershell
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin 950219440008.dkr.ecr.eu-west-1.amazonaws.com
docker build -t blaze_client .
docker tag blaze_client:latest 950219440008.dkr.ecr.eu-west-1.amazonaws.com/blaze_client:latest
docker push 950219440008.dkr.ecr.eu-west-1.amazonaws.com/blaze_client:latest
```

Create an App Runner service from that ECR image, using container port `3000` and `/` as the health-check path. The image starts Next.js with `HOSTNAME=0.0.0.0` so App Runner can reach it. Do not pass secrets as Docker build arguments; configure runtime secrets in App Runner.

### GitHub Actions deployment

`.github/workflows/deploy-client.yml` builds and pushes the client image after changes to `client/` are pushed to `main` (including merged pull requests), then asks App Runner to deploy the `latest` tag. It also supports manual runs from GitHub Actions. Docker runs on GitHub's hosted runner; it is not required on a developer machine.

Before enabling the workflow:

1. Create an App Runner service from `950219440008.dkr.ecr.eu-west-1.amazonaws.com/blaze_client:latest`, with automatic deployments disabled because the workflow calls `start-deployment` explicitly.
2. Add the GitHub repository secrets `AWS_ROLE_ARN` and `APP_RUNNER_SERVICE_ARN`.
3. Configure the AWS role to trust GitHub's OIDC provider for this repository's `main` ref. Grant it ECR push permissions for `blaze_client`, `ecr:GetAuthorizationToken`, and `apprunner:StartDeployment` for the service.
4. Give App Runner its own ECR access role so it can pull the private image. This is separate from the GitHub deployment role.

The workflow tags each image with the commit SHA for traceability and also pushes `latest`, which is the tag configured in App Runner.

This project does not configure a static export. Although the current pages are prerendered, the default image optimizer and future article revalidation use a Next.js runtime.

The ASP.NET Core API and AWS services described in the architecture decisions remain planned work. See [technology choices](../decisions/stack-choice.md) and [rendering strategy](../decisions/rendering-strategy.md).

## References

- [Next.js layouts and pages](https://nextjs.org/docs/app/getting-started/layouts-and-pages)
- [Next.js linking and navigation](https://nextjs.org/docs/app/getting-started/linking-and-navigating)
- [Storybook for Next.js with Vite](https://storybook.js.org/docs/get-started/frameworks/nextjs-vite)
