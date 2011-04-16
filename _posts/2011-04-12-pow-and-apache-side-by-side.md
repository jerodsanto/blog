---
layout: post
published: true
title: "Pow and Apache Side-by-Side"
excerpt: "Pow is the new hotness for serving up Ruby apps in development. Apache is the old standby for serving up PHP (and other) apps in development. Pow and Apache don't play nice, but we can change that."
---

You've probably heard of [Pow][pow]. It is awesome. However, it [doesn't play nice][incompatible] with Apache running on the same box. Pow redirects all localhost traffic on port 80 to its own application server listening on a different port. This sucks for anybody &mdash; myself included &mdash; who also develops non-Ruby web apps using Apache virtual hosts.

Thankfully there's an elegant workaround to this problem and it comes from the future: [IPv6][ipv6].

{% aside notice %}
I'm sure you know that IPv6 is not actually from the future, but its wide-spread adoption certainly is!
{% endaside %}

By configuring Apache to use IPv6 and Pow to use IPv4 they can both live in harmony and bind to port 80 to their heart's content. Pow is on IPv4 already, so we just have to get Apache on IPv6. Here's how:

### 1) Make it Listen

Set (or change) the `Listen` directive in your Apache configuration (probably `/etc/apache2/httpd.conf`) to use IPv6 address syntax:

{% highlight apache %}
Listen [::]:80
{% endhighlight %}

The `::` means to bind on all available IPv6 addresses (akin to IPv4's 0.0.0.0). We have to wrap it in square brackets to distinguish the address portion from the colon preceding the port assignment. If you have your `NameVirtualHost` and `VirtualHost` directives set to use `*:80` then you shouldn't need any other changes. Restart Apache and it should be all good.

### 2) Add Hosts

You have to add the hosts you want Apache to serve to `/etc/hosts` with IPv6 addresses so the browser gets routed properly. `::1` is the default loopback address, so add them like so:

{% highlight console %}
::1 localhost
::1 wp30.local
::1 wp31.local
{% endhighlight %}

One thing to note is that it is required to put them on separate lines like that. With IPv4 addresses you could stack them on a single line, but for some reason that doesn't work with IPv6.

To make sure the routing is working properly, ping the hosts using the IPv6 version of ping:

{% highlight console %}
jerod@mbp:~$ ping6 wp30.local
PING6(56=40+8+8 bytes) ::1 --> ::1
16 bytes from ::1, icmp_seq=0 hlim=64 time=0.076 ms
{% endhighlight %}

### 3) Browse It Up

At this point you **should** be able to access both Apache virtual hosts and Pow virtual hosts in your browser. Boom shakalaka

### Notes and Drawbacks

A few things to note about this solution:

First, Chrome doesn't seem to resolve the IPv6 hosts properly, which is strange because both Safari 5 and Firefox 4 do. I'm on the dev channel, so maybe that has something to do with it.

Next, you must add the hosts to `/etc/hosts`. Tools like my [Detours][detours] application do not properly register the IPv6 addresses for lookup (I'm going to see if I can fix that, more to come).

Finally, if IPv6 ever does get deployed into the mainstream, Pow may adopt it and we'll be back where we started. I don't think we have to worry about that for awhile.

As always, YMMV. Enjoy.

[pow]:http://pow.cx/
[incompatible]:https://github.com/37signals/pow/issues/48#issuecomment-973701
[ipv6]:http://en.wikipedia.org/wiki/IPv6
[detours]:http://detoursapp.com


