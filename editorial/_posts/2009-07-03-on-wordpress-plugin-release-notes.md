---
layout: post
published: true
title: "On WordPress Plugin Release Notes"
excerpt: "Plugin upgrade notifications and one-click installs are great for both developers and users alike, but there is one thing about them that I find irritating as a user, and easily avoidable as a developer: **displaying reasons to upgrade**."
---

Plugin upgrade notifications and one-click installs are great for both developers and users alike, but there is one thing about them that I find irritating as a user, and easily avoidable as a developer: **displaying reasons to upgrade**.

I love, love, love new software and usually can't wait to install the latest shiny update. However, before I put myself at risk and click the **upgrade automatically** button, I'd like to know what the new release is going to do differently than what I already have. I'm pretty sure I'm not alone in this desire, as the WordPress developers have implemented a nice **View Version [x] Details** button right there in the plugin admin page. You know, this one:

<img class="aligncenter size-full wp-image-506" title="update_notification" src="/wp-content/uploads/2009/07/update_notification.png" height="89" alt="update_notification" width="640" />

Awesome!! Well, kinda.

The problem is that most plugin developers don't include release notes with each version, rendering the awesomeness of no effect. For instance, I have **no idea** what I'm getting by upgrading the [Google XML Sitemaps][1] plugin. This is what you see after clicking the "View Version 3.1.4 Details" button:

<img class="aligncenter size-full wp-image-508" title="update_no_info" src="/wp-content/uploads/2009/07/update_no_info.png" height="393" alt="update_no_info" width="640" />

The closest thing offered there is a link to the Changelog, which opens in a new tab/window. Totally lame. Check out the [Changelog][2]. It is filled with totally useful information. Make it accessible!

Slap your users in the face with reasons to upgrade!

Contrast that with what is displayed to potential upgraders (not sure if that's even a word) of my [WordPress Console][3] plugin:

<img class="aligncenter size-full wp-image-510" title="update_info" src="/wp-content/uploads/2009/07/update_info.png" height="405" alt="update_info" width="640" />

Two things to notice:

1. WordPress provides a special tab called **Changelog** that will be loaded right inside this window by adding a **Changelog** section to your plugin's readme.txt. USE IT!! ([more readme info][4])
2. For some people, even clicking the Changelog tab is asking too much of them. Including what's new since the last release of your plugin right in the description is a big win for everybody involved.

There are many plugins that handle this just fine, but many more that do not. My hope is that other WordPress plugin developers will adopt this practice, to the benefit of their users and the community as a whole.


[1]: http://wordpress.org/extend/plugins/google-sitemap-generator/
[2]: http://www.arnebrachhold.de/projects/wordpress-plugins/google-xml-sitemaps-generator/changelog/
[3]: http://wordpress.org/extend/plugins/wordpress-console/
[4]: http://wordpress.org/extend/plugins/about/readme.txt
