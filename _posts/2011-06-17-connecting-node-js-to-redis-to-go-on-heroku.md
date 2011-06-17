---
layout: post
published: true
title: "Connecting Node.js to Redis To Go on Heroku"
excerpt: "Heroku's new Cedar stack is awesome for many reasons, one of which is first-class Node.js hosting. I'm giving it a test run with an app that uses Redis for data caching and I couldn't find any documentation on how to connect a Node app to the Redis To Go add-on. Here's how I did it"
---

Heroku's new [Cedar stack][cedar] is awesome for many reasons, one of which is first-class [Node.js][node] hosting.

I'm giving it a test run with an app that uses [Redis][redis] for data caching and I couldn't find any documentation on how to connect a Node app to the [Redis To Go][redistogo] add-on. Here's how I did it:

{% aside notice %}
This assumes that you've already created the Heroku app or don't need any help in doing so. Heroku has a [great tutorial](http://devcenter.heroku.com/articles/node-js) on how to deploy a Node app on Cedar.
{% endaside %}

First, add the Redis To Go add-on via the `heroku` command:

{% highlight console %}
heroku addons:add redistogo
{% endhighlight %}

Installing the add-on will automatically add a `REDISTOGO_URL` environment variable to your app. You can see its value with the `heroku config` command.

The Redis client for Node that I use is [node_redis][node-redis], so the following is specific it for it. If you use another client, adjust as necessary.

When node_redis connects to a Redis instance on your local machine it assumes the default port and host information, so instantiating the client is as simple as this:

{% highlight javascript %}
var redis = require("redis").createClient();
{% endhighlight %}

That works just fine in development, but we need it to authenticate to Redis To Go in production. To handle both cases I just check for the existence of the `REDISTOGO_URL`, like so:

{% highlight javascript %}
if (process.env.REDISTOGO_URL) {
  // TODO: redistogo connection
} else {
  var redis = require("redis").createClient();
}
{% endhighlight %}

Everything should still work fine in development, but we still need to implement the Redis To Go connection. To do this we need to extract the port, hostname, and authentication string from `REDISTOGO_URL` using Node's built-in `url` lib:

{% highlight javascript %}
// inside if statement
var rtg   = require("url").parse(process.env.REDISTOGO_URL);
var redis = require("redis").createClient(rtg.port, rtg.hostname);

redis.auth(rtg.auth.split(":")[1]);
{% endhighlight %}

For some reason Node's `url` lib won't split up the auth section's username and password, so that's what is going on in the `rtg.auth.split(":")[1]` that is passed to the auth command.

That's all it took to get my app connected and running smoothly. I hope this helps you do the same!

[cedar]:http://devcenter.heroku.com/articles/cedar
[node]:http://nodejs.org
[redis]:http://redis.io
[redistogo]:http://redistogo.com
[node-redis]:https://github.com/mranney/node_redis
