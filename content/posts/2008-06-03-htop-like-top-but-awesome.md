---
title: 'htop: like top, but awesome'
date: '2008-06-03'
categories:
- sysadmin
draft: false
---

If you’ve been hacking at your linux CLI for a little while, you’re probably familiar with the pic below. If not, just type `top` and your terminal will spring to life with an ever-updating process and usage display.

![top](/wp-content/uploads/2008/06/top.jpg)

While very useful, `top`’s output is oogly. It’s the 21st century already! Let’s use some colors!!

Thankfully, `htop` is here to save the day. To install on a Debian-based linux, simply type:

```bash
sudo apt-get install htop
```

now we should have `htop` installed. Let’s add a quick alias so we don’t accidentally launch `top` anymore. Open your `.bashrc` in your favorite editor and add the following code to it:

```bash
if [ -f /usr/bin/htop ];then
  alias top='htop'
fi
```

Now whenever you start a terminal session and type `top` you’ll launch `htop` instead (but only if `htop` is installed on the system). Quickly tell bash to re-read your configuration file and try launching `htop`

![htop](/wp-content/uploads/2008/06/htop.jpg)

And there’s the **awesome**
