---
title: Ad Hoc Rails Console Logging
date: '2009-07-18'
categories:
- development
draft: false
---

I recently found a couple of cool [old][1] [tricks][2] for logging Rails activity directly to the console, but these solutions are pretty static once you're inside a console session. In my experience, sometimes logging to the console is cool and most of the time it isn't.

If you want to be able to toggle your development log between the default Rails logger and the console, just add this method to your `~/.irbrc`:

```ruby
def rails_log_to_console(toggle)
  ActiveRecord::Base.logger = toggle == true ? Logger.new(STDOUT) : RAILS_DEFAULT_LOGGER
  reload!
end
```

Now, you can start logging to the console at any time by doing:

```console
>> rails_log_to_console true
Reloading...
=> true
```

And turn it back off as simply as:

```console
>> rails_log_to_console false
Reloading...
=> true
```

Really, passing any argument _except_ true to the method will switch the logging back to the default.

Are there any better ways to achieve this (like without having to call `reload!`)? If you know of one, holler back in the comments.

[1]: "http://toolmantim.com/articles/logging_rails_activity_in_script_console"
[2]: "http://toolmantim.com/articles/system_wide_script_console_logging"
