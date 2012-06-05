---
layout: post
published: true
title: "WordPress Console Update"
excerpt: "It's been awhile since I posted about my <a href='http://github.com/jerodsanto/wordpress-console'>open-source</a> WordPress Console (WPC) plugin, and enough has happened since I released it that I thought it deserved a little mention."
---

It's been awhile since I posted about my <a href="http://github.com/jerodsanto/wordpress-console" rel="external">open-source</a> WordPress Console (WPC) plugin, and enough has happened since I released it that I thought it deserved a little mention.

### What's New

<ol>
<li>Basic Security</li>

Thanks to <a href="http://blog.apokalyptik.com/" rel="external">Apokalyptik</a>, the back-end PHP scripts now require a shared secret from the console before executing any code. As he so eloquently described it:

<blockquote>As is the plugin is negligently insecure (but outstandingly cool and useful and I want this plugin to be installable, thus the patch)</blockquote>

Even though the increased security is a huge improvement from what we had before, I still wouldn't run the plugin on production servers.

<li>Tab-Completion</li>

This is the biggest functional improvement to WPC by far. It was a feature that I wanted to release the plugin with initially, but it didn't make the cut because I wanted to release early. The best thing about tab-completion is that it allows you to explore the PHP & WP environments in a very fulfilling way. If you haven't tried the plugin with this feature, please give it a go.

<li>Small Things</li>

WPC now handles command history with more grace. Using the up-arrow puts the cursor at the end of input, you can't walk off the end of the history buffer, and a few other improvements to the code quality.
</ol>

### Some Press

Thanks to <a href="http://pixelgraphics.us/" rel="external">Doug Neiner</a> for giving WPC a solid review on the <a href="http://fuelyourcoding.com/plugin-review-wordpress-console" rel="external">Fuel Your Coding blog</a>, and for contributing to the project.

### What's Next

I'm not really sure.

I've considered adding in-console documentation for PHP & WP functions, but not sure if people would use it much. I also have a command-line version of the console which I could spit shine and include with the plugin, but that might not be too attractive either. Maybe the plugin is as good as done. Any ideas or suggestions?
