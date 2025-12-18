---
title: Be Careful When You Create a Unified SSL Certificate for Nginx
date: '2013-04-08'
categories:
- sysadmin
draft: false
---

If one of the files doesn't have a newline at the end and you create the unified certificate (as instructed for [StartSSL][startssl-instructions] certs) like so:

```console
cat ssl.crt sub.class1.server.ca.pem ca.pem > /etc/nginx/conf/ssl-unified.crt
```

Then you will end up with an error that looks like this:

> SSL_CTX_use_certificate_chain_file failed (SSL: error:0906D066:PEM routines:PEM_read_bio:bad end line error:140DC009:SSL routines:SSL_CTX_use_certificate_chain_file:PEM lib)

Check out your `ssl-unified.crt` and you'll see that there is no newline between one or more of the certificates, like this:

```console
-----END CERTIFICATE----------BEGIN CERTIFICATE-----
```

Add it yourself and everything should be peachy:

```console
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
```


[startssl-instructions]:http://www.startssl.com/?app=42
