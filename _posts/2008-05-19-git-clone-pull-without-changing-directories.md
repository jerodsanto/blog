---
layout: post
published: true
title: "git clone & pull without changing directories"
excerpt: "If you’re trying to configure git commands in a directory that isn’t `pwd`, you’ll have to deal with `clone` and `pull` a little differently."
---

If you’re trying to configure git commands in a directory that isn’t `pwd`, you’ll have to deal with `clone` and `pull` a little differently. Clone works like this:

{% highlight bash %}
git clone [source location] [destination location]
{% endhighlight %}

An example clone into my application's vendor directory:

{% highlight bash %}
clone git://github.com/rails/rails.git ~/rails/myapp/vendor/rails
{% endhighlight %}

Pull works like this:

{% highlight bash %}
git-dir=/path/to/destination/.git pull
{% endhighlight %}

An example pull in the already initiated local rails repository:

{% highlight bash %}
git-dir=~/rails/myapp/vendor/rails/.git pull
{% endhighlight %}

Using these approaches, you can simplify your [capistrano][1] recipes. here is an example snippet:

{% highlight ruby %}
set :rails_source, "git://github.com/rails/rails.git"

desc "git the latest rails"
task :git_rails do
  run "mkdir -p #{shared_path}/vendor"
  result = run_and_return "ls #{shared_path}/vendor"
  if result.match(/rails/)
    run "git --git-dir=#{shared_path}/vendor/rails/.git pull"
  else
    run "git clone #{rails_source} #{shared_path}/vendor/rails"
  end
end
{% endhighlight %}

See `man git-clone` and `man git-pull` for more details.


[1]: http://capify.org/
