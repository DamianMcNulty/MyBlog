+++
title = "Mermaid Example"
date = 2026-09-10T12:00:00Z
draft = false
toc = false
ai_content = """
Mermaid is a JavaScript library that turns text descriptions into diagrams. Hugo can render Mermaid diagrams through a shortcode, so the diagram source stays readable and version-controlled alongside the post content.

This example shows the automated deployment path for the blog, from local development through Git and Netlify to the published site.
"""
+++

# Mermaid Example

This is a small test of the local `mermaid` Hugo shortcode.

The diagram source is passed between the shortcode tags:

{{< mermaid >}}
graph LR
    A[Local Development] --> B[Git Commit]
    B --> C[Git Push to GitHub]
    C --> D[GitHub Webhook]
    D --> E[Netlify Build Triggered]
    E --> F[Site Deployed]
    F --> G[Live Website Updated]
{{< /mermaid >}}