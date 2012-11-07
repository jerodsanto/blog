---
layout: post
published: true
title: "Capify - public key deployment"
excerpt: "I’ve been playing with Capistrano a lot lately and loving it. Here is an example of how easy it is to write tasks and use them on multiple remote servers."
---

I’ve been playing with [Capistrano][1] a lot lately and loving it. Here is an example of how easy it is to write tasks and use them on multiple remote servers.

This task installs your SSH public key on the remote machine to allow key-based authentication:

{% highlight ruby %}
set :key_file do
  Capistrano::CLI.ui.ask "enter public key to push: "
end

desc "configures key-based SSH administration"
task :push_key, :roles  => :all do
  key_location = File.expand_path(key_file)
  unless File.exist?(key_location) and key_file.match(/\.pub$/)
    puts "Couldn't locate public key. Try again"
    exit
  end
  key_file_name = File.basename(key_location)
  upload key_location, "/tmp/#{key_file_name}"
  run "if [ ! -e ~/.ssh ];then mkdir ~/.ssh; fi"
  run "cat /tmp/#{key_file_name} >> ~/.ssh/authorized_keys"
  run "rm /tmp/#{key_file_name}"
  run "chmod 600 ~/.ssh/authorized_keys"
end
{% endhighlight %}

Silky smooth.

[1]: http://capify.org/
