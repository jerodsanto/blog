---
layout: post
published: true
title: "fix your Debian VMware image's network after offline copy"
excerpt: "If you copy and move a VMware virtual machine that runs Debian, you’ll find that the network adapter is no longer available, which sucks."
---

If you copy and move a VMware virtual machine that runs Debian, you’ll find that the network adapter is no longer available, which sucks.

I implemented a simple fix using Ruby. Just make it start at boot by adding it to your `/etc/rc.local` and it should be all good.

**NOTICE:** automatically reboots machine

{% highlight ruby %}
# 2>&1 redirects stderr to stdout so we can capture it
if_status = `ifconfig eth0 2>&1`
config_file = "/etc/udev/rules.d/z25_persistent-net.rules"

if if_status =~ /Device not found/
  config_text = Array.new
  File.open(config_file,"r") { |file| config_text = file.readlines }
  relevant_text = config_text.select { |line| line =~ /^SUBSYSTEM==/ }
  output = relevant_text.last.gsub(/ethd/,"eth0")
  File.open(config_file,"w"){ |file| file.puts output }
  system("reboot")
end
{% endhighlight %}

[Download][1] and use it if you’d like.


[1]: http://jerodsanto.net/src/ruby/vm_mac_fixer.rb
