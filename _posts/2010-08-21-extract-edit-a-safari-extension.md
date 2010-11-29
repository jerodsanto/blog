---
layout: post
published: true
title: "Extract & Edit a Safari Extension"
excerpt: "Turns out it's pretty easy to edit a Safari extension that you've downloaded. Here's how."
---

I <a href="http://twitter.com/sant0sk1/status/21673729874">asked this on Twitter</a> the other day, but alas nobody came back with an answer.

Turns out it's pretty easy to edit a Safari extension that you've downloaded. The downloaded file will have a <span class="keyword">.safariextz</span> file extension. To extract the contents of the file, use the <span class="keyword">xar</span> command. I'll demonstrate with the <a href="http://www.awarepixel.com/safari/bettersource/">BetterSource</a> extension.

{% highlight console %}
jerod@mbp:~/Downloads$ xar -xf BetterSource-1.0.safariextz
{% endhighlight %}


This will create a new directory called <span class="keyword">BetterSource-1.0.safariextension</span> which has the plugin's source files (plists, html, js, css, etc.). You can add this to Safari's Extension Builder by:

<ol>
<li> Selecting Develop -> Extension Builder from Safari's menu bar</li>
<li> Clicking the + button in the lower-left corner of the editor window</li>
<li> Pointing the open dialog box to the BetterSource-1.0.safariextension directory</li>
</ol>

And that's all there is to it.
