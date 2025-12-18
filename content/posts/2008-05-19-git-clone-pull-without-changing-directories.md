---
title: git clone & pull without changing directories
date: '2008-05-19'
categories:
- development
draft: false
---

If you’re trying to configure git commands in a directory that isn’t `pwd`, you’ll have to deal with `clone` and `pull` a little differently. Clone works like this:

```bash
git clone [source location] [destination location]
```

An example clone into my application's vendor directory:

```bash
clone git://github.com/rails/rails.git ~/rails/myapp/vendor/rails
```

Pull works like this:

```bash
git-dir=/path/to/destination/.git pull
```

An example pull in the already initiated local rails repository:

```bash
git-dir=~/rails/myapp/vendor/rails/.git pull
```

Using these approaches, you can simplify your [capistrano][1] recipes. here is an example snippet:

```ruby
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
```

See `man git-clone` and `man git-pull` for more details.


[1]: http://capify.org/
