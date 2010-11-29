require 'rubygems'
require 'rake'
require 'date'

namespace :jekyll do
  desc 'Delete generated _site files'
  task :clean do
    system "rm -rf _site"
  end

  desc 'Run the jekyll dev server'
  task :server do
    system "jekyll --server --auto"
  end

  desc 'generates a new post from argument'
  task :new, [:name] do |t,args|
    abort "you need to provide a post name" unless args.name
    File.open("_posts/#{Date.today.to_s}-#{args.name.gsub(' ', '-').downcase}.md", "w") do |f|
      f.puts "---"
      f.puts "layout: post"
      f.puts "published: false"
      f.puts "title: \"#{args.name}\""
      f.puts "excerpt: \"\""
      f.puts "---"
    end
  end
end

namespace :dev do
  desc 'Un-publish old posts to speed up development'
  task :on => ['jekyll:clean'] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: true|published: false|g" {} \;'
    # system 'find . -name "*.yml" -exec sed -i "" "s|published: true|published: false|g" {} \;'
  end

  desc 'Re-publish old posts for deployment'
  task :off => ['jekyll:clean'] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: false|published: true|g" {} \;'
    # system 'find . -name "*.yml" -exec sed -i "" "s|published: false|published: true|g" {} \;'
  end
end
