# Website Design

The website will have a home/landing page.
It will have a contact form.
It will have a blog search page.
It will have links to individual articles.

The home page and the individual articles need to be SEO optimized.

The site will have a left navigation menu which will collapse on smaller viewports.

# Blog search page

Feature: Blog Search and Discovery

Description

Provide readers with a searchable and filterable blog index so they can quickly discover relevant articles by keyword and topic.

The page will display published articles in a scannable list, including the article title, summary, publish date, reading time, and associated tags. Readers will be able to search by keyword, filter by topic, and navigate through paginated results.

Search and filter state should be reflected in the URL so that result pages can be bookmarked, shared, and restored using browser navigation.

User value

Readers can find relevant content without needing to browse the entire article archive manually.

In scope:

- Blog index page
- Keyword search
- Tag/topic filtering
- Pagination
- Article cards/list items
- Empty-state handling
- Search/filter state reflected in query parameters
- Responsive and accessible interaction

# Contact form page

Feature: Contact form page

Users will be able to fill out the contact form to send me a message.
There will be a name, subject, email, and body in the form.
This is a way for people to contact me without publicly sharing my contact details.

# Home Page

The home page will have mostly static content explaining about the website and what I do.

# Articles

The articles will be static content with a shared header and footer.

The layout will be shared among articles:

```text
┌──────────────────────────────────────────────┐
│ Header                                       │
│ Home | Articles | Contact                    │
├──────────────┬───────────────────────────────┤
│              │                               │
│ Side nav     │   Article content             │
│              │                               │
│              │   Title                       │
│              │   Published date              │
│              │                               │
│              │   Markdown / prose body       │
│              │                               │
│              │                               │
├──────────────┴───────────────────────────────┤
│ Footer                                       │
│ © 2026 My Blog                               │
└──────────────────────────────────────────────┘
```

```ts
<ArticleLayout>
  <Article />
</ArticleLayout>
```

We will have the following components: `<Footer />`, `<Header />`, `<SideNav />`, `<Article />`.
