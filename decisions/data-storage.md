# Data Storage

# Articles

The data shape of blog articles will most likely take this form:

```text
articles
- id
- slug
- title
- summary
- body_markdown
- author_id
- status
- published_at
- updated_at
- deleted_at

authors
- id
- name

tags
- id
- name
- slug

article_tags
- article_id
- tag_id

article_revisions
- id
- article_id
- body_markdown
- created_at

distributions
- id
- article_id
- platform
- status
- external_post_id
- published_at
```

The nature of the data naturally translates into a relational database.

```sql
SELECT a.*
FROM articles a
JOIN article_tags at ON at.article_id = a.id
JOIN tags t ON t.id = at.tag_id
WHERE t.slug = 'accessibility'
  AND a.status = 'published';
```

The blog will be hosted on AWS, so an indefinitely free relationtional database would be ideal.
Decision: start with Amazon's RDS.

# Images/Media

Article body content could contain media such as videos or images. These will need an origin storage and a CDN to optimise performance. Since we are storing files, we will need an object storage for files rather than a relational database.

Since the blog will be hosted on AWS, S3 can be used. S3 is Amazon Simple Storage Service. It’s AWS’s object storage service.

```text
S3
- article images
- screenshots
- diagrams
- downloadable files
```

What about CDN?

On AWS, the CDN is typically CloudFront.

```text
Browser
   ↓
CloudFront CDN
   ↓
S3 bucket
```

If a blog article has an image such as, `/articles/aria-basics/diagram.webp`, the file physically lives in S3.

When someone in Ireland requests it, CloudFront can fetch it from S3 once, then cache it at an edge location closer to users. Subsequent requests can be served from the CDN cache instead of going all the way back to S3.

```text
First request

User
  ↓
CloudFront
  ↓ cache miss
S3
  ↓
CloudFront caches file
  ↓
User
```

Subsequent requests:

```text
User
  ↓
CloudFront
  ↓ cache hit
User gets image immediately
```
