require "jekyll/post"

module RelatedPosts
  # Used to remove #related_posts so that it can be overridden
  def self.included(klass)
    klass.class_eval do
      remove_method :related_posts
    end
  end

  # previous posts in same category
  def related_posts(posts)
    related = []
    return related unless posts.size > 1

    posts.each do |post|
      if post.categories == self.categories && post != self && post.date < self.date
        related << post
      end
    end

    related
  end
end

module Jekyll
  class Post
    include RelatedPosts
  end
end
