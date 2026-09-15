# Technology Stack

```text
Next.js frontend
      ↓
ASP.NET Core API
      ↓
┌───────────────┬───────────────┐
│               │               │
RDS PostgreSQL  S3              SQS
articles/data   images          async jobs
                                ↓
                              Lambda
```

```text
Next.js
ASP.NET Core
Entity Framework Core
PostgreSQL on RDS
S3 + CloudFront
```

```text
Next.js / TypeScript
    → frontend architecture

Astryx

    → accessible UI + design-system practice

ASP.NET Core / C#
    → backend

PostgreSQL / RDS
    → relational data

AWS
    → cloud architecture + deployment
```

The frontend will be written in React, TypeScript, HTML, CSS, and Next.js. Next.js is chosen for SSR capabilities.
Astryx is chosen for accessibility and as a design system. Design systems allow consumers to avoid building buttons, forms, dialogs, inputs, spacing rules, theming and accessibility primitives from scratch.

The backend will be written in C#. While Node.js could be used for this simple backend, C# offers type safety and it is well-supported on AWS.

AWS is chosen for the site business logic and hosting. It will give the blog a realistic cloud architecture: RDS PostgreSQL for relational data, S3 for media, CloudFront for CDN delivery, SQS/Lambda for async work, and hosting/deployment.
