---
layout: post
published: true
title: "See Which Twitterers Don't Follow You Back In Less Than 15 Lines of Ruby"
excerpt: "See Which Twitterers Don't Follow You Back In Less Than 15 Lines of Ruby"
---

The asynchronous nature of Twitter is one of its keys to success. No friend requests. **Awesome.**

A lot of the people I follow on Twitter have no business following me. I didn't get upset when [DHH][1], [_why][2], and [alexalbrecht][3] did not reciprocate interest. Why would they? They don't know me from Adam (even though I'm waayyy cooler than that dude...).

However, sometimes _it is_ interesting to see all the <strike>jerks</strike> people who you follow that do not follow you back. There's probably a web application out there that does this, but who needs a web app when this is a perfectly good excuse to play with Ruby?

The [twitter gem][4] by [John Nunemaker][5] makes this task so easy it's retarded. First, get the gem if you don't already have it:

{% highlight bash %}
jerod@mbp:~$ gem install twitter
{% endhighlight %}

Now. The script:

{% highlight ruby %}
require 'rubygems'
require 'twitter'

auth   = Twitter::HTTPAuth.new('username', 'password')
base   = Twitter::Base.new(auth)
guilty = base.friend_ids - base.follower_ids

puts "#{guilty.size} people you follow don't follow you back"

guilty.each do |user_id|
  user = base.user(user_id)
  puts "#{user.name} follows #{user.friends_count}" +
       " and has #{user.followers_count} followers."
end
{% endhighlight %}


Isn't that simple? Are you with me on the retarded comment now? How it works:

The `friend_ids` and `follower_ids` methods each return an array of ids and we subtract the followers array from the friends array. All that is left over after subtraction are the ids of users in your friends list (people you follow) that are not in your followers list. Then we loop over the new array of "guilty" parties and fetch their user account information based on their user_id, printing the details each time.

Just replace `username` and `password` with your own information and you're off to the races. Run the script from your command line and you should see output similar to this:

<img class="aligncenter size-full wp-image-296" title="no_follows" src="/wp-content/uploads/2009/05/no_follows.png" height="212" alt="no_follows" width="475" />

**NOTE:** Twitter only allows (currently) 100 API requests per hour. Each user account lookup requires an API request, so if your "guilty" array is quite large, you'll probably get an error before the script terminates (Maybe its time to un-follow a few peeps!).

What other cool tricks can we do using the Twitter gem?

[1]: http://twitter.com/dhh
[2]: http://twitter.com/_why
[3]: http://twitter.com/alexalbrecht
[4]: http://github.com/jnunemaker/twitter/tree/master
[5]: http://railstips.org/
