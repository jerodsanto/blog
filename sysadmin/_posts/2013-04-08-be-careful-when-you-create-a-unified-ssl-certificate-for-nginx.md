---
layout: post
published: true
title: "Be Careful When You Create a Unified SSL Certificate for Nginx"
excerpt: "If one of the files doesn't have a newline at the end then you will run into an error."
---

If one of the files doesn't have a newline at the end and you create the unified certificate (as instructed for [StartSSL][startssl-instructions] certs) like so:

{% highlight console %}
cat ssl.crt sub.class1.server.ca.pem ca.pem > /etc/nginx/conf/ssl-unified.crt
{% endhighlight %}

Then you will end up with an error that looks like this:

> SSL_CTX_use_certificate_chain_file failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line error:140DC009:SSL routines:SSL_CTX_use_certificate_chain_file:PEM lib)

Check out your `ssl-unified.crt` and you'll see that there is no newline between one or more of the certificates, like this:

{% highlight console %}
-----END CERTIFICATE----------BEGIN CERTIFICATE-----
{% endhighlight %}

Add it yourself and everything should be peachy:

{% highlight console %}
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
{% endhighlight %}


[startssl-instructions]:http://www.startssl.com/?app=42
