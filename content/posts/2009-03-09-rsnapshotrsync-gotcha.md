---
title: Rsnapshot (Rsync) Gotcha
date: '2009-03-09'
categories:
- sysadmin
draft: false
---

If you're trying to backup a remote host using [rsnapshot][1] (or rsync by itself) and run into one of the following ambiguous errors:

**rsnapshot version:**

```console
ERROR: /usr/bin/rsync returned 12 while processing ...
```

**rsync version:**

```console
rsync error: error in rsync protocol data stream (code 12)
```

It's probably because you don't have rsync installed on the remote host (doh!)


[1]: http://rsnapshot.org/
