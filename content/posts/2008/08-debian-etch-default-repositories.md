---
title: 'Debian Etch: Default Repositories'
date: '2008-08-22'
categories:
- sysadmin
draft: false
---

In case you muck up your `/etc/apt/sources.list` and want to set it back to the defaults, just copy and paste this in:

```bash
deb http://ftp.debian.org/debian/ etch main
deb-src http://ftp.debian.org/debian/ etch main

deb http://security.debian.org/ etch/updates main contrib
deb-src http://security.debian.org/ etch/updates main contrib
```
