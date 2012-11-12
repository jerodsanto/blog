---
layout: post
published: true
title: "jQuery Tools 101: Nested Tabs"
excerpt: "If you want to nest tabs inside one another you'll need to change things slightly. I demonstrate in this post."
---

[jQuery Tools][1] is the new kid on the block when it comes to jQuery-based user interface libraries. What it offers is a solid foundation of widgets at an extremely small file size (5.8 KB minified).

I decided to ditch [jQuery UI][2] on a recent project when I couldn't get tabs & accordions to play nice together (also, their site was down when I needed it so I took that as a sign). This was a great opportunity to try jQuery Tools and I have been very impressed thus far.

To use the minimal tabs interface you can simply [follow the instructions on their site][3], but if you want to nest tabs inside one another you'll need to change things slightly. I'll demonstrate below:

## the Mark Up

{% highlight html %}
<ul class="tabs main">
  <li><a href="#1" class="main">Main Tab 1</a></li>
  <li><a href="#1" class="main">Main Tab 2</a></li>
</ul>

<div class="panes main">
  <div>this is main tab 1 content. it includes another set of tabs

    <ul class="tabs nested">
      <li><a href="#2" class="nested">Nested Tab 1</a></li>
      <li><a href="#2" class="nested">Nested Tab 2</a></li>
    </ul>

    <div class="panes nested">
      <div>this is my nested tab 1 content</div>
      <div>this is my nested tab 2 content</div>
    </div>

  </div>
  <div>this is my main tab 2 content</div>
</div>
{% endhighlight %}

The key in this sequence is that the seemingly arbitrary href attribute on the tab anchors has different content for the main tabs (#1) than the nested tabs (#2). This is required or your nested tabs will keep returning to the main tabs when you click on a tab link.

## the JavaScript

To configure the nested tabs, you can define the JavaScript as simply as this:

{% highlight js %}
$(document).ready(function() {
  $("ul.main.tabs").tabs("div.main.panes > div", {tabs: 'a.main'});

  $("ul.nested.tabs").tabs("div.nested.panes > div", {tabs: 'a.nested'});
});
{% endhighlight %}

the `tabs()` function is called on a jQuery selector that matches the unordered list and it takes as its first argument a selector for where to find the tab's content panes. It's second argument is a single option that tells `tabs()` which elements to use as links for the tabs. The default is `a`, but to differentiate the main tabs from the nested tabs, it needs to be passed explicitly with the correct class for the anchor.

## the Style

Of course, to make these look cool you'll need some nice CSS applied to the elements at play. I'll leave that to you, but you can get a decent start from the [demo page][4] for the library.

Enjoy!


[1]: http://flowplayer.org/tools/index.html
[2]: http://jqueryui.com
[3]: http://flowplayer.org/tools/demos/tabs/index.html
[4]: http://flowplayer.org/tools/tabs.html
