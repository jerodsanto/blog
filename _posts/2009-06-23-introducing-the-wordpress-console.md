---
layout: post
published: true
title: "Introducing the WordPress Console"
excerpt: "I enjoy developing for WordPress, but I've been spoiled by Rails and I often long for an interactive console for WordPress."
---

One killer feature of Ruby on Rails (for me) is **script/console**. Being able to interact with your code and data inside the full Rails environment is a powerful tool for development. Some days I practically live there, and if I get carried away, I do a lot of my testing there too (bad, I know).

I love Ruby and Rails, but being a contract developer means I go where the money is and recently that has been in WordPress plugin development. I enjoy developing for WordPress, but I've been spoiled by Rails and I often long for an interactive console for WordPress.

As a result, I've been developing (and using) a Wordpress plugin built for Wordpress developers. It provides an in-browser console where you can "play" with the code you're working on.

If a picture is worth 1,000 words, this screencast will be worth at least a bazillion of 'em:
~
<object height="368" width="640"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="http://vimeo.com/moogaloop.swf?clip_id=5300607&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" /><embed allowfullscreen="true" src="http://vimeo.com/moogaloop.swf?clip_id=5300607&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=00ADEF&amp;fullscreen=1" allowscriptaccess="always" type="application/x-shockwave-flash" height="368" width="640"></embed></object>

So there you have it. It is currently version **0.1.0** (very young) and I would love some help to make it even more awesome. The source code is hosted on [GitHub][1], so please fork away and I'd be happy to merge in your changes.

Or, simply go [download][2] the plugin and try it.

***NOTE***
In developing this plugin, I leaned on a few other open-source projects for inspiration (and in some cases, code). They are:

* [PHP_Shell][3]
* [htsh][4]

I thank the authors for opening their source.


[1]: http://github.com/sant0sk1/wordpress-console
[2]: http://wordpress.org/extend/plugins/wordpress-console/
[3]: http://pear.php.net/package/PHP_Shell/
[4]: http://code.google.com/p/htsh/
