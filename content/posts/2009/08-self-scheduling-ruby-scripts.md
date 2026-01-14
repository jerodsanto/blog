---
title: Self-Scheduling Ruby Scripts
date: '2009-08-20'
categories:
- development
draft: false
---

[Whenever][1] is an awesome library that:

> "provides a clean ruby syntax for defining messy cron jobs and running them Whenever.

`Whenever` has become very popular for use with Rails apps and there are plenty of tutorials on how to use it. This [RailsCast][2] is a good place to get started if you're interested in that.

However, I haven't seen too many people writing about using the library outside of Rails (or other web frameworks).

I have a lot of Ruby scripts running on different servers all scheduled via cron and it's quite easy to forget what script is scheduled when and how often. I decided to try using `Whenever` to create the cron jobs instead of creating them manually. First, I set out to just slap arbitrary Ruby code inside of an `every` block. You know, something like this:

```ruby
every :hour do
  puts "this is just some ruby that will execute every hour"
end
```

Unfortunately, it doesn't work like that. If it did, that would own because then we could simply wrap all our scripts inside an `every` block and call it a day. Instead the library lets you define a few different kinds of tasks inside an `every` block.

1. rake tasks
2. external commands
3. runner scripts (Rails)

So, we can use the `command` method to execute our pre-existing scripts like so:

```ruby
every 1.day, :at => '4:30 am' do
  command "/scripts/daily_backup.rb"
end
```

So that's cool, but now we have to create a separate file that houses our schedule definitions and manage it as well as the scripts we want to run. What would be really cool, I thought, would be to include the schedule definitions at the top of each script. The big win in this case is easily accessible & portable schedule documentation.

One way of accomplishing this is to prepend all your Ruby scripts with a snippet similar to this:

```ruby
# filename: /scripts/weekly_backup.rb
every :sunday, :at => '12pm' do
    command "/scripts/weekly_backup.rb"
end if defined?(Whenever)

return unless __FILE__ == $PROGRAM_NAME

puts "this is the start of my backup script"
```

When this script is executed using the `whenever` command (which you use to actually generate and install the cron jobs), the first `every` block will be used and everything after the `return` line will be ignored. When this script is executed directly, the `every` block will be ignored and everything after the `return` line will be executed.

Writing the crontab with this script will look like this:

```console
whenever -w -f /scripts/weekly_backup.rb
```

Which will install a cron job that looks like this:

```console
0 12 * * 0 /scripts/weekly_backup.rb
```

The major drawback to this method is we have to hard code the full path to the script instead of using the `__FILE__` variable, which hurts portability. This is because `Whenever` `evals` the content of the file read in and in this case `__FILE__` is useless. There is access to the calling file path via `Whenever::CommandLine.default_identifier` but this is currently a protected method.

This is just my first attempt at embedding scheduling information inside the script being scheduled, so there are probably easier/better ways of getting this done. Know any?

[1]: "http://github.com/javan/whenever/"
[2]: "http://railscasts.com/episodes/164-cron-in-ruby"
