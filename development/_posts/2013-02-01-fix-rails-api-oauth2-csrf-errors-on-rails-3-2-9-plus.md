---
layout: post
published: true
title: "Fix Rails-API Oauth2 CSRF Errors On Rails 3.2.9+"
excerpt: "The fix to this obscure and nuanced bug after upgrading my Rails-API app to 3.2.11 is worth noting for others."
---

If you *happen* to find yourself using [Rails-API][rails-api], as I am. And you *happen* to be interacting with sundry [Oauth2][omniauth-oauth2] providers via [Omniauth][omniauth], as I am. And you *happen* to be getting CSRF errors in your callback phase after upgrading Rails to anything higher than 3.2.8, as I was...

Boy do I have the post for you!

Rails-API excludes the session and cookie middleware by default[^1], but Omniauth needs them[^2]. In Rails 3.2.8 and below, you can get both working by picking a session store middleware and `use`ing it in `config/application.rb`:

{% highlight ruby %}
module MyApp
  class Application < Rails::Application
    # ... snip ... #
    config.middleware.use ActiveRecord::SessionStore
  end
end
{% endhighlight %}

In Rails 3.2.9+, however, this is insufficient. A change to how cookies are set in Rails 3.2.9 means you have to explicitly enable the `ActionDispatch::Cookies` middleware as well in order to use session storage.

The reason it works in 3.2.8 is because that version relies on Rack's cookie setting code (which is always available), but in 3.2.9 it switched to using ActionDispatch's cookie setting code (which is not there unless using the middleware) instead.

So, you need to make your config look like this if you're using 3.2.9+:

{% highlight ruby %}
module MyApp
  class Application < Rails::Application
    # ... snip ... #
    config.middleware.use ActionDispatch::Cookies # order matters!
    config.middleware.use ActiveRecord::SessionStore
  end
end
{% endhighlight %}

Oh, and don't forget to also pick the appropriate store in `config/initializers/session_store.rb` or it still won't work:

{% highlight ruby %}
MyApp::Application.config.session_store :active_record_store
{% endhighlight %}

But I think that advice applies to *all* versions of Rails :)

[^1]: You can get all the Rails middleware by setting `config.api_only = false`, but this kind of defeats the purpose of Rails-API, imo.

[^2]: It uses the session to store the `state` param sent from the provider to ensure no CSRF tomfoolery.

[rails-api]:https://github.com/rails-api/rails-api
[omniauth]:https://github.com/intridea/omniauth
[omniauth-oauth2]:https://github.com/intridea/omniauth-oauth2
