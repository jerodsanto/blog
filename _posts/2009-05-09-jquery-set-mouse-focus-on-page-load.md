---
layout: post
published: true
title: "jQuery - Set Mouse Focus On Page Load"
excerpt: "How to set the mouse's focus to an element on the page when the DOM is ready, using jQuery"
---

### First Input:

{% highlight js %}
$(document).ready(function() {
  $('input:text:first').focus();
});
{% endhighlight %}

### First Empty Input:

{% highlight js %}
$(document).ready(function() {
  $('input:text[value=""]:first').focus();
});
{% endhighlight %}
