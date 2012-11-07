---
layout: post
published: true
title: "Sass Never Forgets"
excerpt: "A Sass mixin for centering a div on a page horizontally and vertically."
---

Some CSS techniques require me to Google about like a chicken with its head cut off. One such technique is placing a div in the dead center of a page (vertically and horizontally). Since I'm using [Sass][1] pretty much exclusively these days, I decided to define this technique as a mixin so I don't have to look it up anymore.

Hopefully this can be of use to others. YMMV:

The mixin definition:

{% highlight sass %}
=dead-center(!height,!width)
  :height= !height
  :margin-top= -(!height / 2)
  :top 50%
  :width= !width
  :margin-left= -(!width / 2)
  :left 50%
  :position absolute
  :text-align center
{% endhighlight %}

To use it on an element:

{% highlight css %}
#centered
  +dead-center(200px,500px)
{% endhighlight %}

Now I'll never forget how. Thanks Sass!

[1]: http://sass-lang.com
