# Jekyll to Hugo Migration

This repository has been converted from Jekyll to Hugo while preserving the original layout, style, and content.

## What was migrated:

### Structure
- ✅ All posts from Jekyll `_posts` directories converted to Hugo `content/posts/`
- ✅ Jekyll layouts converted to Hugo layouts with template syntax updates
- ✅ Jekyll includes converted to Hugo partials
- ✅ Category pages converted to Hugo taxonomy pages
- ✅ Static assets copied to Hugo `static/` directory
- ✅ RSS feed template converted to Hugo format
- ✅ 404 page converted
- ✅ Search and archives pages converted

### Content
- ✅ All {{ site.posts | size }} posts migrated with proper front matter
- ✅ Jekyll liquid syntax converted to Hugo template syntax
- ✅ Jekyll highlight tags converted to Hugo code fences
- ✅ Custom Jekyll plugins converted to Hugo shortcodes (`aside`, `reveal`)

### Configuration
- ✅ Jekyll `_config.yml` settings converted to Hugo `hugo.toml`
- ✅ Permalinks structure preserved (`/:year/:month/:title/`)
- ✅ Pagination settings maintained
- ✅ Category taxonomy configured

## To run the Hugo site:

1. Install Hugo: https://gohugo.io/installation/
2. Run the development server:
   ```bash
   hugo server -D
   ```
3. Build for production:
   ```bash
   hugo
   ```

## Key differences from Jekyll:

- Configuration is now in `hugo.toml` instead of `_config.yml`
- Posts are in `content/posts/` instead of category-specific `_posts/` directories
- Templates use Go template syntax instead of Liquid
- Custom plugins are now shortcodes in `layouts/shortcodes/`
- Static files are in `static/` directory
- RSS feed is automatically generated (or use custom template in `layouts/_default/rss.xml`)

## Files you can remove:

The following Jekyll-specific files are no longer needed:
- `_config.yml`
- `Gemfile` and `Gemfile.lock`
- `Rakefile`
- All `_posts/` directories
- `_includes/` directory
- `_layouts/` directory (Jekyll version)
- `_plugins/` directory
- Jekyll-specific category index files

## Notes:

- The site maintains the same URL structure and appearance
- All content and metadata has been preserved
- Custom Jekyll plugins have been converted to Hugo shortcodes
- The migration script (`migrate_posts.rb`) can be removed after verification