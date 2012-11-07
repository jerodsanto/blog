---
layout: post
published: true
title: "Adding Your Own Bookmarks and Bookmarklets to the iOS Simulator's Mobile Safari"
excerpt: "The process is only a little longer than its title"
---

Developing a bookmarklet that will run on iOS devices? You're probably looking for a way to test it that does not include the term "iCloud".

The good news is that you can add your own custom bookmarks and bookmarklets to the iOS Simulator's static list of bookmarks for testing.

The bad news is that doing so is not easy like Sunday mornings.

The post-bad-news good news is that it's not too much work, either, and I will show you how!

{% aside notice %}
This applies to XCode 4.4.1 on OS X 10.8.1. YMMV. Please post issues in the comments.
{% endaside %}

### 1) Find the plist

The Property List that holds the bookmarks is buried deep inside Xcode's bundle. Fire up a terminal and execute this command to navigate to its directory:

{% highlight console %}
cd /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneSimulator.platform/Developer/SDKs/iPhoneSimulator5.1.sdk/Applications/MobileSafari.app
{% endhighlight %}

Once in this directory, execute:

{% highlight console %}
ls -l *Bookmarks*
{% endhighlight %}

You'll see a handful of files, one of which is named `StaticBookmarks.plist`.

![][static-bookmarks]

That's our guy.

### 2) Get permission

Xcode is owned by your system's `root` user, so you can't edit the file just yet. Ideally, you could just do a `sudo open StaticBookmarks.plist`, but that doesn't work anymore. I think the new file versioning stuff in Lion/Mountain Lion breaks it.

Another means to the same end is to take ownership of the `MobileSafari.app` directory and its files, like so:

{% highlight console %}
sudo chown -R `whoami` ../MobileSafari.app
{% endhighlight %}

This isn't ideal, but it works well enough. There is a decent chance that future Xcode upgrades will set the ownership back to `root`, but more likely it will directly overwrite `StaticBookmarks.plist` in which case you're back at square one anyhow.

### 3) Edit in Xcode

Now that you own the file and its owning directory, Xcode will let you edit it. Open it in Xcode like so:

{% highlight console %}
open StaticBookmarks.plist
{% endhighlight %}

You should see something like this:

![Property List Editor inside Xcode][xcode-plist-editor]

Each item inside the "Root" key is a bookmark. To add your own, just click the + button next to the "Root" key and add a new Dictionary item. It should have two String keys, one for the bookmark's Title, and one for the bookmark's Contents.

When you're all done adding your own bookmark(let), it should look something like this:

![Push Pop is a little bookmarklet I'm working on][xcode-plist-edited]

### 4) Have at it

Fire up the iOS Simulator and you should see your new bookmark there in the list with the others!

![][ios-simulator-bookmarks]

[xcode-plist-editor]:http://jerodsanto.net/drop/xcode-plist-editor-20120829-130203.png
[xcode-plist-edited]:http://jerodsanto.net/drop/xcode-plist-edited-20120829-130500.png
[static-bookmarks]:http://jerodsanto.net/drop/staticbookmarks-20120829-125416.png
[ios-simulator-bookmarks]:http://jerodsanto.net/drop/ios-simulator-bookmarks-20120829-130853.png
