---
layout: debug
title: Debug info
id: debug
---

Build time: {{ site.time }}

Build info: {{ site.data.gitcommit.info }}


<h3>Site titles:</h3>
<ul>
    {% for page in site.pages %}
    <li><a href="{{ page.url }}">{{ page.title  }}</a> {%if page.categories contains 'changelog' %} used in changelog {%endif%}</li>
    {% endfor %}
</ul>
