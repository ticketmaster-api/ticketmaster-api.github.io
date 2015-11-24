---
layout: default
---

<div class="home">
  {% for my_page in site.pages %}
    {% if my_page.title %}
    <a class="page-link" href="{{ my_page.url | prepend: site.baseurl }}">{{ my_page.title }}</a>
    {% endif %}
  {% endfor %}
</div>
