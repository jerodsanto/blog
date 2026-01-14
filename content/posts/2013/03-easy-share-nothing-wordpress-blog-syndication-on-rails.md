---
title: Easy 'Share-Nothing' WordPress Blog Syndication on Rails
date: '2013-03-01'
categories:
- development
draft: false
---

The new [Omahype][omahype], which is a custom Rails-based CMS centered around Omaha-area events, has a separate blog that runs on WordPress.

This is not all that uncommon. WordPress is great for blogging. Developing (or extending) a custom Rails blogging solution is of little value unless you're doing some crazy custom stuff.

Despite the blog and main site being on different platforms, there was still the need to integrate the blog content into every page of the Rails site.

!['From the blog' is in the footer of every page][omahype-blog]

There are a handful of ways to skin this cat, but most of them require WordPress and Rails to have things in common: share a database, share a server, and/or share a domain.

Share-Something.

Omahype is hosted on a ['Share-Nothing' platfom][heroku] and the WordPress blog was already up and running on Media Temple, so we needed an easy 'Share-Nothing' solution.

Here's how we do it:

## The Syndication

This part is the easiest. WordPress provides syndicated content out of the box via [RSS][rss] which means we don't have to resort to page scraping or the like.

Omahype's standard RSS feed is located [here][omahype-rss], but we had some simplifications and customizations of the feed's content in mind, so we created a special one just for Rails to consume.

[![][omahype-rss-pic]][omahype-recent]

This [special feed][omahype-recent] provides exactly what we need and nothing else: The 4 most recent posts in a format that is easier to repurpose than the main feed.

## Pulling It In

The syndicated blog content is a value-add to the core features of Omahype's event calendars so we definitely don't want it to slow down page loads.

Because of this, we decided to pull the content in outside of Rails' main request / response lifecycle. This is done via jQuery's `$.get` and `$.parseXML`[^1].

Here's our CoffeeScript source which generates the requisite JavaScript to pull in the content and add it to the DOM:

```coffeescript
loadBlogPosts: ->
    $.get "http://blog.omahype.com/recent/", (data) ->
        doc = $.parseXML data

        $(doc).find("item")
            .each ->
                $item = $(this)
                title = $item.find("title").text()
                link = $item.find("link").text()
                image = $item.find("image").text()
                description = $item.find("description").text()
                categories = $item.find("category").map -> $(this).text().toLowerCase()
                classes = $.makeArray(categories).join " "

                if image.length
                    classes += " hasImage"
                    description = "<img src='#{image}'></img> #{description}"

                html = "<a href='#{link}' title='Read Article'>" +
                    "<article class='#{classes}'><h1>#{title}</h1>" +
                    "<p>#{description}</p></article></a>"

                $("#blog").append html
            .promise().done ->
                Omahype.equalHeight $("section#blog article")
```

Much of that is implementation details specific to how we want the content formatted, but the gist of it is you:

1. make the `GET` request for the content,
2. parse the raw data into `doc`
3. find the `item` elements in the `doc`
4. loop over them, extracting their contents and putting them in the page[^2]

If you've been reading closely, and you've noticed that our 'Share-Nothing' scenario means that Rails and WordPress don't event share a domain, then you'll notice a problem with the code above.

The `GET` request will fail due to JavaScript's [Same origin policy][same-origin-policy]. Bummer.

There are two ways to get around this problem.

1. We could configure [CORS][cors] on the WordPress server to allow requests from omahype.com
2. We could introduce a proxy on the Rails side and serve the feed from there

I chose the latter option because it brings with it an easy win: caching.

## The Middle Man

We need the `$.get` to hit a URL on the Rails side, so we add a `ProxyController` and route to it:

```ruby
# config/routes.rb
get "/proxy", to: "proxy#index", as: :proxy

# app/controllers/proxy_controller.rb
require "open-uri"

class ProxyController < ApplicationController
  def index
    feed = open("http://blog.omahype.com/recent/").read
    render text: feed
  end
end
```

With this in hand, we just change the `$.get` to point to our middle man:

```coffeescript
    loadBlogPosts: ->
        $.get "/proxy", (data) ->
            # ... snip ...
```

Bada boom bada bing. The recent posts now load into our footer.

However, every single page load will now make a subsequent request to the blog's RSS feed. That seems excessive since we're loading content that changes maybe a few times a day, maybe less.

Remember above when I said a proxy gives us an easy win? Here it is.

We can use Rails' built-in cache to only fetch new content from WordPress at a set interval.

To accomplish this, we change the `ProxyController`'s index action to look like this:

```ruby
def index
  feed = Rails.cache.fetch "blog-posts", expires_in: 5.minutes do
    open("http://blog.omahype.com/recent/").read
  end

  render text: feed
end
```

Now it's super fast when it hits the cache and doesn't have to hit WordPress all the time!

And there you have it. Easy 'Share-Nothing' WordPress blog syndication on Rails.

Wow, this post's title is extremely accurate ;)

[^1]:Did you know jQuery has had built-in XML parsing since version 1.5? Seems like it should be a plugin to me (whereas $.parseJSON makes complete sense in core), but nevertheless it is exactly what we need for parsing RSS.

[^2]: This part is specifically messy and was *almost* means for a templating solution, but I decided it wasn't worth it for this  single use.


[omahype]:http://omahype.com
[omahype-blog]:http://jerodsanto.net/drop/omahype-blog.jpg
[heroku]:http://heroku.com
[rss]:http://en.wikipedia.org/wiki/RSS
[omahype-rss]:http://blog.omahype.com/feed/
[omahype-rss-pic]:http://jerodsanto.net/drop/omahype-rss-pic.jpg
[omahype-recent]:http://blog.omahype.com/recent/
[same-origin-policy]:http://en.wikipedia.org/wiki/Same_origin_policy
[cors]:http://en.wikipedia.org/wiki/Cross-origin_resource_sharing
