---
layout: tutorials-list
categories:
- documentation
- tutorials
- events-search-tutorials

title: Events Search Tutorials
excerpt: Our Discovery API is rich with event listings and details as well as artist and venue data. Below are a few tutorials that showcase different ways of leveraging the Discovery API to extract content in a meaningful way.
---


# EVENTS SEARCH TUTORIALS

{: .lead .double-margin}
Our Discovery API is rich with event listings and details as well as artist and venue data. Below are a few tutorials that showcase different ways of leveraging the Discovery API to extract content in a meaningful way.

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
                {% if tutorials-events-search.link %}<a class="button button-blue" href="{{ tutorials-events-search.link }}">Learn more</a>{% endif %}
                <div class="tags">
                    {% for tag in tutorials-events-search.tags %}
                        <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                    {% endfor %}
                </div>
            </div>
            
        </div>
    {% endif %}
{% endfor %}
</div>
