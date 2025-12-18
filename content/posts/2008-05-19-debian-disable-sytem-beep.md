---
title: 'Debian: Disable Sytem Beep'
date: '2008-05-19'
categories:
- sysadmin
draft: false
---

Here’s how to turn off that annoying system beep at your Debian CLI:

Just edit `/etc/modprobe.d/blacklist` and append this:

```bash
blacklist pcspkr
```

Then reboot. Can’t wait for reboot? type this command:

```bash
sudo rmmod pcspkr
```
