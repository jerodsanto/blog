---
title: Tee for Two
date: '2012-05-16'
categories:
- sysadmin
draft: false
---

[Tee][tee] is one of those commands so simple, so basic that you've either been using it for years (and turn your nose up at me for writing about something so obvious) or you'll wish you had been (and sing my praises for writing about something so useful).

Sometimes you want to send a program's output to two locations. The most obvious case (and really the only one that I use) is when you want to display logging/debugging information in your shell and also capture it on disk for later analysis. Tee makes it dead simple. For example, an uploader Ruby script that logs to STDOUT:

```console
ruby uploader.rb | tee uploader.log
```

You can also use it as a middle man between between programs. For example, finding pdf files in a directory, writing the results to a new file while also using a pager on them:

```console
find ~/Documents -name *.pdf | tee pdfs.log | less
```

You'll find the `tee` command preinstalled on most unixes and in the package repositories of those that don't ship with it. I'm pretty sure Windows PowerShell has it too, if you're in to that kind of thing.

[tee]:http://en.wikipedia.org/wiki/Tee_(command)
