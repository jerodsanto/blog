---
layout: post
published: true
title: "Let Capistrano Compile Ruby 1.9 For You"
excerpt: "A Capistrano task to install Ruby 1.9.1 to `/opt/ruby-1.9.1` on Debian"
---

A Capistrano task to install Ruby 1.9.1 to `/opt/ruby-1.9.1` on Debian:

{% highlight ruby %}
APTGET = "apt-get install -qqy"
RUBY19 = "ruby-1.9.1-p129"
SRC    = "/usr/local/src"
WGET   = "wget -q"

namespace :ruby do

  desc 'download and compile Ruby 1.9'
  task :install_19 do
    deps    = %w'zlib1g-dev libopenssl-ruby1.9'
    version = RUBY19.gsub(/-p\d+$/,"") # remove patch level
    run "#{APTGET} #{deps.join(' ')}"
    cmd = [
      "cd #{SRC}",
      "#{WGET} ftp://ftp.ruby-lang.org/pub/ruby/1.9/#{RUBY19}.tar.gz",
      "tar zxvf #{RUBY19}.tar.gz",
      "cd #{RUBY19}",
      "./configure --prefix=/opt/#{version} --enable-shared",
      "make",
      "make install"
      ].join(" && ")
      run cmd
  end

end
{% endhighlight %}

With this task, you can quickly upgrade all your Debian machines to Ruby 1.9.1 without having to go through the process each time. Just:

{% highlight console %}
cap ruby:install_19
{% endhighlight %}
