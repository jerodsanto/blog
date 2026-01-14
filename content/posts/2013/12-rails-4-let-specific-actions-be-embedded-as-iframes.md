---
title: 'Rails 4: let specific actions be embedded as iframes'
date: '2013-12-04'
categories:
- development
draft: false
---

Rails 4 added a default `X-Frame-Options` HTTP header value of `SAMEORIGIN`. This is good [for security][clickjacking], because browsers use this header to decide whether or not your site can be `iframe`d by other sites.

However, sometimes you *do* want a particular action to be embeddable in another site. If you know the site which embeds the action, you can simply change the header to explicitly allow it:

```ruby
class MyController < ApplicationController
  def my_embeddable_widget
    response.headers["X-FRAME-OPTIONS"] = "ALLOW-FROM http://example.com"
    render
  end
end
```

If, instead, you want the action to be embeddable by any site on the web, just delete the header:

```ruby
class MyController < ApplicationController
  def my_embeddable_widget
    response.headers.delete "X-Frame-Options"
    render
  end
end
```

For a single controller action, inlining these changes makes sense. If you're gonna allow multiple actions to be `iframe`d, you can put the logic in a method and call it from an `after_filter`:

```ruby
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
```

You can get even fancier if you want, but in my experience YAGNI.


[clickjacking]:http://en.wikipedia.org/wiki/Clickjacking
