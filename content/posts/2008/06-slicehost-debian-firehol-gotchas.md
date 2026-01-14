---
title: SliceHost + Debian + FireHOL gotchas
date: '2008-06-20'
categories:
- sysadmin
draft: false
---

Securing your [slice][1] with [FireHOL][2] is a really, really good move. Here are a few notes that may save you some time:

FireHOL requires a kernel config to know which modules to load, SliceHost uses Xen, so to get the kernel configuration in the right place, execute the following commands:

```bash
/proc/config.gz ~ && cd ~

gunzip config.gz && mv config /boot/config-`uname -r`
```

FireHOL ships with a safety net configured in `/etc/defaults/firehol`. It will not start until you edit this file and change this:

```bash
START_FIREHOL=NO
```

to this:

```bash
START_FIREHOL=YES
```

That should do it for gotchas. Now you can lock down your machine to assure you’re only serving what you expect. Fore more on configuring FireHOL, check out their [online tutorial][3]


[1]: http://www.slicehost.com
[2]: http://firehol.sourceforge.net
[3]: http://firehol.sourceforge.net/tutorial.html
