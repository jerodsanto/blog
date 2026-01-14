---
title: And Now For Something So Niche That Perhaps Only I Will Use It
date: '2012-09-20'
categories:
- announcement
draft: false
---

Me, on Twitter, [a few weeks ago][the-tweet]:

<blockquote class="twitter-tweet tw-align-center"><p>My latest (soon-to-be-released) open source project is so niche that perhaps only I will use it, but I freakin’ love it.</p>&mdash; Jerod Santo (@jerodsanto) <a href="https://twitter.com/jerodsanto/status/240180907380719616" data-datetime="2012-08-27T20:16:05+00:00">August 27, 2012</a></blockquote>
<script src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

What I was referring to is [Push Pop][pushpop], a system for pushing web pages from a mobile device and having them pop open in a desktop browser. Let me explain.

I often find myself discovering content on my mobile device that I want to consume when I get back to my desk. Sometimes the thing is work-related. Or designed with only desktop browsers in mind. Other times I'm in a hurry and want to return to it later.

I think of it as the opposite use case of how I use [Instapaper][instapaper].

Now, you may be thinking: "Just use Chrome or Safari's tab syncing, dummy!"

Three things about that:

1.  Neither of those things existed when I first prototyped Push Pop.
2.  I use Chrome on desktop and Safari on mobile. I don't want lock in.
3.  Tab syncing requires me to poll the browser for content. I want these things staring at me in the face when I return to my desktop.

For a long time I just emailed myself links. When I got sick of that I built Push Pop instead. It works great!

<iframe src="http://player.vimeo.com/video/49778930?title=0&amp;byline=0&amp;portrait=0" width="500" height="281" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

Push Pop is a combination of a browser extension and a bookmarklet. The bookmarklet pushes pages up to a Heroku server which then pushes them down to the extension.

I'd really like to remove the middle man, but I couldn't think of a way to get that done.

The only extension I created was for Chrome, but the whole thing is [open source][pushpop-source] so if you want to use Push Pop with a different browser, please lend a hand.

[instapaper]:http://instapaper.com
[the-tweet]:https://twitter.com/jerodsanto/statuses/240180907380719616
[pushpop]:http://pushpop.herokuapp.com
[pushpop-source]:https://github.com/jerodsanto
