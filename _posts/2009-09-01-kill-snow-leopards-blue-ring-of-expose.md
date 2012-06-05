---
layout: post
published: true
title: "Kill Snow Leopard's Blue Ring of Expos&eacute;"
excerpt: "Looks like <a href='http://twitter.com/dougneiner/status/3679180990'>I'm not the only one</a> who hates Snow Leopard's blue ring around selected windows in Exposé."
---

Looks like [I'm not the only one][1] who hates Snow Leopard's blue ring around selected windows in Exposé.

Thankfully, we don't have to live with such monstrosities. Here's a quick fix to free yourself from the blue haze. Fire up Terminal.app, then:

{% highlight console %}
cd /System/Library/CoreServices/Dock.app/Contents/Resources/
sudo mv expose-window-selection-big.png expose-window-selection-big.ugly
sudo mv expose-window-selection-small.png expose-window-selection-small.ugly
sudo killall Dock
{% endhighlight %}

This will disable the blue rings altogether, but you may want to replace these two images with some custom ones that look a little cooler instead.

Let me know via the comments or on [Twitter][2] if you find some replacement images!

*****UPDATE*****

[My friend Doug][3] provided some [drop-in replacement images][4] that are a huge improvement. Just drop them into the directory after renaming the default images. So after step #3 above, do:

{% highlight console %}
open .
{% endhighlight %}

This will open Finder in the current directory. Now drag the replacement images into this directory, provide your password, and kill the Dock.

{% highlight console %}
sudo killall Dock
{% endhighlight %}

VoilÃ !

[DOWNLOAD HERE][4]

[1]: "http://twitter.com/dougneiner/status/3679180990"
[2]: "http://twitter.com/jerodsanto"
[3]: "http://www.google.com/profiles/douglasneiner"
[4]: "http://blog.jerodsanto.net/wp-content/uploads/2009/09/expose-rings.zip"
