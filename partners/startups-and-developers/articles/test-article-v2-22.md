---
order: 22
category: sd-article-v2
layout: partners-doc
categories: 
  - startup_and_development
tags:
  - web  
img: /assets/img/S&D/people-3.png
title: Title for the Selected Hero Image 5
summary: Lorem ipsum
tab: DevJam
places:
  - gallery  
---

{% capture article-title %}
Ticketmaster for Amazon Echo
{% endcapture %}

{% capture article-descr %}
A Voice-based application written for Amazon Echo devices.  
{% endcapture %}

{% capture article-content_1 %}
This is a voice-based application written for Amazon Echo devices. It allows you to search for events that are taking place around you, or for other events by using keywords. It features convenient navigation. It also provides details of events: place, time, event description. Additionally, it can show you ticket information on a paired mobile device, and let you use Gmail. It supports the RSS newsfeed, which is used for Gossips navigation.
{% endcapture %}

{% capture article-content_2 %}
It is written in Java and uses Maven for the build process.
{% endcapture %}

{% capture article-content_3 %}
All credential information has been removed from Ticketmaster, so you will need to add your own information before building the application.
{% endcapture %}

{% capture article-content_4 %}
Bushwick meh Blue Bottle pork belly mustache skateboard [3 wolf moon](https://app.zeplin.io). Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson.
{% endcapture %}

{% capture article-content_5 %}
Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson.
{% endcapture %}

{% capture article-content_6 %}
Bushwick meh Blue Bottle pork belly mustache skateboard 3 wolf moon. Actually beard single-origin coffee, twee 90's PBR Echo Park sartorial try-hard freegan Portland ennui. Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson.
{% endcapture %}

{% capture article-content_7 %}
Selvage jean shorts 90's, Vice American Apparel try-hard food truck Shoreditch fap lomo Wes Anderson.
{% endcapture %}



<section class="sd-article startups-and-developers__article row">
	<header>
		<h1 class="startups-and-developers__article--title">{{article-title}}</h1>
		<p class="lead">{{article-descr}}</p>
	</header>
	<section>
		<article>
			<p>{{article-content_1}}</p>
			<div>
				<div class="pull-left">
					<img class="echo" src="/assets/img/partners/startups-development/echo.jpg">
				</div>
				<div class="aside-block">
					<a href="#">PBR&B selfies chillwave, bespoke tote bag blog post-ironic.
						Single-origin coffee put a bird on it craft beer YOLO</a>
					<p>Fernando Martinezz, <br>epam.com</p>
				</div>
			</div>
			<p>{{article-content_2}}</p>
			<p>{{article-content_3}}</p>
		</article>
		<article>
			<h3>Development process</h3>
			<section>
				<div class="pull-left">
					<p>{{article-content_4}}</p>
					<p>{{article-content_5}}</p>
				</div>
				<div class="aside-block as-bordered">
					<p class="as-title">Informational Block</p>
					<p>Bushwick meh Blue Bottle pork belly mustache skateboard 3 wolf moon. Ac.</p>
				</div>
			</section>
			<div class="row">
				<div class="col-xs-6 pull-left">
					<img class="rect-image" src="/assets/img/partners/startups-development/rectangle-483-copy.png" alt="">
				</div>
				<div class="col-xs-6 pull-right">
					<img class="rect-image" src="/assets/img/partners/startups-development/rectangle-444.png" alt="">
				</div>
			</div>
			<video poster="/assets/img/partners/startups-development/rectangle-175.png" controls class="video">
				<source
					src="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm"
					type="video/webm">
				<source
					src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
					type="video/mp4">
				<source
					src="https://archive.org/download/WebmVp8Vorbis/webmvp8.ogv"
					type="video/ogg">
				Your browser doesn't support HTML5 video tag.
			</video>
			<section class="article-tags">
				<button class="tag-btn" data-tag="JavaScript">JavaScript</button>
				<button class="tag-btn" data-tag="Classes">Classes</button>
			</section>
			<p>{{article-content_6}}</p>
      <p>{{article-content_7}}</p>
		</article>
	</section>
</section>
