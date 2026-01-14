---
title: Rate Limit POST Requests with Rack::Throttle
date: '2013-02-03'
categories:
- development
draft: false
---

[Rack::Throttle][rack-throttle] is an awesome piece of Rack middleware for rate limiting your Rails / Sinatra / Rack app's clients.

It ships with three rate limiting strategies out of the box: [Interval][rack-throttle-interval], [Hourly][rack-throttle-hourly], and [Daily][rack-throttle-daily].

These strategies will serve 95% of people's needs, but you can also write your own strategy from scratch by subclassing the [Limiter][rack-throttle-limiter] and implementing an `allowed?` method.

In my experience, writing a strategy from scratch has not been necessary, but I have needed to extend the provided strategies a bit.

For instance, I have an app where we want to limit writes per hour, but we don't care about reads. In this case, I just subclassed the [Hourly][rack-throttle-hourly] strategy and made mine allow anything that isn't a POST request.

My subclass is crazy simple:

```ruby
module Rack
  module Throttle
    class HourlyPosts < Hourly
      def allowed?(request)
        return true unless request.request_method == "POST"
        super request
      end
    end
  end
end
```

Then I invoke it just like I'd invoke the default hourly strategy:

```ruby
use Rack::Throttle::HourlyPosts, max: 10
```

My app doesn't allow updating (PUT) or destroying (DELETE) records, but it'd be trivial to modify the subclass to account for them as well.

I love libraries like Rack::Throttle with small, simple interfaces that are easily extended. It also provides a plethora of options for storage, such as in-memory, gdbm, Memcache, or Redis.

Highly recommended!

[rack-throttle]:https://github.com/datagraph/rack-throttle
[rack-throttle-limiter]:https://github.com/datagraph/rack-throttle/blob/master/lib/rack/throttle/limiter.rb
[rack-throttle-interval]:https://github.com/datagraph/rack-throttle/blob/master/lib/rack/throttle/interval.rb
[rack-throttle-hourly]:https://github.com/datagraph/rack-throttle/blob/master/lib/rack/throttle/hourly.rb
[rack-throttle-daily]:https://github.com/datagraph/rack-throttle/blob/master/lib/rack/throttle/daily.rb
