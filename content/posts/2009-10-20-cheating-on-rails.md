---
title: Cheating on Rails
date: '2009-10-20'
categories:
- reference
draft: false
---

Fellow command-line junkies either love <a href="http://cheat.errtheblog.com/" rel="external">the cheat gem</a> by <a href="http://ozmm.org/" rel="external">Chris Wanstrath</a> or they've never heard of it.

What "cheat" offers is a plethora (currently 601) of text-based cheat sheets at the tip of your fingers. Go ahead, give it a try:

```console
jerod@mbp:~$ sudo gem install cheat
jerod@mbp:~$ cheat apache2
```

Pretty cool, huh?

Some cheats are kind of long, so pipe them to "less" for pagination:

```console
jerod@mbp:~$ cheat git | less
```

List all the cheats available:

```console
jerod@mbp:~$ cheat sheets
```

Or find one matching a search string:

```console
jerod@mbp:~$ cheat sheets | grep [your search string]
```

To learn more about cheat:

```console
jerod@mbp:~$ cheat cheat
```

## Cheat on Rails

There a bunch of Rails-related cheats, which are great help in a pinch. Here are a few that I highly recommend:

* **status_codes** - all HTTP status codes and their matching Rails symbols
* **rails_migrations** - for when you forget valid data types
* **rubydebug** - debugging is powerful but it's easy to forget how
* **rails_tips** - nice reminders and tips for beginners
* **jquery** - you are using jQuery in your Rails apps, right?

Let me know if you find any juicy cheats that I should know about.
