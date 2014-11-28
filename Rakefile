require "rubygems"
require "rake"
require "date"

JEKYLL = "bundle exec jekyll"

class String
  # This is a Title => this-is-a-title
  def to_post_slug
    self.gsub(' ', '-').downcase
  end
end

namespace :deploy do
  desc "deploy changes"
  task :changes do
    system "rsync -arvuz _site/ mydh:~/jerodsanto.net"
  end

  desc "deploys changes and pings services"
  task post: [:changes, :ping]

  desc "pings services to let them know of new content"
  task :ping do
    require "net/http"
    uri    = "http://jerodsanto.net"
    params = "/ping/?title=&blogurl=#{URI.escape(uri)}&rssurl=&chk_weblogscom=on&chk_blogs=on&chk_technorati=on&chk_syndic8=on&chk_newsgator=on&chk_myyahoo=on&chk_pubsubcom=on&chk_blogdigger=on&chk_blogstreet=on&chk_moreover=on&chk_weblogalot=on&chk_icerocket=on&chk_newsisfree=on&chk_topicexchange=on"
    puts "pinging pingomatic"
    Net::HTTP.get("pingomatic.com", params)
    puts "pinging google"
    Net::HTTP.get("www.google.com" , "/ping?sitemap=" + URI.escape(uri+"/sitemap.xml"))
  end
end

namespace :serve do
  desc "Run the jekyll server for all posts"
  task :all do
    system "#{JEKYLL} serve --watch"
  end

  desc "Run the jekyll server for most recent post"
  task :one do
    system "#{JEKYLL} serve --watch --limit_posts 1"
  end
end

desc "Delete generated _site files"
task :clean do
  system "rm -rf _site"
end

desc "builds _site from current source"
task :build do
  system "#{JEKYLL} build"
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
