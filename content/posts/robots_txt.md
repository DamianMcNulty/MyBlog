+++ 
draft = false
date = 2025-08-06T23:56:47Z
title = "Robots.txt"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
+++

Added enableRobotsTXT = true to the config.toml file

And:
[params.robots]
noindex = true

Added robots.txt to the static folder with:

User-agent: *
Disallow: /


