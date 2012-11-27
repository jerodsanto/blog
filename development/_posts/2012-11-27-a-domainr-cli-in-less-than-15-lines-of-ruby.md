---
layout: post
published: true
title: "A Domainr CLI in Less Than 15 Lines of Ruby"
excerpt: "The arbitrary less-than-15-lines constraint is back, baby! This time, a Domainr CLI"
---

In 2009 I wrote a brief [series][twitter-follow] [of][twitter-expand] [posts][arbitrary-files] where I'd implement something in less than 15 lines of Ruby.

Yesterday I took [Dom][dom], a Python-based tool for accessing the [Domainr][domainr] API, and rewrote it as a tiny Ruby script[^1]. The script turned out to be so small that I thought I could squeeze it down to less than 15 lines. I was right[^2]!

Here it is, complete with colored output!

{% highlight ruby %}
# encoding: utf-8
%w(json open-uri).each { |lib| require lib }
abort "Usage: #{File.basename __FILE__} [query]" unless ARGV.first

response = open("http://domai.nr/api/json/search?q=#{ARGV.first}").read

JSON.parse(response)["results"].each do |domain|
  symbol = if domain["availability"] == "available"
    "\e[32m✓\e[0m" # 32 = green
  else
    "\e[31m✗\e[0m" # 31 = red
  end
  puts "#{symbol} #{domain['domain']}"
end
{% endhighlight %}

Drop that baby in your `PATH` and `chmod +x` it for all of your domain name reconnaissance needs.

![][dom-example]

The last time around I dropped the series because I ran out of ideas. I probably won't pick it back up again for real unless I have a good list of things to implement. Let me know if you have any ideas :)

[^1]: Dom is really cool, but Apple keeps breaking my Python install on OS upgrades. Also, one less dependency is one less dependency.

[^2]: I had to reduce whitespace to an uncomfortable level to hit the 14 line threshold, but that includes the encoding comment, which is necessary to use the ✓ and ✗ symbols in the output.

[twitter-follow]:/2009/05/see-which-twitterers-dont-follow-youback-in-less-than-15-lines-of-ruby/
[twitter-expand]:/2009/05/expand-your-twitter-network-in-less-than-15-lines-of-ruby/
[arbitrary-files]:/2009/05/create-arbitrarily-sized-files-in-less-than-15-lines-of-ruby/
[dom]:https://github.com/zachwill/dom
[domainr]:http://domai.nr
[dom-example]:http://jerodsanto.net/drop/dom-example.png
