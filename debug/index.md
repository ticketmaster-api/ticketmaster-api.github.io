---
layout: debug
title: Debug info
id: debug
---

## site

### keys
{% for s in site %}
__{{s[0]}}__
{% endfor %}

## site.time

Sitewide information + configuration settings from  _config.yml. See below for details.

The current time (when you run the jekyll command).

{{ site.time }}

### site.data

{{site.data}}

### site.pages

{% for p in site.pages %}
* {{p.title}}   -   {{p.path}}   -   {{p.id}}
{% endfor %}


### site.posts

{% for p in site.posts %}
* {{p.title}}   -   {{p.path}}   -   {{p.id}}
{% endfor %}

### site.collections

{{site.collections}}

{% for c in site.collections %}
* {{c.title}}   -   {{c.path}}   -   {{c.id}}
{% endfor %}

### site.author

All the variables set via the command line and your _config.yml are available through the site variable. For example, if you have url: http://mysite.com in your configuration file, then in your Posts and Pages it will be stored in site.url.

Raw:
{{site.author}}

Key - Value
{% for i in site.author %}
{{i[0]}} - {{i[1]}} 
{% endfor %}



---