---
layout: post
published: true
title: "3 Reasons Why Heroku is a Game Changer"
excerpt: "Why I think Heroku is awesome and will change the game of Ruby app deployment"
---

For the uninitiated, [Heroku][1] is a "cloud" (hate that term) hosting service for Ruby applications. Their claim, which I believe they have substantiated, is to be an "**instant ruby platform**" and their success changes the game. Here is why.

## 1) Microwavesque Deployment

When Heroku claims that you can deploy your Ruby app instantly, they're pretty much not exaggerating. Seriously, you should try it. It's so fast I had to ignore my spell-checker and describe it as microwavesque. Remember when microwaves first hit the scene and people couldn't believe how fast they could "deploy" a meal? Yah me either, but the microwave changed the game big time.

If you haven't tried deploying a Rails app to Heroku, just go do it. Here are the steps from start to finish:

{% highlight console %}
rails myapp
cd myapp
git init
git add .
git commit -m "my new app"
heroku create myapp
git push heroku master
{% endhighlight %}

If that looks like too much work for you, have Remi walk you through it in [this nice screencast][2].

## 2) Drag To Scale

Scaling is a problem we all want to have, but few of us do. The rest of us spend way too much time thinking about it. With Heroku's architecture, you don't have to think about scaling. You just do it. If you're fortunate enough to have your app featured on TechCrunch, Slashdot, Digg, HN, Reddit, etc, etc, you simply log in to the Heroku admin panel and "crank your dynos" (love that term) to handle the load. How do you do that? By dragging a little bar vertically. How's that for a learning curve?

[<img class="aligncenter size-medium wp-image-381" title="dyno" src="http://blog.jerodsanto.net/wp-content/uploads/2009/05/dyno-189x300.png" height="300" alt="dyno" width="189" />][3]

Note: This isn't the only way to ensure your app scales. You should still optimize your code for performance, but Heroku takes care of all the server configuration (compression, caching, memory allocation, etc) and you just ask for more power when you need it.

## 3) Rack Support

Heroku isn't just a Rails platform, it's a Ruby platform. They support any [Rack-enabled][4] Ruby app. Check out how many Ruby web frameworks have Rack adapters:

* Camping
* Coset
* Halcyon
* Mack
* Maveric
* Merb
* Racktools::SimpleApplication
* Ramaze
* Ruby on Rails
* Rum
* Sinatra
* Sin
* Vintage
* Waves
* Wee

That's a long frickin' list! Developers can pick the right tool for their need (or write their own Rack-enabled app) and not have to worry about deployment gotchas.

For example, I wanted a way to quickly resolve the public IP address of any machine I'm using (including servers) so I wrote [and deployed][5] this trivial Sinatra app in less than 5 minutes.

{% highlight ruby %}
# public_ip.rb
require 'rubygems'
require 'sinatra'

get '/' do
  raw = @request.env["REMOTE_ADDR"]
  raw.match(/^(\d+\.\d+\.\d+\.\d+),?/)
  @ip = $1
  haml '=@ip'
end

# config.ru
require 'public_ip.rb'
run Sinatra::Application
{% endhighlight %}

The rackup file (config.ru) tells Heroku to use Sinatra to run my application. Rails would have been overkill for this, don't you think? (Heck, Sinatra may be overkill too. You could probably write a raw Rack application in even fewer LOC, post in the comments if you have a better solution).

**UPDATE:** Blake Mizerany provided a few shorter examples [here][6].

## So

What Heroku offers Ruby web developers is instant deployment, fast & easy scaling, and vast tool selection. Now we can concentrate on building our applications and forget the tedious deployment and server administration tasks that used to strangle our productivity. We can deploy fast, scale quickly, and adjust to circumstance as needs arise. The game is changing, and Heroku (and others like them) are changing it.

****disclaimer****
I am only affiliated with Heroku as a customer, and receive no recompense from the ridiculous amount of props I'm throwing their way. They do have a few drawbacks, one that is a show stopper for many apps, which I will detail in a future post.


[1]: http://heroku.com
[2]: http://remi.org/2009/04/23/deploying-rails-and-rack-applications-to-heroku.html
[3]: http://blog.jerodsanto.net/wp-content/uploads/2009/05/dyno.png
[4]: http://rack.rubyforge.org/
[5]: http://my-ip.heroku.com
[6]: http://gist.github.com/118217
