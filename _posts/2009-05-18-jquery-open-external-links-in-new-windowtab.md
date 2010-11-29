---
layout: post
published: true
title: "jQuery - Open External Links In New Window/Tab"
excerpt: "Use jQuery to add the target attribute to links so it doesn't muck up the HTML."
---

The common technique to force links to open a new window or tab is to add a `target` attribute like so:

{% highlight html %}
<a href="http://hulu.com" target="_blank">check it out</a>
{% endhighlight %}

This works just fine but is not actually valid markup. Fortunately, we can use jQuery to add the target attribute so it doesn't muck up the HTML.

{% highlight js %}
$(document).ready(function() {
  $('a[rel="external"]').click(function(){
    $(this).attr('target','_blank');
  });
});
{% endhighlight %}

Change that invalid link to look like this instead:

{% highlight html %}
<a href="http://hulu.com" rel="external">check it out</a>
{% endhighlight %}

Now the link forces browsers to open a new window/tab and the markup is still valid. Easy cheesy.
