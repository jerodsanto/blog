---
layout: post
published: true
title: "Dead Simple Rails Config"
excerpt: "Adding custom configuration to a Rails app used to be a chore, but now it's dead simple. Here's how."
---

Your Rails app needs custom configuration so you run off to GitHub to find a gem for that. Stop.

That would've been prudent in the bad ole' days, but Rails 3 makes adding custom configuration dead simple. You <strike>don't have to</strike> shouldn't add a dependency. Here's how easy it is:

{% aside notice %}
This method provides custom configuration without checking it in to version control. It's even easier if your configuration settings do not need to be private.
{% endaside %}

### Easy Access

There are two ways to access our application's configuration object in Rails 3.

{% highlight ruby %}
MyApp::Application.config
# or
Rails.application.config
{% endhighlight %}

In my opinion, both of these are too verbose, so I add a convenience method to `config/application.rb` just inside my application's top-level module:

{% highlight ruby %}
module MyApp
  def self.config
    Application.config
  end
end
{% endhighlight %}

Now we have easy access to the configuration object:

{% highlight ruby %}
MyApp.config
{% endhighlight %}

Right now that object is a bucket full of Rails configurations. How do we get our own settings in there?

### Just add Yaml

Add a `config.yml` file to our app's `config` directory. Put some settings in there.

{% highlight yaml %}
site_name: "My Application"
contact_email: "email@myapp.com"
{% endhighlight %}

Copy the file to a new one called `config.yml.example`. Gitignore the real one. Check the example in to version control.

{% highlight console %}
cp config/config.yml config/config.yml.example
echo "config/config.yml" >> .gitignore
{% endhighlight %}

### Load it

We can add custom settings to Rails' configuration manually like so:

{% highlight ruby %}
module MyApp
  class Application < Rails::Application
    config.site_name = "My Application"
  end
end
{% endhighlight %}

But we want to load in all the settings from `config.yml`, so manual ain't gonna cut it. Instead, load the Yaml file and send setter methods to the `Application` object for each setting, like so:

{% highlight ruby %}
# inside MyApp::Application class
YAML.load_file("#{Rails.root}/config/config.yml").each { |k,v| config.send "#{k}=", v }
{% endhighlight %}

It's as simple as that.

### Go Crazy

This probably solves only the most basic of needs, but at just one LOC it is quite easy to extend ;). A few things that might be worth adding:

1. Environment separation
2. Shared settings
3. Nested settings

I'll leave those as very easy exercises for the reader.
