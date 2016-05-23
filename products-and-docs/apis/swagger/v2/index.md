---
layout: documentation
categories:
- documentation
- generated
- swagger
- v2
title: Example Swagger
data: discovery-api-docs
redirect_from:
- "/products-and-docs/apis/swagger/"
---

{% comment %}
  layout: documentation
  categories:
  - documentation                   // main category
  - swagger                         // if page.categories[1] == "swagger"  -> include swagger.html and it is 'folder name'
  - v1                              // folder name
  title: Example Swagger            // not used
  data: swagger-pim-api             // file from swagger
{% endcomment %}

{% capture versionBlock %}

{: .version-button .active}
[V 2.0]({{"/products-and-docs/apis/swagger/v2/" | prepend: site.baseurl}})

{: .version-button }
[V 1.0]({{"/products-and-docs/apis/swagger/v1/" | prepend: site.baseurl}})

{% endcapture %}



{% assign pageMetaFolder = page.categories[2] %}
{% assign pageMetaVersionFolder = page.categories[3] %}
{% assign methodsDescription = site.data.orgs[pageMetaFolder][pageMetaVersionFolder].methods-metadata %}
{% assign releaseNotes = methodsDescription.releaseNotes %}
{% capture releaseNotes %}
    {%if releaseNotes%}
      {{ releaseNotes }}
    {%else%}
      Release Notes not added.
   {%endif%}
{% endcapture %}

{{ versionBlock }}


