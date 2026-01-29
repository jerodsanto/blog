---
title: 'Capybara and Poltergeist: Snap!'
date: '2012-12-11'
categories:
- development
draft: false
---

I've gotten a lot of mileage out of [RSpec][rspec] plus [Capybara][capybara] for integration testing my Ruby apps lately.

<a href="http://www.flickr.com/photos/gseloff/4661719163/" title="unNative Texan by gseloff, on Flickr"><img src="http://farm5.staticflickr.com/4036/4661719163_8668525d0f.jpg" width="500" height="393" alt="obligatory Capybara pic"></a>

Executing JavaScript with Capybara used to be a pain, but I recently switched from [capybara-webkit][capybara-webkit] to [Poltergeist][poltergeist] as my JS test driver.

Poltergeist uses [PhantomJS][phantomjs], which in my experience is faster than capybara-webkit and easier to install.[^1]

![Sadly, Sam Raimi will be subjecting Poltergeist to the ole' Hollywood remake][poltergeist-pic]

Poltergeist supports the required Capybara driver API as well as a few additional features such as taking screenshots.

I wrote a little helper method around taking screenshots, which:

1. generates a name for the output file (because I usually don't care)
2. puts the file in the trash for me (or in /tmp if there is no trash)
3. renders the entire page (overridable when I just want the viewport)
4. opens it in Preview (or whatever the default app for .png is)

Not ground breaking, but pretty cool in practice. I call it `snap!`.[^3] Here's the method:

```ruby
def snap!(options={})
  path = options.fetch :path, "~/.Trash"
  file = options.fetch :file, "#{Time.now.to_i}.png"
  full = options.fetch :full, true

  path = File.expand_path path
  path = "/tmp" if !File.exists?(path)

  uri = File.join path, file

  page.driver.render uri, full: full
  system "open #{uri}"
end
```

Drop it anywhere that RSpec will load it[^2] and use it in your integration tests when your JavaScript is misbehaving:

```ruby
feature "search autocomplete" do
  scenario "from the homepage", js: true do
    visit "/"
    fill_in "search", with: "Jero"
    snap!
    expect(page).to have_content "Jerod Santo"
  end
end
```

In this example, you could visually inspect whether the autocomplete is just not showing up at all or if it *is* showing up and just has the wrong content in it.

A fringe benefit of using the `snap!` method is that it calls `page.driver.render`, which will raise an error when the active driver doesn't have the method.

Capybara's default driver, RackTest, doesn't have it so you'll know right away if your test is just failing because you forgot the `js: true` flag in the enclosing block.

That one has bit me more than once!

[^1]: PhantomJS bundles Qt so you don't have to install it yourself

[^2]: when using rspec-rails you can just drop it in `spec/support`

[^3]: I'm using the `!` bang suffix for no other reason then it makes the method more fun to call

[rspec]: https://rspec.info
[capybara]: https://jnicklas.github.com/capybara/
[capybara-webkit]: https://github.com/thoughtbot/capybara-webkit
[poltergeist]: https://github.com/jonleighton/poltergeist
[poltergeist-pic]: https://jerodsanto.net/drop/poltergeist.png
[phantomjs]: https://phantomjs.org/