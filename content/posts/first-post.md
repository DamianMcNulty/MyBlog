+++ 
draft = false
date = 2025-08-05T12:08:14Z
title = "Setup Replit for new blog"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++


---
title: "Blog setup"
date: 2025-08-06T23:28:46.606Z
draft: false
tags: []
---

So I read this link to help me setup Replit to use Hugo.

[Build and host your company blog on Replit with Nix and Hugo - DEV Community](https://dev.to/ritza/build-and-host-your-company-blog-on-replit-with-nix-and-hugo-k1c)

Open `replit.nix` and append `pkgs.hugo`to the `deps` list:

```
pkgs.hugo
```

```
hugo new site --force .
```

```
cd themes && git clone https://github.com/panr/hugo-coder && cd ..
```

Add the following line to the bottom ofÂ `config.toml`:
```
theme = 'hugo-coder'
```

```
run = "hugo server --buildDrafts --buildFuture --bind 0.0.0.0 --port 443 --baseURL https://YOUR-REPL-NAME-HERE.YOUR-USERNAME-HERE.repl.co"
```

```
hugo new posts/first-post.md
```