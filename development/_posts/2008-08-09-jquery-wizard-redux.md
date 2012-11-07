---
layout: post
published: true
title: "jQuery Wizard Redux"
excerpt: "I was interested in creating a step-by-step form wizard for a Rails app I’ve been working on, so naturally I began searching for a jQuery plugin or tutorial. The best thing I could find was a ‘plugin’ written back in June of 2007..."
---

I was interested in creating a step-by-step form wizard for a Rails app I’ve been working on, so naturally I began searching for a jQuery plugin or tutorial. The best thing I could find was a ‘plugin’ written back in June of 2007 on [this blog][1].

The [demo][2] was quite attractive so I immediately began trying to work this implementation into my app. Upon reviewing the source code, I became a little less excited because the markup and styling left a lot to be desired. So instead of just complaining about it in the comments of the blog post (as had become my unfortunate custom), I figured I’d just re-write the thang until I was happy with it.

A few of my redesign goals:

* Eliminate redundant step titles and descriptions
* Remove unneeded styles from [Cody Lindley’s CSS step menu][3]
* More jQuery, less HTML
* Use valid markup
* Reduce LOC dramatically
* Comment code well to increase learning/understanding potential

So How’d it turn out? I validated the markup, removed all redundancy, reduced the HTML required from 84 to 21 LOC, the CSS from 191 to 108, and made the JavaScript unobtrusive. As far as the commenting and quality of the JavaScript used, I’ll leave that for you to judge.

To see the wizard in action, follow [this link][4]. You can also download all the source files as a [zip][5] or [tarball][6].

Feel free to give suggestions in the comments section. Or do as I did and modify my version to make it even better!


[1]: http://worcesterwideweb.com/2007/06/04/jquery-wizard-plugin/
[2]: http://worcesterwideweb.com/jquery/wizard/
[3]: http://codylindley.com/CSS/325/css-step-menu
[4]: http://jerodsanto.net/src/wizard/demo/
[5]: http://jerodsanto.net/src/wizard/wizard.zip
[6]: http://jerodsanto.net/src/wizard/wizard.tgz
