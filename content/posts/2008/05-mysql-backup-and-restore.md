---
title: MySQL backup and restore
date: '2008-05-19'
categories:
- sysadmin
draft: false
---

## Create the backup

```bash
mysqldump --add-drop-table -h [host] -u [user] \
-p [databasename] > [backupfile].sql
```

**Optionally**

Specify a table -

```bash
 ...[databasename] (tablename tablename tablename) ...
```

Add compression -

```bash
 ...[databasename] | bzip2 -c > backupfile.sql.bz2
```

## Restore from backup

Create database if it doesn't already exist (from inside mysql client)

```bash
mysql> create database [databasename]
```

Run the restore

```bash
mysql -h [host] -u [user] -p [databasename] < [backupfile].sql
```

**Optionally**

Uncompress before restoring -

```bash
bzip2 -d backupfile.sql.bz2
```
