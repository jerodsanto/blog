---
title: Starting Asterisk on Boot in Debian
date: '2008-09-03'
categories:
- sysadmin
draft: false
---

Here’s a quickie. You just compiled [Asterisk][1] on your [Debian][2] server and you want to make sure it starts when you reboot. Here’s how:

Look in the `/contrib/init.d` folder of your Asterisk source directory. You’ll see a file called `rc.debian.asterisk`. If you installed Asterisk to the default location, don’t worry about editing this file. If you installed to a different location (eg - /usr/local), change the following line in the file:

```bash
DAEMON=/usr/sbin/asterisk
```

Point this at your Asterisk binary. Not sure where it is? Just type `which asterisk` from the command line and it will show you the full path.

Next, copy the file into the `/etc/init.d/` directory like so:

```bash
cp rc.debian.asterisk /etc/init.d/asterisk
```

(NOTE: I am renaming the file on purpose)

Now you can control Asterisk by executing this script. Make sure it starts and stops before continuing:

```bash
/etc/init.d/asterisk start
Starting Asterisk PBX: asterisk.
/etc/init.d/asterisk stop
Stopping Asterisk PBX: asterisk.
```

Finally, make the system run this script during the boot process:

```bash
update-rc.d asterisk defaults
```

Done and done. Reboot and check the process list just to be sure!


[1]: http://asterisk.org/
[2]: http://debian.org/
