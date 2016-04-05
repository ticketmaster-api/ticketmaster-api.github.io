---
layout: partners-doc
logos_url: "/assets/img/partners/logos/"
categories:
  - partners
  - certified
title: Certified partners
excerpt: Certified partners
keywords: Certified partners
---

# CERTIFIED PARTNERS
{: .double-margin-bottom}

{::comment}
{: .lead .double-margin}
Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh 
aesthetic food truck sriracha cornhole single-origin coffee chu.
{:/comment}

<div class="tiles-wrapper ">
{% for partner in site.pages %}
    {% if partner.categories[0] == "partner" && partner.categories[1] == "certified" %}


{% if partner.type == blank or partner.type == nil or partner.type == "small" or partner.type == "wide" %}
<div class="flip-container col-xs-12 {% if partner.type == "wide" %} col-sm-12 col-md-12 {% else %} col-sm-6 col-md-6 {% endif %}  col-lg-4" >
    <div class="flipper">
        <div class="front">
            {% capture fullpath %}{{ page.logos_url }}{{ partner.tile_logo }}{% endcapture %}
            <div class="img-wrapper">
                <img src="{{fullpath}}" alt="{{partner.pname | capitalize }}">
            </div>
        </div>
        <div class="back">
            {% if partner.tile_header %}
            <h3>{{ partner.tile_header }}</h3>
            {% endif %}
            {{ partner.tile_description | markdownify }}
        </div>
    </div>
</div>
{% endif %}

{% if partner.type == "big" %}

{% capture bgimg %}{{ page.logos_url }}{{ partner.tile_bg }}{% endcapture %}
{% capture logo %}{{ page.logos_url }}{{ partner.tile_logo }}{% endcapture %}

<div class="big-tile col-xs-12 col-sm-12 col-md-12 col-lg-12" >
    <div class="content-box" style="background-image: url('{{bgimg}}');">
        <div class="logo-box col-sm-3 col-md-3 col-lg-3">
            <div class="img-wrapper ">
                <img src="{{logo}}" style="width:200px;" alt="{{partner.pname | capitalize }}">
            </div>
        </div>
        <div class="description col-sm-7 col-md-7 col-lg-7">
            {% if partner.tile_header %}
            <h3>{{ partner.tile_header }}</h3>
            {% endif %}
            {{ partner.tile_description | markdownify }}
        </div>
    </div>
</div>
{% endif %}

    {% endif %}
{% endfor %}
</div>

<script>
$(".flip-container").on('tap', 'this.classList.toggle("hover")');
</script>