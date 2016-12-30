---
order: 3
category: sd-article
tags:
  - web
  - heatmap
---

{% capture left %}

## Discovery API Heatmap

#### Heatmap representing data from Discovery API. [Fullscreen](http://heatmap-1220776398.us-west-2.elb.amazonaws.com/)

The Discovery Heatmap fetches every public events from discovery API and refreshes them automatically in the browser every hour.

Events are displayed so the more events are in a location, the more it gets colored. The color scheme begins from a light blue, then purple and when the heat is really high, red.

A user can zoom in and out with the scroll wheel (or finger pinch on a touch screen) and move around the map with mouse drag and drop.

The map is optimised to be displayed in fullscreen. To do so, press the F11 key to activate the fullscreen mode in most modern browsers.

{% endcapture %}

<div class="col-lg-8 col-md-8 col-sm-8">{{ left | markdownify }}</div>
<iframe style="width:100%;height:500px;" src="http://heatmap-1220776398.us-west-2.elb.amazonaws.com/"></iframe>
