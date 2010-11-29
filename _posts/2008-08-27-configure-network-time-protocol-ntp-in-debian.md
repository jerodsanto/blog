---
layout: post
published: true
title: "Configure Network Time Protocol (NTP) in Debian"
excerpt: "Here’s how to synchronize your Debian system’s time with network time servers, in a few simple steps"
---

Ok, this bugs the crap out of me. I set up a shiny new Debian 4.0 base install and go on my merry way, meanwhile the system time is off by a long shot! I only notice when it starts to hurt…

Here’s how to synchronize your Debian system’s time with network time servers, in a few simple steps (use sudo as needed):

1) Install the necessary packages:

{% highlight bash %}
apt-get install ntp ntpdate
{% endhighlight %}

2) Stop the NTP daemon for now (apt-get will start the service upon successful installation):

{% highlight bash %}
/etc/init.d/ntp stop
{% endhighlight %}

3) Manually synchronize the system clock to the NTP server pool:

{% highlight bash %}
ntpdate pool.ntp.org
{% endhighlight %}

3.5) An explanation: the NTP server daemon will fail to sync with the NTP servers if the system time is too far from the NTP servers time so its best to manually synchronize once to get your system time close enough.

4) Restart the NTP daemon:

{% highlight bash %}
/etc/init.d/ntp start
{% endhighlight %}

5) (Optionally) Verify that the NTP daemon is synchronized by checking the syslog:

{% highlight bash %}
grep ntpd /var/log/syslog | tail
ntpd[6348]: synchronized to 74.53.198.146, stratum 2
ntpd[6348]: kernel time sync enabled 0001
ntpd[6348]: synchronized to 128.10.19.24, stratum 1
{% endhighlight %}

Your output may vary, but it should look similar to mine.

That’s all for now!
