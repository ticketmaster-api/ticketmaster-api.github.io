---
layout: documentation
categories:
- documentation
- generated
- swagger
- v1
title: Example Swagger
data: swagger-pim-api
---

{% comment %}
  layout: documentation
  categories:
  - documentation                   // main category
  - swagger                         // if page.categories[1] == "swagger"  -> include swagger.html
  - discovery-v1                    // identifier for additional metadata. When 'discovery-v1' methodsDescription = site.data.orgs...
  title: Example Swagger            // not used
  data: swagger-pim-api             // file from swagger
{% endcomment %}

{% capture versionBlock %}

{: .version-button}
[V 2.0]({{"/products-and-docs/apis/swagger/v2/" | prepend: site.baseurl}})

{: .version-button .active}
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


