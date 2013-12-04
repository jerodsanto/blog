---
layout: post
published: true
title: "Rails 4: let specific actions be embedded as iframes"
excerpt: "Rails 4 defaults the X-Frame-Options header to SAMEORIGIN for security reasons (and good ones at that). However, sometimes you want a specific action to be iframeable. Here's how."
---

Rails 4 added a default `X-Frame-Options` HTTP header value of `SAMEORIGIN`. This is good [for security][clickjacking], because browsers use this header to decide whether or not your site can be `iframe`d by other sites.

However, sometimes you *do* want a particular action to be embeddable in another site. If you know the site which embeds the action, you can simply change the header to explicitly allow it:

{% highlight ruby %}
class MyController < ApplicationController
  def my_embeddable_widget
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM http://example.com"
    render
  end
end
{% endhighlight %}

If, instead, you want the action to be embeddable by any site on the web, just delete the header:

{% highlight ruby %}
class MyController < ApplicationController
  def my_embeddable_widget
    response.headers.delete "X-Frame-Options"
    render
  end
end
{% endhighlight %}

For a single controller action, inlining these changes makes sense. If you're gonna allow multiple actions to be `iframe`d, you can put the logic in a method and call it from an `after_filter`:

{% highlight ruby %}
class ApplicationController < ActionController::Base
  private

  def allow_iframe
    response.headers.delete "X-Frame-Options"
  end
end

class MyController < ApplicationController
  after_filter :allow_iframe, only: :my_embeddable_widget

  def my_embeddable_widget
    render
  end
end
{% endhighlight %}

You can get even fancier if you want, but in my experience YAGNI.


[clickjacking]:http://en.wikipedia.org/wiki/Clickjacking
