---
title: Symlink Your Samba Shares
date: '2008-07-23'
categories:
- sysadmin
draft: false
---

Lets face it, oftentimes a symbolic link is just the quickest/easiest solution to the task at hand.

To configure [Samba][1] to allow symlinking directories/files into your shared directories, add the following three lines to the global section of `smb.conf`:

```bash
follow symlinks = yes
wide symlinks = yes
unix extensions = no
```

Easy peasy lemon squeezy.


[1]: http://www.samba.org
