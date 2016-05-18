---
layout: tutorials
categories:
- documentation
- tutorials
title: Tutorials
excerpt: Visit Universe’s site to get everything you need to sell tickets directly on your website at no additional cost.
keywords: widget, sell tickets, direct payments
---


# TICKETMASTER TUTORIALS

{: .lead .double-margin}
Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore. Actually artisan organic occupy, Wes Anderson ugh whatever pour-over gastropub selvage.

<div class="col-xs-12 col-sm-12 col-md-9 col-lg-9">
{% for tutorials in site.pages %}
        {% if tutorials.categories[0] == "tutorials" %}
            <div class="tutorials-article">
                {% if tutorials.img %}
                    {% if tutorials.link %}<a href="{{ tutorials.link }}">{% endif %}<img src="{{ tutorials.img }}" class="image" alt="{{tutorials.title}}"/>{% if tutorials.link %}</a>{% endif %}
                {% endif %}
                <div class="announcement">
                    <h3>{% if tutorials.link %}<a href="{{ tutorials.link }}">{% endif %}{{ tutorials.title }}{% if tutorials.link %}</a>{% endif %}</h3>
                    <p>{{ tutorials.announcement }}</p>
                </div>
                <div class="tags">
                    {% for tag in tutorials.tags %}
                        <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                     {% endfor %}
                 </div>
            </div>
        {% endif %}
{% endfor %}
</div>