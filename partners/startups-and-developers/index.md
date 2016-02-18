---
layout: partners-doc
category: startup_and_development
---
#STARTUPS & DEVELOPERS

{: .lead}
Bushwick meh Blue Bottle pork belly mustache skateboard 3 wolf moon. Actually beard single-origin coffee, dolor sit amet.

{% assign sorted_article = (site.pages | sort: 'order') %}

{% for article in sorted_article %}
    {% if article.category == "sd-article" %}
<div class="sd-article">
    <div class="article-body">
        {{ article.content }}
    </div>
    <div class="article-tags">
        {% for tag in article.tags %}
            <button class="tag-btn" tag="{{tag}}">{{tag}}</button>
        {% endfor %}
    </div>
</div>
    {% endif %}
{% endfor %}

<script>
    // Get list of upcoming events
    var uniqueUpcoming = [].map.call($(".sd-article").find(".tag-btn"),function(item){
        return '<li><a href="#' + item.textContent + '" class="tag-menu-btn">' + item.textContent + '</a></li>';;
    }).filter( function(value, index, self) {
        return self.indexOf(value) === index;
    }).join("");

    if(uniqueUpcoming !== ""){
      $(".sd-tags-list").append(uniqueUpcoming);
    }

</script>