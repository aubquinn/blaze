# Article Schema

This document describes the blog post article schema.

Conceptually, a blog post will have:

- an author
- a datetime stamp
- a unique identifier
- a title
- a quick summary
- content (a 'body')
- relevant tags
- a status
- last updated
- a slug (a slug is the human-readable part of a URL that identifies a particular page)

Schema in TypeScript:

```ts
type ArticleStatus = "draft" | "published";

type Article = {
  id: string;

  // URL / SEO
  slug: string;
  title: string;
  summary: string;

  // Content
  body: string; // Markdown
  tags: Tag[];

  // Ownership
  author: string;

  // Publication
  status: ArticleStatus;
  publishedAt: Date | null; // publishedAt tells you when readers first got it.

  // Auditing
  createdAt: Date; // createdAt tells you when you originally wrote the article.
  updatedAt: Date; // updatedAt tells you when it last changed.
  deletedAt: Date | null; // deletedAt allows soft deletion rather than destroying the database record.
};
```

An article can naturally progress:

```text
Create
  |
  v
draft
  |
  v
edit/save
  |
  v
draft
  |
  v
publish
  |
  v
published

Deletion is orthogonal:

Article
  |
  +-- deletedAt = 2026-09-14...
```
