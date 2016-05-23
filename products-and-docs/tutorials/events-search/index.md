---
layout: tutorials-list
categories:
- documentation
- tutorials
- events-search-tutorials

title: Events Search Tutorials
excerpt: Visit Universe’s site to get everything you need to sell tickets directly on your website at no additional cost.
keywords: widget, sell tickets, direct payments
---


# EVENTS SEARCH TUTORIALS

{: .lead .double-margin}
Retro occupy organic, stumptown shabby chic pour-over roof party DIY normcore. Actually artisan organic occupy, Wes Anderson ugh whatever pour-over gastropub selvage.

<div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 comntent">
{% for tutorials-events-search in site.pages %}
    {% if tutorials-events-search.categories[1] == "tutorials-events-search" %}
        <div class="tutorials-article">
            {% if tutorials-events-search.img %}
                {% if tutorials-events-search.link %}<a href="{{ tutorials-events-search.link }}">{% endif %}<img src="{{ tutorials-events-search.img }}" class="image" alt="{{tutorials-events-search.title}}"/>{% if tutorials-events-search.link %}</a>{% endif %}
            {% endif %}
            <div class="announcement">
                <h3>{% if tutorials-events-search.link %}<a href="{{ tutorials-events-search.link }}">{% endif %}{{ tutorials-events-search.title }}{% if tutorials-events-search.link %}</a>{% endif %}</h3>
                <p>{{ tutorials-events-search.announcement }}</p>
            </div>
            <div class="tags">
                {% for tag in tutorials-events-search.tags %}
                    <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                {% endfor %}
            </div>
        </div>
    {% endif %}
{% endfor %}
</div>