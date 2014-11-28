---
layout: post
published: true
title: "7 Ways to Level Up Your Sublime Text Editing"
excerpt: ""
---

## 1) Packages. Control them.

Installing [PackageControl][package-control] is the first step on many Sublime Text 2 (ST2) blog posts around the web. Rightly so. It opens up a new world of functionality and makes managing that world a piece o' cake.

Once you have it installed, you're a quick ⇧⌘P and a "pack" from everything you need.

[![&quot;Upgrade/Overwrite All Packages&quot; is super cool][package-control-pic]][package-control]

## 2) Packages. Sync them.

Even with PackageControl, installing and updating packages on each of your machines is more work than it needs to be.

Instead of doing that, just move the `Packages` directory to your Dropbox or Google Drive and symlink it so ST2 can use it.

On OS X with Dropbox it's as easy as this:

On your first system:

{% highlight console %}
mv ~/Library/Application\ Support/Sublime\ Text\ 2/Packages \
  ~/Dropbox/appsync/Sublime\ Text\ 2/Packages
ln -s ~/Dropbox/appsync/Sublime\ Text\ 2/Packages \
  ~/Library/Application\ Support/Sublime\ Text\ 2/Packages
{% endhighlight %}

On subsequent systems:\

{% highlight console %}
rm ~/Library/Application\ Support/Sublime\ Text\ 2/Packages
ln -s ~/Dropbox/appsync/Sublime\ Text\ 2/Packages \
  ~/Library/Application\ Support/Sublime\ Text\ 2/Packages
{% endhighlight %}

The really great thing about this is that ST2 stores your preferences in a package called `User` so all of your preferences come along for the syncing ride.

## 3) Speaking of preferences...

One of the first things about ST2 that made me go "ZOMG THIS IS AWESOME" is how it natively supported a handful of small features that are a PITA to get working in TextMate (my previous editor of choice) and Vim (my forever-editor-of-second-choice).

IN ST2, they're just a boolean flag in your preferences.

Here they are, in JSON format of course:

{% highlight javascript %}
{
  "ensure_newline_at_eof_on_save": true,
  "trim_trailing_white_space_on_save": true,
  "translate_tabs_to_spaces": true,
  "tab_size": 2,
  "rulers": [80]
}
{% endhighlight %}

The `ensure_newline_at_eof_on_save` and `trim_trailing_white_space_on_save` settings will save you (and others) endless headaches when collaborating via version control.

The `translate_tabs_to_spaces`, `tab_size`, and `ruler` settings will help keep your code readable. ([more on that here][white-spaces-post])

## 4) Git with it

The [git package][git-package] is super handy to have around. It puts all the requisite git commands at your finger tips via the Command Palette.

I don't personally use it to make commits, but where it really shines is in providing `git blame` and `git log` views in the context of the current ST2 tab.

Here is the result of executing `Git: Log Current File` on a project's `pricing.erb` file:

[![Git: Blame works similarily][git-log-current-file-pic]][git-package]

Selecting one of the log items from the list opens the commit details in a new tab. That's awesome.

## 5) N Views to a Kill

One of my early gripes about ST2 was that it didn't provide split views. Then I realized that I was completely wrong and it does provide split views! Don't you love when that happens?

You can find the settings for split views in **View** -> **Layout**. There are many choices there, but all I usually need is two columns side-by-side so I've trained myself on two keyboard shortcuts:

*  ⌘⌥2 &mdash; switch to the two column side-by-side layout
*  ⌘⌥1 &mdash; switch to the default on column layout

Once you have multiple views up you can drag & drop tabs between them. You can even open the same file in multiple views, if that floats your boat.

![][split-view-pic]

## 6) Enhance the Sidebar

The [SidebarEnhancements package][sidebar-enhancements-package] fills such a huge void in ST2's feature list that it should really be merged into core.

Not only does it add handy things like the abilities to "close", "move", "rename", and "delete" files (how avant garde!), but you can also "open with" a managed list of external applications.

I like to preview my Markdown files in [Marked][marked-app], which this package enables.

![Marked is complements ST2 nicely][open-with-marked-pic]

If any influential ST2 people are reading this, please seriously consider getting SidebarEnhancements into ST2 proper.

## 7) All the small keys

The best way to level up your text editing is by removing round trips to the mouse.

In addition to supporting many of the Operating System's shortcuts, ST2 has a plethora of keyboard shortcuts for you to master.

Here are a handful of them that I believe give you the most bang for your buck:

* ⌘T &mdash; Goto Anything. This is TextMate's killer feature implemented flawlessly
* ⌘D &mdash; Quick add next. When you have a text string selected and you want to quickly select subsequent matching strings, this is your best friend. Once you have all the things you want selected you can operate on them as a group (edit, delete, upcase, etc.)
* ⌘L &mdash; Select the current line. Hold it down to contine to select subsequent lines
* ⇧⌘[ and ⇧⌘] &mdash; Navigate left and right through your open tabs, just like in Chrome/Safari
* ⌘K ⌘N &mdash; Fold code at indentation N
* ⌘K ⌘J &mdash; Unfold all code in the document
* ⌘K ⌘B &mdash; Toggle the sidebar. This is essential when working on a small screen and using split columns

## Fin

Those are the big ones. There's also writing your own custom snippets, but that's a big enough conversation to warrant its own post. Subscribe to the [feed][rss-feed] or follow along on [Twitter][twitter-feed] to be notified of that and other future posts!

[package-control]:http://wbond.net/sublime_packages/package_control
[package-control-pic]:http://jerodsanto.net/drop/st2-package-control-20120817-104740.png
[white-spaces-post]:/2012/07/some-white-spaces-are-more-equal-than-others/
[git-package]:https://github.com/kemayo/sublime-text-2-git
[git-log-current-file-pic]:http://jerodsanto.net/drop/st2-git-log-current-file-20120817-110847.png
[split-view-pic]:http://jerodsanto.net/drop/st2-split-view-same-file-20120817-120223.png
[sidebar-enhancements-package]:https://github.com/titoBouzout/SideBarEnhancements
[marked-app]:http://markedapp.com/
[open-with-marked-pic]:http://jerodsanto.net/drop/sublime-text-open-with-marked-20120813-101112.png
[rss-feed]:/feed.xml
[twitter-feed]:http://twitter.com/jerodsanto
