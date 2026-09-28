---
title: Holding my YubiKey right, like an adult
stab: Turns out, posting `cccccdcdgvabcttbifbktebucugkvndfrbekidlhfruh` into a Slack chat full of Adults you respect is kinda embarrassing...
slug:
date: 2026-09-28T14:25:14.264Z
image: yubi-an-adult.jpg
draft: false
---
As I mentioned [previously](https://jerodsanto.net/2026/09/joining-socket/#why-a-jobby-job), being indie for most of my career means I missed out[^1] on all kinds of *Very Adult* things like "Eng All-Hands" meetings, scheduling PTO, and **wielding a YubiKey** without accidentally brushing it with my finger and spraying OTPs into random Slack channels.

Turns out, posting `cccccdcdgvabcttbifbktebucugkvndfrbekidlhfruh` into a Slack chat full of *Adults* you respect[^2] is kinda embarrassing! Even when you're quick to "Delete message..."

What's a dev to do? On macOS:

```bash
brew install ykman && ykman otp swap
```

That command "moves OTP to slot 2." I have no idea what slot 2 is, but I do know it makes the thing only spit out an OTP after I hold my finger on it for a few seconds.

So, I'm now holding my YubiKey right, like an adult. Next up: my first performance review! 😬

[^1]: Some might use the word "avoided" here, but I'm enjoying this strange new world, so I'm sticking with "missed out", at least for now.

[^2]: All of which, I'm sure, already know how to hold their YubiKey correctly.
