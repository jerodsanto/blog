---
layout: post
published: true
title: "Expand Your Twitter Network In Less Than 15 Lines of Ruby"
excerpt: "Let's use Ruby to generate a list of people highly followed by our friends."
---

A great way to meet new people on Twitter is by checking out the people your friends are interacting with. We can assume that if many of your friends follow somebody, that person has a high likelihood of being interesting to you (or it is [Ashton Kutcher][1]). Let's use Ruby to generate a list of people highly followed by our friends.

### The Flow

1. fetch the ids of all the people you follow
2. use those ids to fetch the ids of all the people they follow
3. remove any ids in both groups (sound familiar?)
4. tally the occurrences of each unique id in the list
5. sort them by most occurrences
6. iterate the top 10 and print the user information

### The Script

{% highlight ruby %}
require 'rubygems'
require 'twitter'

base        = Twitter::Base.new(Twitter::HTTPAuth.new('username', 'password'))
my_friends  = base.friend_ids
candidates  = my_friends.inject(Array.new) { |array,id| array += Twitter.friend_ids(id); array }
candidates -= my_friends
tallied     = candidates.inject(Hash.new(0)) { |hash, can| hash[can] += 1; hash }
ordered     = tallied.sort { |x,y| y[1] <=> x[1] }

ordered[0..9].each do |array|
  user = base.user(array[0])
  puts "#{user.screen_name} is followed by #{array[1]} of people you follow."
end
{% endhighlight %}

### Some Explanation

The only "tricky" thing I'm doing is making good use of Ruby's [Enumerable#inject][2] method. Twice. This method iterates an enumerable object similar to how `each` does except it takes an argument and passes it through the block with the object it is iterating. The variable passed can be modified and is returned by the method. For a good write-up on `inject`, [see this blog post by The Budding Rubyist.][3]

### A Limitation

Unfortunately, this script is hindered by Twitter's 100 API calls per hour. If you follow more than 100 people on Twitter you're going to need a workaround. I'll leave these as an exercise for whoever is interested, but a few ideas are:

1. sleep the script between API hits
2. toggle between multiple accounts for requests
3. [request whitelisting][4] from Twitter

### A Challenge

Can you can make this script smaller, more readable, or more robust? I put it on [GitHub][5] so you can [fork my gist][6] and put a link to your version in the comments!


[1]: http://twitter.com/aplusk
[2]: http://www.ruby-doc.org/core/classes/Enumerable.html#M003171
[3]: http://buddingrubyist.com/2008/02/05/why-i-like-to-inject/
[4]: http://twitter.com/help/request_whitelisting
[5]: http://github.com
[6]: http://gist.github.com/113270
