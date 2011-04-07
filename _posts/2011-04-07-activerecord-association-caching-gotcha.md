---
layout: post
published: true
title: "ActiveRecord Association Caching Gotcha"
excerpt: "Updating a related object in an ActiveRecord callback can be tricky due to association caching. It tripped me up for too long and Google was not helpful. Hopefully this post will at least solve the unhelpful Googling problem."
---

Here's a quick bit of info that will hopefully save somebody some time. ActiveRecord's association methods are built around caching. This caching is disabled by default in **development** mode, but enabled in **test** and **production** modes. If you're doing any kind of association updating in an ActiveRecord callback you may run into this caching and slam your head against your desk a few times.

Say we have a `Pledge` class that belongs to a `Person` class. People also have `Job`s and we want to (re)set their `job_id` when a `Pledge` is saved. Enter a virtual attribute and a callback:

{% highlight ruby %}
class Person < ActiveRecord::Base
  has_many :pledges
  belongs_to :job
end

class Pledge < ActiveRecord::Base
  belongs_to :person
  attr_writer :job_id

  after_save do
    person.update_attribute(:job_id, @job_id) if @job_id.present?
  end
end
{% endhighlight %}

This looks pretty straight forward. However, this simple test case will fail:

{% highlight ruby %}
should "assign virtual job_id attribute to its person after save" do
  @pledge.job_id = 4
  @pledge.save
  assert_equal 4, @pledge.person.job_id
end
{% endhighlight %}

The associated person's `job_id` attribute never gets updated. After some experimentation, I realized that this code runs as expected in development mode. So, what gives? Caching gives, as I explained above.

Let's fix this up to work regardless of ActiveRecord caching by forcing a trip to the database:

{% highlight ruby %}
after_save do
  person(true).update_attribute(:job_id, @job_id) if @job_id.present?
end
{% endhighlight %}

Ahh, that's better. Read more on controlling ActiveRecord caching [here][caching].

[caching]:http://guides.rubyonrails.org/association_basics.html#controlling-caching

