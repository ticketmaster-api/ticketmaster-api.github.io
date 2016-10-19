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
    <li class='red'> 
        <span class='body'> title : </span>
        {% if page.categories[1] == "generated" %}
            {% assign pageMetaFolder = page.categories[2] %}
            {% assign pageMetaVersionFolder = page.categories[3] %}
            {% assign autodocJson = site.data.orgs[pageMetaFolder][pageMetaVersionFolder]['api'] %}
                {{ autodocJson.info.title | strip }} - 
        {%else%}
            {% if page.title %}{{ page.title | strip }} – {% endif %}
        {% endif %}
        {% if site.title %}{{ site.title }}{% endif %} 
        <span class='body'>{%if page.categories contains 'changelog' %} used in changelog {%endif%} , link : </span><a href="{{ page.url }}">{{ page.url }}</a> 
    </li>
    {% endfor %}
</ul>
