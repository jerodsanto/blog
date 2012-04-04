require "rubygems"
require "rake"
require "date"

namespace :deploy do
  desc "deploy changes"
  task :changes do
    system "rsync -arvuz _site/ mydh:~/blog.jerodsanto.net"
  end

  desc "deploys changes and pings services"
  task :post => [:changes, :ping]

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

namespace :jekyll do
  desc "Delete generated _site files"
  task :clean do
    system "rm -rf _site"
  end

  desc "Run the jekyll dev server"
  task :server do
    system "jekyll --server --auto"
  end

  desc "builds _site from current source"
  task :build do
    system "jekyll"
  end

  desc "cleans and builds _site from current source"
  task :compile => [:clean, :build]

  desc "generates a new post from argument"
  task :new, [:name] do |t,args|
    abort "you need to provide a post name" unless args.name
    file = "_posts/#{Date.today.to_s}-#{args.name.gsub(' ', '-').downcase}.md"
    File.open(file, "w") do |f|
      f.puts "---"
      f.puts "layout: post"
      f.puts "published: false"
      f.puts "title: \"#{args.name}\""
      f.puts "excerpt: \"\""
      f.puts "---"
    end
    system "open #{file}"
  end
end

namespace :dev do
  desc "Un-publish old posts to speed up development"
  task :on => ["jekyll:clean"] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: true|published: false|g" {} \;'
    system 'find . -name _config.yml -exec sed -i "" "s|dev: false|dev: true|g" {} \;'
  end

  desc "Re-publish old posts for deployment"
  task :off => ["jekyll:clean"] do
    system 'find . -name "*.md" -exec sed -i "" "s|published: false|published: true|g" {} \;'
    system 'find . -name _config.yml -exec sed -i "" "s|dev: true|dev: false|g" {} \;'
  end
end
