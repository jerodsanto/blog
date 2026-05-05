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

## Image Best Practices

The site uses a graph-paper background with `--line-height` of 18px (1.2rem at 15px font-size). Body text aligns to those grid lines. Images can knock subsequent paragraphs off the grid, so the image render hook (`layouts/_default/_markup/render-image.html`) snaps each image's box height *up* to the next grid line and uses `object-fit: cover` with `object-position: top` to fill the box. Cropping happens at the bottom edge — at most ~18px on desktop, ~16px on mobile.

To avoid losing any pixels, crop images to an aspect ratio where the rendered height naturally lands on a grid line.

**Default desktop view**: `.content` is capped at `80ch` ≈ 720px wide. Safe rendered heights are multiples of 18px.

**Safe aspect ratios** (height/width should be a multiple of 1/40):

| Aspect (W:H) | Ratio | Notes |
|---|---|---|
| 5:1   | 5.00 | very wide banner |
| 5:2   | 2.50 | wide banner |
| 2:1   | 2.00 | classic wide |
| 5:3   | 1.67 | close to 16:9 (16:9 is *not* safe) |
| 40:27 | 1.48 | close to 3:2 |
| 4:3   | 1.33 | safe |
| 1:1   | 1.00 | safe |

**Recommendation**: crop to **4:3**, **3:2**, or **1:1**. These photo-standard ratios snap perfectly at desktop width and lose only a few pixels at narrower widths.

**Caveats**:
- Below 580px viewport width, `--line-height` becomes 15.6px (root font drops to 13px), so desktop-perfect crops snap with a small crop on mobile.
- Between 580px and ~830px, the container is narrower than 720px and the math shifts.
- The drag-to-resize affordance only changes left margin, not container width, so it doesn't affect snap behavior.

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
