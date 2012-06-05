require "rubygems"
require "rake"
require "date"

class String
  # This is a Title => this-is-a-title
  def to_post_slug
    self.gsub(' ', '-').downcase
  end
end

namespace :deploy do
  desc "deploy changes"
  task :changes do
    system "rsync -arvuz _site/ mydh:~/blog.jerodsanto.net"
  end

  desc "deploys changes and pings services"
  task post: [:changes, :ping]

  desc "pings services to let them know of new content"
  task :ping do
    require "net/http"
    uri    = "http://blog.jerodsanto.net"
    params = "/ping/?title=&blogurl=#{URI.escape(uri)}&rssurl=&chk_weblogscom=on&chk_blogs=on&chk_technorati=on&chk_feedburner=on&chk_syndic8=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_blogstreet=on&chk_moreover=on&chk_weblogalot=on&chk_icerocket=on&chk_newsisfree=on&chk_topicexchange=on"
    puts "pinging pingomatic"
    Net::HTTP.get("pingomatic.com", params)
    puts "pinging google"
    Net::HTTP.get("www.google.com" , "/ping?sitemap=" + URI.escape(uri+"/sitemap.xml"))
    puts "pinging feedburner"
    Net::HTTP.get("feedburner.google.com", "/fb/a/pingSubmit?bloglink=#{URI.escape(uri)}")
  end
end

namespace :server do
  desc "Run the jekyll server for all posts"
  task :all do
    Rake::Task["clean_build"].invoke
    system "jekyll --server --auto"
  end

  desc "Run the jekyll server for most recent post"
  task :one do
    Rake::Task["clean_build"].invoke
    system "jekyll --server --auto --limit_posts 1"
  end
end

desc "Delete generated _site files"
task :clean do
  system "rm -rf _site"
end

desc "builds _site from current source"
task :build do
  system "jekyll"
end

desc "cleans and builds _site from current source"
task clean_build: [:clean, :build]

desc "generates a new draft post from argument"
task :draft, [:name] do |t,args|
  abort "you need to provide a post name" unless args.name
  file = "_drafts/#{args.name.to_post_slug}.md"
  File.open(file, "w") do |f|
    f.puts "---"
    f.puts "layout: post"
    f.puts "published: true"
    f.puts "title: \"#{args.name}\""
    f.puts "excerpt: \"\""
    f.puts "---"
  end
  system "open #{file}"
end

desc "Moves drafted post into _posts for editing"
task :edit, [:name] do |t,args|
  abort "you need to provide a post name" unless args.name
  post = "#{args.name.to_post_slug}.md"
  draft = File.expand_path "_drafts/#{post}"
  abort "no draft matches that name" unless File.exist?(draft)
  puts "Linking #{post} for editing."
  FileUtils.mv draft, "_posts/#{Date.today.to_s}-#{post}"
  Rake::Task["server:one"].invoke
end

namespace :dev do
  desc "Un-publish old posts to speed up development"
  task on: ["clean"] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: true|published: false|g" {} \;'
    system 'find . -name _config.yml -exec sed -i "" "s|dev: false|dev: true|g" {} \;'
  end

  desc "Re-publish old posts for deployment"
  task off: ["clean"] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: false|published: true|g" {} \;'
    system 'find . -name _config.yml -exec sed -i "" "s|dev: true|dev: false|g" {} \;'
  end
end
