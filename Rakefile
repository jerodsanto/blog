require 'rubygems'
require 'rake'
require 'date'

desc 'deploy it'
task :deploy do
  system "rsync -arvuz #{File.dirname(__FILE__)}/_site/ mydh:~/my_blog"
end

namespace :jekyll do
  desc 'Delete generated _site files'
  task :clean do
    system "rm -rf _site"
  end

  desc 'Run the jekyll dev server'
  task :server do
    system "jekyll --server --auto"
  end

  desc 'compiles fresh _site from current source'
  task :compile => :clean do
    system "jekyll"
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
  end

  desc 'Re-publish old posts for deployment'
  task :off => ['jekyll:clean'] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: false|published: true|g" {} \;'
  end
end
