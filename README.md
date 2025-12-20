# jerodsanto.net

My personal blog built with [Hugo](https://gohugo.io).

## Local Development

Install Hugo and run the development server:

```bash
hugo server -D
```

The site will be available at `http://localhost:1313`

## Writing a New Post

Create a new post using Hugo's archetype system:

```bash
hugo new content/posts/YYYY-MM-DD-slug-for-post.md
```

This creates a new file in `content/posts/` with the front matter template:

```yaml
---
title: Slug For Post
date: 'YYYY-MM-DD'
categories:
draft: true
---
```

Edit the post, add categories, and remove `draft: true` when ready to publish.

## Deploying

Run the deployment script:

```bash
./scripts/deploy.sh
```

This builds the site with Hugo and syncs it to production using rsync (only uploading changed files).

## Site Configuration

- `hugo.toml` - Main site configuration
- `layouts/` - Page templates and partials
- `content/posts/` - Blog posts
- `static/` - Static assets (CSS, images, etc.)
- `archetypes/` - Templates for new content
