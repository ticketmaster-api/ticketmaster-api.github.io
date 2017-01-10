---
layout: tutorials-list
categories:
- documentation
- tutorials
- widgets-tutorials
 
title: Widgets Tutorials
excerpt: Visit Universe’s site to get everything you need to sell tickets directly on your website at no additional cost.
keywords: widget, sell tickets, direct payments
---


# WIDGETS TUTORIALS

{: .lead .double-margin}
Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore. Actually artisan organic occupy, Wes Anderson ugh whatever pour-over gastropub selvage.

<div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 comntent">
{% for tutorials-widgets in site.pages %}
    {% if tutorials-widgets.categories[1] == "tutorials-widgets" %}
        <div class="tutorials-article">
            {% if tutorials-widgets.img %}
                {% if tutorials-widgets.link %}<a href="{{ tutorials-widgets.link }}">{% endif %}<img src="{{ tutorials-widgets.img }}" class="image" alt="{{tutorials-widgets.title}}"/>{% if tutorials-widgets.link %}</a>{% endif %}
            {% endif %}
            <div class="announcement">
                <h3>{% if tutorials-widgets.link %}<a href="{{ tutorials-widgets.link }}">{% endif %}{{ tutorials-widgets.title }}{% if tutorials-widgets.link %}</a>{% endif %}</h3>
                <p>{{ tutorials-widgets.announcement }}</p>
                {% if tutorials-widgets.link %}<a class="button button-blue" href="{{ tutorials-widgets.link }}">Learn more</a>{% endif %}
                <div class="tags">
                    {% for tag in tutorials-widgets.tags %}
                        <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                    {% endfor %}
                </div>
            </div>            
        </div>
    {% endif %}
{% endfor %}
</div>