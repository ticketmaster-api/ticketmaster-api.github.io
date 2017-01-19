---
layout: tutorials-list
categories:
- documentation
- tutorials
- sample-apps-tutorials

title: Sample Apps Tutorials
excerpt: Let’s put everything together and see API in action.
---


# SAMPLE APPS TUTORIALS

{: .lead .double-margin}
Let’s put everything together and see API in action.

<div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 comntent">
{% for tutorials-sample-apps in site.pages %}
    {% if tutorials-sample-apps.categories[1] == "tutorials-sample-apps" %}
        <div class="tutorials-article">
            {% if tutorials-sample-apps.img %}
                {% if tutorials-sample-apps.link %}<a href="{{ tutorials-sample-apps.link }}">{% endif %}<img src="{{ tutorials-sample-apps.img }}" class="image" alt="{{tutorials-sample-apps.title}}"/>{% if tutorials-sample-apps.link %}</a>{% endif %}
            {% endif %}
            <div class="announcement">
                <h3>{% if tutorials-sample-apps.link %}<a href="{{ tutorials-sample-apps.link }}">{% endif %}{{ tutorials-sample-apps.title }}{% if tutorials-sample-apps.link %}</a>{% endif %}</h3>
                <p>{{ tutorials-sample-apps.announcement }}</p>
                {% if tutorials-sample-apps.link %}<a class="button button-blue" href="{{ tutorials-sample-apps.link }}">Learn more</a>{% endif %}
                <div class="tags">
                    {% for tag in tutorials-sample-apps.tags %}
                        <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                    {% endfor %}
                </div>
            </div>            
        </div>
    {% endif %}
{% endfor %}
</div>
