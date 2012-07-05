---
layout: post
published: true
title: "My Favorite Bundler Feature"
excerpt: "Ruby's popular gem bundling library made dependency management headaches a thing of the past, but it also bundles another feature that has changed my day-to-day life for the better: open"
---

If you're a Ruby developer &mdash; and you haven't been too busy starring in [Geico commercials][geico-under-rock] &mdash; you are familiar with [Bundler][bundler].

Bundler solved a real pain point in the lives of Ruby devs: dependency management. It was a rocky road, but we eventually got there and I think it's safe to say that we're all better off with Bundler than we were without it.

{% aside notice %}
I'd like to thank everybody who has contributed to Bundler. Your work is much appreciated.
{% endaside %}

Having used Bundler long enough to take its dependency management feature for granted (*snark*), I've come to know and love another feature of Bundler: `bundle open`

What does `open` do? It opens a bundled gem in your editor. Simple as that.

Why is that awesome? Because it is now easier than ever to go code spelunking inside your project's dependencies.

![Where did I put that stack trace?][spelunking]

Need to know which methods [CanCan][cancan] adds to ActionController?

{% highlight console %}
bundle open cancan
{% endhighlight %}

Want to toss some debug output inside an ActiveRecord query chain?

{% highlight console %}
bundle open activerecord
{% endhighlight %}

Would it just be easier to throw a `binding.pry` right inside [Mongoid's][mongoid] call chain? (Pro tip: yes, yes it would)

{% highlight console %}
bundle open mongoid
{% endhighlight %}

In a perfect world, third party libraries that our projects depend upon would be like little black boxes that Just Work&#8482; as advertised. In real life, we often need to rip open those black boxes and tinker with their innards.

`bundle open` reduces the friction of diving into my dependencies, which means I do it sooner and more often.

And *THAT*'s why it's my favorite feature in Bundle (besides the whole dependency management feature… that's great too).

[geico-under-rock]:http://www.youtube.com/watch?v=cvXqm0RdJms
[bundler]:http://gembundler.com/
[spelunking]:http://jerodsanto.net/drop/spelunking-20120703-073554.png
[cancan]:https://github.com/ryanb/cancan/
[mongoid]:http://mongoid.org
