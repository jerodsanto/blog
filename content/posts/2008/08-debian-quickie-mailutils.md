---
title: 'Debian Quickie: MailUtils'
date: '2008-08-12'
categories:
- sysadmin
draft: false
---

All (except for one RHEL4 box) of the servers I run use [Debian][1]. I have become accustomed to using the default mail client `/usr/bin/mail` that ships with the O/S for reading local email coming in from cron jobs.

Well, it turns out that this handy little tool doesn’t _actually_ ship with a base Debian Etch install.

```bash
bash: mail: command not found
```

Grrrr!

Turns out you have to have mailutils installed to get `/usr/bin/mail`. I always forget this package name so I figured I’d post it here for easy access.

To install the necessary packages under [Debian][1] just issue the following command:

```bash
apt-get install mailutils
```

Enjoy the fresh maily goodness.


[1]: http://debian.org/
