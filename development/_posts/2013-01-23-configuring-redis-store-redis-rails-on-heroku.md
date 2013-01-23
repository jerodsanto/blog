---
layout: post
published: true
title: "Configuring redis-store / redis-rails on Heroku"
excerpt: "redis-store's redis-rails is awesome, but it can be a pain in the buttox to get configured on Heroku. Herein lies buttox relief."
---

[redis-store's][redis-store] redis-rails [gem][redis-rails] is awesome, but it can be a pain in the buttox to get configured on Heroku.

That's because Heroku's ever-growing [list of Redis providers][heroku-redis-providers] all use [config vars][heroku-config-vars] to set the Redis URL and redis-rails expects you to hook up the cache store and session store during the Rails application boot process, during which the config vars are unavailable.

Here's how I got it working:

First, delete `config/initializers/session_store.rb`. It's not needed because we'll initialize the session store and the cache store in the same place.

Next, create `config/initializers/redis_store.rb` and put this in it:

{% highlight ruby %}
redis_url = ENV["REDISCLOUD_URL"] || "redis://127.0.0.1:6379/0/myapp"
MyApp::Application.config.cache_store = :redis_store, redis_url
MyApp::Application.config.session_store :redis_store, redis_server: redis_url
{% endhighlight %}

That's all there is to it! A few notes:

1. initializers are executed *after* `application.rb`, at which point Heroku's config vars are available
2. when the config var URL is nil, like in dev mode, it will revert to your local Redis server
3. I'm using [RedisCloud][redis-cloud] as a Redis provider, but you'll need to adjust the config var to match whichever provider you choose
4. Be sure to replace `MyApp` with the name of your app ;)
5. The `/myapp` at the end of the fallback URL is optional. It adds a namespace to all Redis keys. I like this in dev mode because I can see all of my app's keys by doing a `keys myapp*` in the Redis CLI. Feel free to omit

Happy caching!

[redis-store]:https://github.com/jodosha/redis-store
[redis-rails]:http://rubygems.org/gems/redis-rails
[heroku-redis-providers]:https://addons.heroku.com/?q=redis
[heroku-config-vars]:https://devcenter.heroku.com/articles/config-vars
[redis-cloud]:https://addons.heroku.com/rediscloud
