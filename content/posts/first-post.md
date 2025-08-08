+++ 
draft = false
date = 2025-08-05T12:08:14Z
title = "Setup Replit for my new blog"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

So I read this link to help me setup Replit to use Hugo.

[Build and host your company blog on Replit with Nix and Hugo - DEV Community](https://dev.to/ritza/build-and-host-your-company-blog-on-replit-with-nix-and-hugo-k1c)

```
Open `replit.nix` and append `pkgs.hugo`to the `deps` list

In the shell, run:
hugo new site --force .
cd themes && git clone https://github.com/panr/hugo-coder && cd ..

Add the following line to the bottom of `config.toml`:
theme = 'hugo-coder'

Add:
run = "hugo server --buildDrafts --buildFuture --bind 0.0.0.0 --port 443 --baseURL https://YOUR-REPL-NAME-HERE.YOUR-USERNAME-HERE.repl.co"

In the shell, run this to create new posts:
hugo new posts/first-post.md
```