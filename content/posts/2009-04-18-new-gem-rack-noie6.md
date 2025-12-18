---
title: 'New Gem: Rack-noIE6'
date: '2009-04-18'
categories:
- announcement
draft: false
---

Many web developers are discontinuing support for IE6. I, happily, am one of them (unless a client demands it). The other day I went searching for an IE6 detection and redirect solution to aide in my un-support of the browser. What I found was pretty rad.

Now that Rails is on Rack, dozens of useful middleware apps are being developed and can be plugged into Rails with ease. Thanks to a simple [GitHub][1] search, I found the [rack-noie][2] project by Julio Cesar.

His middleware did almost exactly what I wanted except for a few small things. First, I prefer using gems with Rails so dependencies can easily be managed using config.gem. Second, we're just hating on IE6, not IE in general. Therefore, the name is a bit misleading.

So, in the spirit of open-source, I forked his project and molded it to my liking. You can see the shiny new rack-noie6 gem's GitHub page [here][3].

Its dead simple to integrate. First, install the gem

```bash
gem install rack-noie6
```

Next (if you're using Rails), add the following to environment.rb inside the Rails::Initializer.run block:

```ruby
config.gem 'rack-noie6', :lib => 'noie6'
config.middleware.use "Rack::NoIE6"
```

As the IE6-BraveHeart would proclaim: FREEEEDOMMMM!


[1]: http://github.com
[2]: http://github.com/juliocesar/rack-noie/tree/master
[3]: http://github.com/jerodsanto/rack-noie6/
