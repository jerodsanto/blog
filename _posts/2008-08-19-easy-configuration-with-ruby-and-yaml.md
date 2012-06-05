---
layout: post
published: true
title: "Easy Configuration with Ruby and Yaml"
excerpt: "Even trivial apps need to be configured. Why not use Yaml?"
---

Even trivial apps need to be configured. I used to simply define my app config somewhere near the top of the file, as many others do.

However, this becomes troublesome in a few common scenarios:

1. You want to share your source code with somebody else, but not your super-secret password
2. Your application becomes more complex and multiple areas need access to configuration variables

Abstracting configuration out of your Ruby app and into a separate [Yaml][1] file is super-simple. Here’s some codey code to use as an example:

{% highlight ruby %}
# this is 'myapp.rb'
require 'yaml'
CONFIG = Yaml.load_file("config.yml") unless defined? CONFIG

puts "Your super-secret password is #{CONFIG['password']}"
{% endhighlight %}

Can it get any easier than that? I submit that it, in fact, cannot get any easier. You probably want to know what the `config.yml` file looks like, huh:

{% highlight ruby %}
# this is my 'config.yml'
username: jerodsanto
password: awesome
{% endhighlight %}

Now if you want to share your source with a friend, perhaps via git, you can just add `config.yml` to the `.gitignore` file in your repository and create a `config-sample.yml` which holds dummy values.

Any questions?


[1]: http://www.yaml.org/
