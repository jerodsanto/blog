---
title: Sniff Your iPhone's Network Traffic
date: '2009-06-13'
categories:
- hack
draft: false
---

Ever wanted (or needed) to see your iPhone's network traffic? All you need is a wireless LAN and the cross-platform proxy application, [Paros.][1] There are other proxy server's that can be used, but Paros was built for web application security assessments, so it provides an intimate hook into the HTTP request/response flow. Let's get started!

## 1) Download and Install Paros

Grab the download from SourceForge ([direct link][2]).

## 2) Configure Paros

Once installed, launch Paros and find the configuration options (on OS X they are under Tools -> Options). Paros is configured by default to listen on localhost only, but we are going to route our iPhone's traffic through Paros, so we need to set it to listen on the IP address of the interface connected to the same LAN as the iPhone.

My LAN's network is 1.1.1.0/16, so I'll configure the Local Proxy address accordingly:

<img src="/wp-content/uploads/2009/06/paros_config.png" height="246" alt="paros_config" width="540" />

That should be the only setting that we need to fuss with. Paros is all set and listening on port 8080, let's configure the iPhone to route its traffic through our proxy!

## 3) Configure iPhone

On the iPhone, open the "**Settings**" app and navigate to the Wi-Fi page. Once there, edit the settings for the wireless network you are currently connected to (this needs to be the same network where your proxy is running). To do this, click the little blue arrow on the right side of the screen.

<img src="/wp-content/uploads/2009/06/config_wifi.png" height="480" alt="config_wifi" width="322" />

Now, scroll all the way to the bottom of the settings page and change the **"HTTP Proxy"** setting to manual. Enter the IP address and port number of your Paros Proxy.

<img src="/wp-content/uploads/2009/06/config_proxy.png" height="480" alt="config_proxy" width="320" />

All set! Now all web traffic to and from the iPhone is routed through Paros. Let's go see what we can see.

## 4) Using Paros

The main section of Paros is the "**Request/Response/Trap**." As the iPhone talks through Paros to Internet sites, it will display the iPhone's request and the server's response. The "**trap**" functionality allows you to stop either the request or the response and view/modify it before sending it along to the recipient. Trapping is very cool, and why Paros is used for security auditing, but for our purposes we just want to see what is going on, so I won't explain it any further.

For now, let's see what happens when we fire up my iPhone's "**App Store**" app:

In the bottom section of the screen is the history viewer. There we can see that my iPhone made 4 requests to different servers ( 3 GETs and 1 POST):

<img src="/wp-content/uploads/2009/06/history.png" height="67" alt="history" width="540" />

Highlighting the first GET in the history list shows its details. The iPhone's HTTP request header looked like this:

<img src="/wp-content/uploads/2009/06/request.png" height="337" alt="request" width="540" />

One noteworthy tidbit is that the iPhone is sending a custom header (X-Apple-Connection-Type) which tells the server that it is connected to WiFi. Next, let's take a look at the server's response:

<img src="/wp-content/uploads/2009/06/response.png" height="408" alt="response" width="540" />

Notice that in the response we see both the headers that the server returned AND the response data itself, in this case an xml plist file.

Sniffing traffic like this can help you understand how different iPhone apps work behind the scenes or it can help debug interaction for an app that you're writing. Hope this helps you get started!


[1]: http://www.parosproxy.org/index.shtml
[2]: https://sourceforge.net/projects/paros/files/latest/download
