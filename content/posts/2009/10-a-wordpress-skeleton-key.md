---
title: A WordPress Skeleton Key
date: '2009-10-29'
categories:
- announcement
draft: false
---

File this one under** "scratching my own itch"**

## A Problem

I often use WordPress as a CMS and have a couple of sites with many users contributing. I rarely go a week without an email or phone call from a user who needs help posting. When it comes to remote support there is no substitute for seeing what they're seeing.

However, if you want to login to the site with their user account you have to either ask for their password (_tacky & insecure_) or reset their password temporarily (_amateurish & annoying_).

## A Solution

~
<img class="alignright size-thumbnail wp-image-711" title="large_SkeletonKeyP" src="/wp-content/uploads/2009/10/large_SkeletonKeyP-150x150.jpg" height="150" alt="large_SkeletonKeyP" width="150" />
Say goodbye to the days of _tacky, amateurish, insecure & annoying_. The <a href="http://wordpress.org/extend/plugins/skeleton-key/" rel="external">Skeleton Key</a> plugin allows WordPress administrators (level 10 users) to login to the site as any user by authenticating with the user's login and their own (administrator) password. Once logged in, you _are_ that user. Handy, huh?

*****UPDATE*****
The plugin has already gotten some TLC and it is now more performant and secure. We are now requiring admins to login with their own login followed by a "+" followed by the user's login. This will cut down on the chances of people guessing administrative passwords. In a weird, corny way the "+" is your digital skeleton key... so to login as user "joeblow" as an admin I would provide:

username = admin+joeblow
password = [the admin's password]
**/***UPDATE*****

## An Explanation

This plugin is dead simple. It hooks into WordPress' authentication chain using 2.8's new '**authenticate**' hook. The Skeleton Key's function sets its priority higher than the built-in authentication functions and checks the password against the admin account provided before the "+" in the database. If the check fails it returns an error and the next function in the chain is called (like normal). If it matches, the <a href="http://wordpress.org/extend/plugins/skeleton-key/" rel="external">Skeleton Key</a> hands back the user account tied to the login and you're good to go.

The <a href="http://github.com/jerodsanto/wp-skeleton-key" rel="external">source is on GitHub</a>, like usual. Feel free to grok it & provide feedback if interested.
