---
layout: post
published: true
title: "Cappuccino On Rails"
excerpt: "I'm happy to announce the release of <a href='http://github.com/jerodsanto/CappuccinoResource'>CappuccinoResource</a> (CR), a library dedicated to interfacing between a <a href='http://cappuccino.org'>Cappuccino</a> front-end and a <a href='http://rubyonrails.org'>Rails</a> back-end."
---

I'm happy to announce the release of [CappuccinoResource][1] (CR), a library dedicated to interfacing between a [Cappuccino][2] front-end and a [Rails][3] back-end.

CR should feel very familiar to Rails developers. Its interface is akin to [ActiveResource][4] and it borrows heavily from the (very good) [ObjectiveResource][5] library for the iPhone.

All basic CRUD operations are supported, and you can perform advanced finds with arbitrary parameters. A brief example of fetching a record, modifying it, and saving it:

{% highlight objj %}
var post = [Post find:@"42"];
[post setTitle:@"Why X is Better than Y"];
[post save];
{% endhighlight %}

Check out the README on the project's page [on GitHub][1] for more details and usage examples.

## Live Demo

I also created a demo application which is a simplified clone of OS X's Address Book. The demo is [live on Heroku][6]. Check it out. The source for the demo is also [on GitHub][7].

If you're a Rails developer waiting for a good opportunity to try out Cappuccino, there's no better time than now.

If you're a Cappuccino developer looking for an easy-to-use, powerful back-end for your applications, Rails might be the answer for you.

CR is a young project, but it drives one of my client applications that is production-ready (albeit not deployed), so I believe it is ready for prime time. Please try it and let me know how it goes.

Fork, [report issues][8], et cetera.

[1]:http://github.com/jerodsanto/CappuccinoResource
[2]:http://cappuccino.org
[3]:http://rubyonrails.org
[4]:http://api.rubyonrails.org/classes/ActiveResource/Base.html
[5]:http://iphoneonrails.com/
[6]:http://capp-resource-example.heroku.com
[7]:http://github.com/jerodsanto/CappResourceExample
[8]:http://github.com/jerodsanto/CappuccinoResource/issues
