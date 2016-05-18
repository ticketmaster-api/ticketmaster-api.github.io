---
layout: documentation
categories:
- documentation
- swagger
- discovery-v2
title: Example Swagger
data: discovery-api-docs
redirect_from:
- "/products-and-docs/apis/swagger/"
---

{% comment %}
  layout: documentation
  categories:
  - documentation                   // main category
  - swagger                         // if page.categories[1] == "swagger"  -> include swagger.html
  - pim                             // identifier for additional metadata. When 'pim' methodsDescription = site.data.orgs.methods-pim-api
  title: Example Swagger            // not used
  data: swagger-pim-api             // file from swagger
{% endcomment %}

{% capture versionBlock %}

{: .version-button .active}
[V 2.0]({{"/products-and-docs/apis/swagger/v2/" | prepend: site.baseurl}})

{: .version-button }
[V 1.0]({{"/products-and-docs/apis/swagger/v1/" | prepend: site.baseurl}})

{% endcapture %}



{% capture releaseNotes %}
   {{ site.data.orgs.v2-pim.methods-pim-v2-api.releaseNotes }}
{% endcapture %}

{{ versionBlock }}
{{ releaseNotes }}


