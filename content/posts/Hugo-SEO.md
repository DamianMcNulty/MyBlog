+++ 
draft = false
date = 2025-08-21
title = "SEO tips"
description = ""
slug = ""
authors = []
tags = []
categories = []
externalLink = ""
series = []
ai_content = """
1. Optimize Site Metadata

Search engines rely heavily on metadata to understand what your pages are about. 

For Hugo:

Define title, description, and keywords in your front matter. Most Hugo themes already surface these in templates, but double-check your layout files.

Add params.toml (or config.toml/config.yaml) fields for global defaults like site title, description, and Open Graph metadata.

Pro tip: In Hugo, you can use {{ .Description }} in your theme’s <head> to ensure each page has a unique meta description.

2. Human-Friendly and Search-Friendly URLs

By default, Hugo creates clean and static URLs (like /my-first-post/). 

That’s great! 

To go further:

Avoid deep nesting unless it adds real structure.

Set a slug in front matter when needed to curate your URL.

Use lowercase, hyphenated words instead of underscores.

Clean URLs are easier for search engines and users to remember.

3. Leverage Hugo’s Speed
Google rewards fast-loading websites, and Hugo gives you a huge advantage here.

On Netlify, make sure you:

Enable Asset Minification—Hugo can minify CSS and JS during build.

Use Hugo Pipes for combining and fingerprinting assets.

Serve images in modern formats (WebP/AVIF), and consider an image processing shortcode for resizing and cropping.

4. Create an XML Sitemap Automatically

Most SEO checklists require a sitemap. 

Hugo can generate one out-of-the-box by adding this to your config.toml:

text
[sitemap]
  changefreq = "monthly"
  priority = 0.5
  filename = "sitemap.xml"


Netlify will then deploy it at yoursite.com/sitemap.xml, and you can submit it to Google Search Console for better crawling.

5. Set Up Canonical Links


Duplicate content can confuse search engines. Hugo makes canonical URLs easy:

```xml<link rel="canonical" href="{{ .Permalink }}">```

Adding this to your layouts/partials/head.html ensures each page points search engines to its true source.

6. Use Netlify Redirects for Content Changes

If you ever change URL structures (for example, from /blog/post/ to /articles/post/), set up 301 redirects in a _redirects file at the root. 

Example:

```text
/blog/*   /articles/:splat   301
```

This keeps link equity intact and avoids 404 errors.

7. Add Structured Data (Schema.org)

Search engines like Google benefit from structured data. For blog posts, you can add JSON-LD snippets:

```xml
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "{{ .Title }}",
  "datePublished": "{{ .Date }}",
  "author": "{{ .Params.author }}"
}
</script>
```

This can be placed in your post template to help Google display rich results like article previews.

8. Optimize for Mobile and Core Web Vitals

Since most readers will come from mobile:

Use responsive Hugo themes.

Test your blog on Google’s Mobile-Friendly Test.

Check PageSpeed Insights after deploying to Netlify and refine images, font loading, and scripts.

9. Don’t Overlook Content SEO

Technical SEO matters, but the most important factor is still quality content. 

To boost rankings:

Use semantic headers 
```(<h1>, <h2>, <h3>)``` to structure posts.

Write naturally, but sprinkle in keywords people are searching for.

Link internally (to your own posts) and externally (to reputable sources).
"""
+++
SEO tips