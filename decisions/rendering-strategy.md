# Rendering Strategy

I recommend a hybrid rendering strategy, with the blog optimized primarily for readers:

- Published article pages = SSG (Static Site Generation). Generate the article HTML ahead of time so posts are fast, SEO-friendly, and available at stable crawlable URLs such as /articles/my-post.
- Publishing/editing = revalidation. When you publish or update an article, regenerate/revalidate the affected static page rather than rebuilding the entire site.
- Browse/search pages = hybrid. Render useful initial HTML on the server/static side, then use client-side React for interactive filtering, searching, sorting, pagination, etc.
- Admin/editor = CSR is fine. Drafting, editing, saving, previewing, publishing/unpublishing, and deletion are authenticated application functionality and don't need SEO.

Selective hydration rather than hydrating everything. Most visitors are simply reading, so an article shouldn't become a giant client-side React app just to display Markdown, images, headings, etc.

```text
/public
  /
  /articles
  /articles/[slug]       = SSG + revalidation
  /search                = initial HTML + client interactivity

/admin
  /articles
  /articles/new
  /articles/[id]/edit    = CSR / app-like
```

The key decision was essentially "static-first for content, client-side where interactivity actually requires it", rather than making the whole blog an SPA or SSR-ing every article request.

A published article doesn't change on every request. Rendering it on the server every time someone visits would therefore be unnecessary work.

Therefore, article pages are a good candidate for:

```text
SSG + revalidation
```

In Next.js terminology, static rendering with cache/revalidation behaviour.

```text
/article/my-accessibility-post
             │
             ▼
      pre-rendered HTML
             │
             ▼
        CDN / cache
             │
             ▼
          reader
```

When an an article is modified or republished:

```text
Edit article
     ↓
Publish
     ↓
Invalidate/revalidate article
     ↓
New static version generated
```

That provides the important advantages of static content:

```text
- fast initial load
- good SEO
- crawlable HTML
- low server cost
- easy CDN caching
- stable canonical URLs
```
