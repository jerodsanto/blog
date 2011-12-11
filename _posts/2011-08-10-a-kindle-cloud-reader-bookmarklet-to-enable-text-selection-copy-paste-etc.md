---
layout: post
published: true
title: "A Kindle Cloud Reader Bookmarklet to Enable Text Selection, Copy/Paste, Et Cetera"
excerpt: "Amazon's new Kindle Cloud Reader is an awesome web-based reader. However, they won't let you select text to copy/paste, look up in dictionary, or do any of the other cool stuff that we can do on the web. This post provides a bookmarklet that unlocks those features."
---

Amazon's new [Kindle Cloud Reader][cloud-reader] is a really cool web app and yet another step toward the web playing a huge role in mobile like it does on the desktop.

But.

Amazon has crippled a few features that we web denizens come to expect and rely upon. No copy/paste? No highlighting text as I read it? No context menus to look up a word in a dictionary, clip to [Evernote][evernote] or whathaveyou?

[This will not stand, ya know, this aggression will not stand, man.][lebowski]

So I hacked together a bookmarklet which gives your browser those features back. Drag the link below to your bookmarks bar and click it after you load a book in Cloud Reader:

<div class="bookmarklet">
  <a href="javascript:(function(){function c(){var a=this.contentWindow.document.getElementsByTagName("body")[0];this.contentWindow.onclick=null;a._frame=this;a.onmousemove=function(){this._frame.contentWindow.onclick=null;this.setAttribute("style","-webkit-user-select: auto;");this.oncontextmenu=a.onselectstart=null};a.onmousemove()}for(var b=document.getElementsByTagName("iframe")[0].contentWindow.document.getElementsByTagName("iframe"),a=0;a<b.length;a++)c.call(b[a]),b[a].onload=c})();">Uncripple Kindle</a>
</div>

It's quite possible that the bookmarklet will break as Amazon makes changes to the app, so I've put the [source on GitHub][the-gist] for all to participate in its maintenance.

{% aside notice %}
Bookmarklet last updated on October 4, 2011. Please try it and provide feedback.
{% endaside %}

Oh, and I only tested it on Chrome 14 (Mac) and Safari 5.1. I have confirmed that it is NOT working on dev Chrome (currently 16). YMMV.

Happy reading!

[cloud-reader]:https://read.amazon.com
[evernote]:http://evernote.com/
[lebowski]:http://www.imdb.com/title/tt0118715/quotes?qt=qt0464827
[the-gist]:https://gist.github.com/1137337
