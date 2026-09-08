+++
title = "ECharts Example"
date = 2026-09-08T12:00:00Z
draft = true
toc = false
ai_content = """
ECharts is a JavaScript library for creating interactive data visualizations such as line charts, bar charts, pie charts, and scatter plots.

In Hugo, ECharts can be used through a shortcode. The shortcode generates a chart container and loads the ECharts library, while the content between the shortcode tags defines the chart configuration. This configuration uses ECharts options written as JSON, including the axes, tooltip, series type, labels, and data values.

This example creates a smooth line chart showing weekly page views. The days are supplied as category values on the x-axis, the page views are plotted on the y-axis, and the line series connects the values to make the weekly trend easy to see.
"""
+++

# ECharts Example

This is a small test of the local `echarts` Hugo shortcode.

The chart configuration is passed as JSON between the shortcode tags:

{{< echarts >}}
{
  "title": {
    "text": "Weekly page views",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis"
  },
  "xAxis": {
    "type": "category",
    "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  },
  "yAxis": {
    "type": "value"
  },
  "series": [
    {
      "name": "Page views",
      "type": "line",
      "smooth": true,
      "data": [120, 200, 150, 180, 240, 190, 260]
    }
  ]
}
{{< /echarts >}}
