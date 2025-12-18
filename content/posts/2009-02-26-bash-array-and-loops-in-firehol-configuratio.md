---
title: Bash array and loops in FireHOL configuration
date: '2009-02-26'
categories:
- sysadmin
draft: false
---

IPTables is a powerful but cryptic firewall solution. [FireHOL][1] is an IPTables configurator that flat out rocks. One of FireHOL's strengths is that it uses standard [BASH][2] syntax inside its configuration file, so you get all the power of BASH to configure your firewall.

Let's see how a BASH array and for loop can help clean up our FireHOL config:

You have 3 machines that need SSH access to the server. First, you can setup variable names to reference the IP addresses (or DNS names) of the machines. Put these declarations at the top of your FireHOL config for easy maintenance.

```bash
srv1="205.205.205.1"
srv2="srv2.example.com"
srv3="143.32.2.44"
```

Now lets see what the SSH allow declaration will look like using these variables on interface eth0:

```bash
interface eth0 public
  policy reject
  server ssh accept src $srv1
  server ssh accept src $srv2
  server ssh accept src $srv3
```

Notice how each host you want to allow SSH access adds another line to your configuration. This may seem trivial in my example but can add a lot of complexity as your environment grows. Is there a better way to implement? You bet.

First, lets create an array to house all of the hosts we want to provide SSH access to:

```bash
ssh_list=($srv1 $srv2 $srv3)
```

Next, we change the declaration on our interface to simply loop through this list of hosts and allow SSH access:

```bash
interface eth0 public
  policy reject
  for host in ${ssh_list[@]}; do
    server ssh accept $host
  done
```

Much better! Now we can simply add/remove hosts from our `ssh_list` array (at the top of the config file where all our variables are declared) and let BASH do the rest. The key here is the `${ssh_list[@]}` which returns the evaluated list of hosts inside the `ssh_list` array. Enjoy.


[1]: http://firehol.sourceforge.net/
[2]: http://www.gnu.org/software/bash/bash.html
