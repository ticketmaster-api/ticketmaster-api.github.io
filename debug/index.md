---
layout: debug
title: Debug info
id: debug
---

Build time: {{ site.time }}

Build info: {{ site.data.gitcommit.info }}


<h3>List of site titles:</h3>
<ul>
    {% assign sitePagesSorted = site.pages | sort: 'title' %}
    {% for page in sitePagesSorted %}
    <li><a href="{{ page.url }}">{{ page.title  }}</a> {%if page.categories contains 'changelog' %} used in changelog {%endif%}</li>
    {% endfor %}
</ul>
