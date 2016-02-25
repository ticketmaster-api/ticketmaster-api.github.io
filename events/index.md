---
layout: events
category: events
title: Events
excerpt: Ticketmaster upcoming and past events
keywords: events
---
{: #event-header }
### Upcoming

{% assign sorted_event = (site.pages | sort: 'date_start', 'last') %}

{% for event in sorted_event %}
    {% if event.category == "event" %}
<div class="event" data-event-start="{{ event.date_start }}" data-event-end="{{ event.date_end }}">
    {% if event.img %}
        <img src="{{ event.img }}" class="image" alt="{{event.title}}"/>
    {% endif %}
    <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9 comntent">
        <h2>{{ event.title }}</h2>
        {{ event.content | markdownify }}
        <div class="tags">
            {% for tag in event.tags %}
                <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
            {% endfor %}
        </div>
    </div>
    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3 location">
        <div class="date">{{ event.date_title }}</div>
        <div class="place">
            <a href="{{ event.place[1] }}">{{ event.place[0] }}</a>
        </div>
        <div class="city">{{ event.city }}</div>
        {% if event.rsvp %}
            <a href="{{ event.rsvp }}" class="blue-btn rsvp">RSVP</a>
        {% endif %}
    </div>
   
</div>
    {% endif %}
{% endfor %}