---
layout: documentation
categories:
- documentation
- generated
- swagger
- v1
---
{% comment %}
  layout: documentation
  categories:
  - documentation                   // main category
  - generated                       // define it as generated page from api.json inside 'name of API'/'version of API'
  - swagger                         // name of API
  - v1                              // version of API
  data: swagger-pim-api             // file from swagger
{% endcomment %}

{%assign apiName = page.categories[2]%}
{%assign version = page.categories[3]%}

{% if version %}
<p class="version-button article {% if version == 'v2' %}active{% endif %}" style="margin-right: 0px;">
    <a href="/products-and-docs/apis/{{apiName}}/v2/">V 2.0</a>
</p>
{% endif %}

