---
title: My Perfect OS X FTP Server
date: '2008-07-17'
categories:
- ecosystem
draft: false
---

I don’t like FTP. Reasons abound, but to list a couple:

1. Too complex to configure
2. Insecure by default

But lets face it, sometimes you need to set up a quick and dirty FTP server for one-time use. Sure, OS X supports FTP file sharing natively but its a bit clunky because you have to either A) allow Anonymous access, or B) create a user account on your system and set up sharing on it. Lame.

There are many freeware,and shareware FTP clients but not too many servers. After a cursory review of all the offerings on [IUseThis][1], I settled on [PureFTPd Manager][2] which is a free and open-source front-end for [PureFTPd][3]…and what a great choice I made.

Why does this app rock my socks off?

1. Dead simple configuration - nice GUI walks you through everything
2. Virtual users - one new system account and endless virtual users it can represent
3. Logs and live status updates from GUI
4. Uninstalls in a few clicks
5. SSL/TLS support


[1]: http://osx.iusethis.com
[2]: http://jeanmatthieu.free.fr/pureftpd/
[3]: http://www.pureftpd.org/project/pure-ftpd
