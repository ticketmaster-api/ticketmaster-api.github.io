---
layout: tutorials
categories:
- documentation
- tutorials
title: Tutorials
excerpt: Having trouble integrating with our APIs? It's not quite intuitive? Fear not! These tutorials will help you get up and running in no time! Full, contextual examples with full code snippets will provide you with what you need to kick start your own codebase!
---


# TICKETMASTER TUTORIALS

{: .lead .double-margin}
Having trouble integrating with our APIs? It's not quite intuitive? Fear not! These tutorials will help you get up and running in no time! Full, contextual examples with full code snippets will provide you with what you need to kick start your own codebase!

<div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">
{% for tutorials in site.pages %}
        {% if tutorials.categories[0] == "tutorials" %}
            <div class="tutorials-article">
                {% if tutorials.img %}
                    {% if tutorials.link %}<a href="{{ tutorials.link }}">{% endif %}<img src="{{ tutorials.img }}" class="image" alt="{{tutorials.title}}"/>{% if tutorials.link %}</a>{% endif %}
                {% endif %}
                <div class="announcement">
                    <h3>{% if tutorials.link %}<a href="{{ tutorials.link }}">{% endif %}{{ tutorials.title }}{% if tutorials.link %}</a>{% endif %}</h3>
                    <p>{{ tutorials.announcement }}</p>
                    {% if tutorials.link %}<a class="button button-blue" href="{{ tutorials.link }}">Learn more</a>{% endif %}
                    <div class="tags">
                        {% for tag in tutorials.tags %}
                            <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
                         {% endfor %}
                     </div>
                </div>
                
            </div>
        {% endif %}
{% endfor %}
</div>
