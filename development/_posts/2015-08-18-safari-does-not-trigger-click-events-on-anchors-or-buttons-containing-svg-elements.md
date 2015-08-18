---
layout: post
published: true
title: "Safari does not trigger click events on anchors or buttons containing SVG elements"
excerpt: "This ruined my morning."
---

This fact will ruin your day if, for instance, you are expecting Rails' jQuery UJS to Just Work when you add a `remote: true` or `method: :post` to that `link_to` helper. You know, something like this:

It'll work in Chrome. It'll work in Firefox. But Safari on the other hand...

Safari will not trigger a `click` event and whatever JavaScript you were expecting to fire will not. How to fix? In your CSS:

{% highlight css %}
svg {
  pointer-events: none;
}
{% endhighlight %}

This took me way too long to diagnose. Hopefully this post saves you some time/money!
