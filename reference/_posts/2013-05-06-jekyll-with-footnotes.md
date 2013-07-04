---
layout: post
published: true
title: "Jekyll with Footnotes"
excerpt: "None of Jekyll's Markdown renderers support footnotes out of the box, but a RedCarpet fork has the feature."
---

{% aside notice %}
[Jonathon Kram](https://twitter.com/kraminator) has informed me that Kramdown does, indeed, support Footnotes. Using it is likely easier than the method I describe in this post. Thanks, Jonathon!
{% endaside %}

None of Jekyll's Markdown renderers support footnotes out of the box[^1], but a [RedCarpet fork][redcarpet-fork] has the feature. Here's how I got footnotes working in two easy steps:

## 1) Use the fork

The RedCarpet gem we want to use is not available on [RubyGems.org][rubygems], but Bundler can install it directly from GitHub. Add a `Gemfile` to your Jekyll site's root directory that looks like this:

{% highlight ruby %}
source "https://rubygems.org"

gem "jekyll"
gem "redcarpet", github: "triplecanopy/redcarpet"
{% endhighlight %}

Run `bundle install` and then you should be all ready to go.[^2]

## 2) Configure RedCarpet

You have to configure Jekyll to use RedCarpet for Markdown rendering, but you also have to configure RedCarpet to use the `footnotes` extension. Add these lines to your `_config.yml`:

{% highlight ruby %}
markdown: redcarpet
redcarpet:
  extensions: [footnotes]
{% endhighlight %}

That's it! You now have footnotes with Jekyll.

Enjoy.

[^1]: Footnotes is not an official Markdown feature, but was added by [PHP-Markdown][php-markdown] and a few derivative projects. The feature hasn't made it in to RedCarpet proper (by way of [Sundown][sundown]) because of the concerted effort by GitHub, Reddit, etc. to develop and support a Markdown standard which will replace Sundown. See [this issue][sundown-issue] if you're interested in learning more.

[^2]: You will now have to use `bundle exec jekyll` to invoke Bundler and pick up the correct RedCarpet gem. If that's a pain, there are [workarounds][rubygems-bundler] for `bundle exec`.

[redcarpet-fork]:https://github.com/triplecanopy/redcarpet
[rubygems]:https://rubygems.org
[php-markdown]:http://michelf.ca/projects/php-markdown/
[sundown]:https://github.com/vmg/sundown
[sundown-issue]:https://github.com/vmg/sundown/pull/141#issuecomment-10846092
[rubygems-bundler]:https://github.com/mpapis/rubygems-bundler
