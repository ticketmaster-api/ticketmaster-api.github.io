---
layout: documentation
categories:
- documentation
- swagger
- discovery-v1
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


{% assign releaseNotes = site.data.orgs.discovery-v2.methods-discovery-v1.releaseNotes %}
{% capture releaseNotes %}
    {%if releaseNotes%}
      {{ releaseNotes }}
    {%else%}
      Release Notes not added.
   {%endif%}
{% endcapture %}

{{ versionBlock }}
{{ releaseNotes }}


