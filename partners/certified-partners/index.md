---
layout: partners-doc
logos_url: "/assets/img/partners/logos/"
category: partners
---

#CERTIFIED PARTNERS

{: .lead .double-margin}
Synth polaroid bitters chillwave pickled. Vegan disrupt tousled, Portland keffiyeh 
aesthetic food truck sriracha cornhole single-origin coffee chu.

<div class="tiles-wrapper ">
{% for partner in site.pages %}
    {% if partner.categories[0] == "partner" && partner.categories[1] == "certified" %}


{% if partner.type == blank or partner.type == nil or partner.type == "small" %}
<div class="flip-container col-md-6 col-lg-4" ontouchstart="this.classList.toggle('hover');">
    <div class="flipper">
        <div class="front">
            {% capture fullpath %}{{ page.logos_url }}{{ partner.tile_logo }}{% endcapture %}
            <div class="img-wrapper">
                <img src="{{fullpath}}">
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

<div class="big-tile col-md-12 col-lg-12" >
    <div class="content-box" style="background-image: url('{{bgimg}}');">
        <div class="logo-box col-lg-4">
            <div class="img-wrapper ">
                <img src="{{logo}}">
            </div>
        </div>
        <div class="description col-lg-8">
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



