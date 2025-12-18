---
title: Amending Git Commits
date: '2009-08-16'
categories:
- development
draft: false
---

I recently learned that you can fix you're previous commit (modify commit message, add more files, etc.) quite easily with git. An example:

You're in early stages of developing a Rails app and you decide that you want to go back and add some indexes to your tables. No need to create a new migration at this point, just add the indexes to the old migrations and run them again. After making the changes, you create a commit

```console
git commit -a -m "Added missing indexes to tables"
```


Next you re-run all your migrations to get the indexes in there.

```console
rake db:migrate:reset
```

At this point, you check git status and remember that now your schema file has changed. This probably should have been included in the last commit! Piece of cake.

```console
git commit db/schema.rb --amend
```


You'll be prompted to optionally change the commit message.

At this point git status will tell you that your working directory is clean and the changes to your schema were tracked in the same commit as the migration changes.

Butter.
