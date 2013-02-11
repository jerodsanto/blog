---
layout: post
published: true
title: "A Casual Stroll Through Discourse's Source Code"
excerpt: "Any time I see an open source app which has technically intriguing bits, I take some time to clone it and give it a quick read-through. Let's do that!"
---

The public release (and open sourcing) of [Discourse][discourse] was the big news in the open source world last week.

Discourse interested me mostly because it is a large-scale, production-ready Rails application which [uses Ember.js][discourse-why-ember] for client-side MVC.

Any time I see an open source app which has technically intriguing bits, I take some time to clone it and give it a quick read-through. Let's do that!

## The README

Let's start in the [README][readme], which is akin to the summary on the back of a book. Here we find out a few good signs. First, they have a developer [install guide][install-guide], which means they're serious about attracting contributors. Next we learn the grand vision of the project, how to contribute, and the major technologies that the project uses. Very nicely done.

With that info in hand, let's poke around the actual source code and see what we see.

## The Gemfile

For Ruby apps, I usually start in [the Gemfile][gemfile] to get a quick overview of the 3rd party libraries being used. Discourse has a *big* Gemfile, but nothing out of the ordinary given what we read in the README.

{% aside notice %}
Some great gems in here: [active_model_serializers](https://github.com/rails-api/active_model_serializers), [nokogiri](http://nokogiri.org), and [better_errors](https://github.com/charliesome/better_errors)
{% endaside %}

Notably, there's a lot of Redis-related gems being used, RSpec for Ruby tests, looks like Jasmine for JavaScript tests, and Sinatra for some reason, even though it is not being `require`d.


## The Test Suite

After perusing the Gemfile, I look for tests next. We already know Discourse has them because of what we've already seen, so we can go straight to the [spec/][spec] directory and have a look around.

My first impression is that Discourse is very thoroughly tested. There are spec for models, views, controllers, mailers, fabricators, components and javascripts.

I'm most curious about fabricators, because I don't know what they are, and javascripts, because I'd like to see a well-tested Ember app.

Peeping in to the [PostFabricator][post-fabricator], it doesn't appear to be a spec file at all. Instead, there are many `Fabricator` blocks, which call methods such as `raw`, `cooked`, `user`, `topic`, and `created_at`. My guess is that fabricators aren't a piece of the production system at all. They're probably some kind of factory for use in specs.

So, I move on to [specs/javascripts][spec-javascripts]. My first thought in this directory is that there aren't as many specs as I hoped. With how much Discourse relies on client-side MVC, you'd think those components would be more thoroughly spec'd.

Oh well, you can't have it all, I guess.

## A Model

The M in MVC is supposed to be where your application's business logic resides, so it's a logical next place to have a gander.

At this point I like to bring up the spec and implementation files side by side as I read. Let's just pick a single model and see what is up. Discourse is all about posting comments, so the [Post][post-model] models seems like a good one to look at.

Opening [specs/models/post_spec][post-spec] confirms my assumption about the fabricators, as I see:

{% highlight ruby %}
let(:topic) { Fabricate(:topic) }
{% endhighlight %}

near the top of the file. Cool.

Opening [app/models/post.rb][post-model] confirms my choice of Post as core to the system. This file is almost 500 lines long.

There are a couple things that worry me here.

First, they appear to be [sending email][post-model-email] from inside the model. I've been guilty of this myself, but these days I try to keep email logic outside ActiveRecord descendants. I prefer it in a controller or separate domain class.

Second, and perhaps more dangerous to new devs, there are a bevy of callbacks being triggered, but they are not grouped together in the file. There's a series of them that starts [on line 51][post-model-51] and another series all the way down [on line 302][post-model-302].

{% aside notice %}
Grouping logically-related pieces of code together is one aspect of keeping code readable
{% endaside %}

Other than those two gripes, Post appears to be a decently factored, if not a little chubby, model.

Let's move on to something more interesting.

## Ember Stuff

The entire reason that I wanted to read Discourse's source code is to see some production Ember stuff. Let's quit dawdling and hop into the good stuff.

Rails 3+ puts all the Coffee/JavaScript in [app/assets/javascripts][javascripts], so it's no surprise to find a [discourse][javascripts-discourse] subdirectory in there with what appears to be an Ember app.

I decide to jump in to [post.js.coffee.erb][post-coffee] first, because I already am familiar with the server-side Post model.

The first thing I notice is just in the filename itself. They're using CoffeeScript, which is cool, but they're also relying on ERB in their CoffeeScript files.

This sucks because many text editors will apply embedded Ruby styling/rules to the file even though it is mostly CoffeeScript with just a few Ruby snippets in there.

I try to avoid this if at all possible, but sometimes it's not easy. I want to see why they need ERB, so I open the file and do a quick search for '<%'. This yields just 2 hits, on [line 178 and 179][post-coffee-178]:

{% highlight coffeescript %}
REGULAR_TYPE: <%= Post::REGULAR %>
MODERATOR_ACTION_TYPE: <%= Post::MODERATOR_ACTION %>
{% endhighlight %}

I think they're trying keep things DRY by reusing server-side constants to define JS globals.

I've avoided ERB in this scenario by embedding the variables into the DOM somewhere (such as data- attributes on &lt;body&gt;) and then grabbing them out in JS.

I don't know if Ember lets you do this, but it save the hassle of pre-processing CoffeeScript with ERB.

Speaking of DRY, I'm curious if there is much duplication between the Ruby Post model and the CoffeeScript Post model.

Reusing models on the client and server is an oft-cited panacea provided by server-side JavaScript, and Rails doesn't provide such a convenience.

Does it matter in the case of Discourse's Post model? You can judge for yourself, but in my small time reading both files I would say no, not at all.

## Way More

There's a lot more to this app, and I definitely suggest giving it a read, but I will stop here because this post is already too long.

Reading large, production-ready open source projects is a great way to learn new techniques, see how people you admire solve complex problems, and even find places [where you can help][refactoring-discourse].

If you've read a lot of other people's code, you are probably nodding your head in agreement.

If not, I highly recommend it, and hopefully this post will give you a bit of a process you can follow to dive in with confidence and quickly understand what is going on.

[discourse]:http://www.discourse.org/
[discourse-why-ember]:http://eviltrout.com/2013/02/10/why-discourse-uses-emberjs.html
[readme]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/README.md
[install-guide]:https://github.com/discourse/discourse/blob/master/DEVELOPMENT.md
[gemfile]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/Gemfile
[spec]:https://github.com/discourse/discourse/tree/3047d8afa3ae78b6e1722530577484921ce83b7f/spec
[post-fabricator]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/spec/fabricators/post_fabricator.rb
[spec-javascripts]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/spec/javascripts
[post-model]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/app/models/post.rb
[post-spec]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/spec/models/post_spec.rb
[post-model-email]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/app/models/post.rb#L329
[post-model-51]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/app/models/post.rb#L51
[post-model-302]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/app/models/post.rb#L302
[javascripts]:https://github.com/discourse/discourse/tree/3047d8afa3ae78b6e1722530577484921ce83b7f/app/assets/javascripts
[javascripts-discourse]:https://github.com/discourse/discourse/tree/3047d8afa3ae78b6e1722530577484921ce83b7f/app/assets/javascripts/discourse
[post-coffee]:ttps://github.com/discourse/discourse/tree/3047d8afa3ae78b6e1722530577484921ce83b7f/app/assets/javascripts/discourse/models/post.js.coffee.erb
[post-coffee-178]:https://github.com/discourse/discourse/blob/3047d8afa3ae78b6e1722530577484921ce83b7f/app/assets/javascripts/discourse/models/post.js.coffee.erb#L178-L179
[refactoring-discourse]:http://grantammons.me/2013/02/09/making-some-discourse-code-a-little-better/
