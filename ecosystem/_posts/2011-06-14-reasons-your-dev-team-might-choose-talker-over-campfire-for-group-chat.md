---
layout: post
published: true
title: "Reasons Your Dev Team Might Choose Talker Over Campfire for Group Chat"
excerpt: "Talker is a great tool for group chat, especially for development teams. Herein I enumerate 3 reasons why it's better suited than Campfire."
---

Many development teams use 37Signals' [Campfire][campfire] for group chat. I've used it just enough to complain about it.

Our team has been trying [Talker][talker] instead. The two tools are similar in many ways, but there are a few things about Talker that stand out to make it, in my opinion, better than Campfire for software development teams. I'll enumerate three of them for you.

### 1) Code snippets are EtherPad sessions

Yes, you read that correctly, and it is awesome. When Talker detects a paste it will format it so all can see like so:

![Talker code paste][talker-paste]

Notice the link in the upper left which says **"View / Edit paste"**? Clicking it will open a new tab/window and join you into an EtherPad session with the snippet's contents pre-populated. Anybody in the chat room can collaboratively live edit the snippet. Brilliant!

### 2) JavaScript Plugin API

As devs we often have thoughts like:

> "This is pretty cool, but it'd be even cooler if _______."

With Talker you can easily fill in that blank.

Most rich web applications' interactive features are implemented in JavaScript. Talker is not unique in this sense. What is unique, however, is that Talker's interactive features are built on top of a _public_ plugin API that you can also build upon.

![Talker plugins][talker-plugins]

In fact, if you [search GitHub][github-search] for "talker plugins" you'll find many plugins have already been written!

[Here's][js-substitute] a handy plugin that provides live substitutions of the previous message.

### 3) Bring Your Own Server

Talker has a REST API, but that's pretty much required these days. What makes Talker even better is that the _entire_ codebase is open sourced (GPL). [Here][talker-code].

Detailed installation instructions are included. The paranoid or cheap &mdash; Talker is free, but private rooms & SSL come at a cost of $12 a month &mdash; among us can run their own instance on their own hardware. How is that for sustainability?

This also allows for deeper integration into your company's custom workflows if the flexibility provided by the JavaScript and REST APIs isn't sufficient.

---

I could go on, but these are the major points that make me want to use Talker and tell others of this great alternative to [The Incumbent][campfire].

[campfire]:http://campfirenow.com
[talker]:http://talkerapp.com
[js-substitute]:https://github.com/cloudhead/talker-plugins/blob/master/talker-substitute.js
[talker-paste]:http://jerodsanto.net/drop/talker-paste-20110614-084721.png
[github-search]:https://github.com/search?type=Repositories&language=&q=talker+plugins&repo=&langOverride=&x=0&y=0&start_value=1
[talker-code]:https://github.com/teambox/teambox-talker
[talker-plugins]:http://jerodsanto.net/drop/talker-plugins-20110614-091155.png
