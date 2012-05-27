---
layout: post
published: true
title: "Back That Gmail Up"
excerpt: "Girl, you looks good, won't you back that Gmail up"
---

I'm not leery of Google shuttering its Gmail service, but I can imagine a scenario where they cut off *my* access to Gmail and I have no way to plead my case to the search behemoth. So I went looking for a Gmail backup solution to put my mind at ease.

There are many options out there, but I ended up using [BaGoMa][bagoma] with much success. Things that turned me on to BaGoMa:

1. People were raving about it on a forum
2. Python is already on all of my machines
2. I can read Python pretty well and it looked well written
3. Its flags are plentiful and documented
4. It works with Google Apps for Domains
5. It works with multiple accounts
6. It respects Gmail's labels
7. It uses IMAP smartly
8. It can run headless and be scheduled with cron
9. It's hosted on SourceForge, just kidding that was weird and scary

After installing BaGoMa on my backup server &mdash; a.k.a. The iMac in our bedroom &mdash; I wrote a little shell script to set the options and run the backup on all of our Gmail accounts:

{% highlight bash %}
#!/bin/sh
echo "Backing up Jerod's email"
/usr/bin/python /Users/santo/src/bagoma.py \
  --file=off \
  --email=jerod.santo@gmail.com \
  --pwd=ohnoididnt \
  --dir=/Users/santo/Documents/Email/Jerod \
  --action=backup

echo "Backing up RSDi's email"
/usr/bin/python /Users/santo/src/bagoma.py \
  --file=off \
  --email=jerod@rsdcompany.com \
  --pwd=againwiththepassword \
  --dir=/Users/santo/Documents/Email/RSDi \
  --action=backup

# other accounts follow...
{% endhighlight %}

The `--file` option disables logging to a file so all output is sent to STDOUT. The rest should be self-explanatory. After running the script manually a few times (the first run takes a LONG time if you have a lot of email), I set up a cron job to back up our email every night at 3AM.

I executed `crontab -e` and added the following line:

{% highlight console %}
0 3 * * * /Users/santo/bin/backup_email >>/var/log/backup_email.log 2>&1
{% endhighlight %}

BaGoMa's output is pretty informative so I send it to log a file in case I ever want to check up on it and make sure the backups are still working.

That's it. The thing has been running like clockwork ever since. If you're similarily concerned about continued access to your email, I highly recommend [BaGoMa][bagoma].

But whatever you do, don't [follow me on Twitter][follow]. That would be absolutely ridiculous.


[bagoma]:http://bagoma.sourceforge.net/
[follow]:http://twitter.com/sant0sk1
