---
layout: post
published: true
title: "Your dev user should be really crazy"
excerpt: "Save yourself a lot of pain down the road by ensuring your system handles crazy input now."
---

Up until now, my dev user on systems I'm building has been pretty predictable. Something like this:

{% highlight ruby %}
User.create first_name: "Jerod", last_name: "Santo"
{% endhighlight %}

There are other attributes like email, password, etc., but you get the point.

This is convenient, but pretty short sighted. I'll use this account for the duration of development. Why not make it more useful by populating its attributes with crazy data?

This user is much more useful:

{% highlight ruby %}
User.create first_name: "<script>alert('OHAI!');</script>", last_name: "朋美"
{% endhighlight %}

Now we're talking! This user will help catch any [XSS][] vulnerabilities and ensure that unicode text is rendered properly.

I know, I know. Your apps are never subject to such fails because you're smart and good looking to boot. But why not?

[XSS]:http://en.wikipedia.org/wiki/Cross-site_scripting
