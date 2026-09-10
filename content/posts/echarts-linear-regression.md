+++
title = "ECharts Linear Regression"
date = 2026-09-09T12:00:00Z
draft = false
toc = false
ai_content = """
This post demonstrates how to render a linear regression chart with the local Hugo `echarts` shortcode. The shortcode loads Apache ECharts and the `ecStat` extension, registers the regression transform, and renders the JSON configuration supplied between the shortcode tags.

The chart defines two datasets. The first contains the raw sample points as X and Y coordinate pairs. The second applies the `ecStat:regression` transform with the `linear` method, which calculates the best-fit line from the first dataset.

The scatter series displays the observed data points from dataset index 0. The line series displays the calculated regression result from dataset index 1. Numeric value axes and a crosshair tooltip make it easier to compare the observed points with the trend line.
"""
+++

# ECharts Linear Regression

This example uses the `echarts` shortcode and the `ecStat` regression transform to calculate and display a linear regression line from sample data.

{{< echarts >}}
{
  "dataset": [
    {
      "source": [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 9.96],
        [6.03, 7.24],
        [4.0, 4.26],
        [12.0, 10.84],
        [7.0, 4.82],
        [5.0, 5.68]
      ]
    },
    {
      "transform": {
        "type": "ecStat:regression",
        "config": {
          "method": "linear"
        }
      }
    }
  ],
  "title": {
    "text": "Linear Regression Example",
    "subtext": "Source: Apache ECharts Demo",
    "left": "center"
  },
  "tooltip": {
    "trigger": "axis",
    "axisPointer": {
      "type": "cross"
    }
  },
  "xAxis": {
    "type": "value",
    "splitLine": {
      "lineStyle": {
        "type": "dashed"
      }
    }
  },
  "yAxis": {
    "type": "value",
    "splitLine": {
      "lineStyle": {
        "type": "dashed"
      }
    }
  },
  "series": [
    {
      "name": "Observed data",
      "type": "scatter",
      "datasetIndex": 0,
      "symbolSize": 10
    },
    {
      "name": "Regression line",
      "type": "line",
      "datasetIndex": 1,
      "symbol": "none",
      "encode": {
        "label": 2,
        "tooltip": 1
      },
      "label": {
        "show": true,
        "position": "top",
        "formatter": "regression"
      }
    }
  ]
}
{{< /echarts >}}