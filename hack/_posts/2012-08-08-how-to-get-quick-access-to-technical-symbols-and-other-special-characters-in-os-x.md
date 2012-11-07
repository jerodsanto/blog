---
layout: post
published: true
title: "How to get quick access to technical symbols and other special characters in OS X"
excerpt: "If you find yourself typing out \"command\", \"option\", or \"control\" often and want to take a principled stand against verbosity, I have good news for you!"
---

Technical folks like ourselves often have to describe keyboard combinations to other (sometimes not so) technical folks. If you find yourself typing out "command", "option", or "control" often and want to take a principled stand against verbosity, I have good news for you!

OS X has a new feature in Mountain Lion (it may have been in Lion too, but I never used it and can no longer confirm) that provides customizable symbol substitution.

{% aside notice %}
You may already know this feature (and figured out how to disable it) if you've ever had an inadvertent TM transformed into a &#8482; symbol or a (c) transformed into a &copy; symbol.
{% endaside %}

To customize these substitutions, open up *System Preferences* and click on the *Language & Text* icon. From there, select the *Text* tab and you'll see screen like this one:

![the default text substitution settings][text-settings-before]

Clicking the **+** button in the bottom left corner let's you add your own substitutions. Since I don't always want to convert the word "command" to the &#x2318 symbol, I came up with a system:

* cmd+ converts to &#x2318;
* opt+ converts to &#x2325;
* ctrl+ converts to &#x2303;

Now I have easy access to my most used technical symbols, which is pretty handy if you ask me. The end result looks like this:

![my customized text substitution settings][text-settings-after]

I'm sure you could come up with many other uses for this, like inserting Emoji, website addresses, etc.

It's like a free, built-in little [TextExpander][textexpander]!

[text-settings-before]:http://jerodsanto.net/drop/text-settings-before-20120808-153339.png
[text-settings-after]:http://jerodsanto.net/drop/text-settings-after-20120808-153117.png
[textexpander]:http://smilesoftware.com/TextExpander/
