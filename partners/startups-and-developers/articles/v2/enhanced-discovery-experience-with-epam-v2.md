---
order: 4
category: sd-article-v2
layout: partners-doc
categories: 
  - startup_and_development
tags:
  - web
img: /assets/img/partners/startups-development/epam-team-web.jpg
title:  Enhanced Discovery Experience with EPAM
summary: EPAM Team completed POC of the Enhanced Discovery Experience
         application that is based on the Ticketmaster's Discovery API.
tab: Web
cardsize: 1.2
places:
  - gallery
  - header
  - top
---


{% capture left %}

## Enhanced Discovery Experience with EPAM

EPAM Team completed POC of the Enhanced Discovery Experience
application that is based on the Ticketmaster's Discovery API. 
The main idea that was used in the application is to gather all 
available data from Ticketmaster's database using public APIs on 
frequent basis and then perform deep searches directly in this 
database that allows to make more advanced search requests and 
receive much more accurate discovery experience.

{% endcapture %}

<div class="col-lg-8 col-md-8 col-sm-8">{{ left | markdownify }}</div>

{% capture left %}

![APIExplorer](/assets/img/partners/startups-development/screencapture-degratnik-github-io-TM-Discovery-Search-search-1457611383175.png)
{: .add-img-border}

{% endcapture %}


{% capture right %}

![Rectangle](/assets/img/partners/startups-development/epam-team-web.jpg)

EPAM team

{% endcapture %}

<div class="col-lg-8 col-md-8 col-sm-8">{{ left | markdownify }}</div>
<div class="col-lg-4 col-md-4 col-sm-4" style="float:right;">{{ right | markdownify }}</div>

{% capture left %}

The technology stack for the POC includes Elasticsearch as database 
and search engine and Jackson that allows to work with json data 
in convenient way. The POC also allows to use such features as 
Fuzzy Search and Synonymous Search that improves the quality and 
increases the scope of search results.

For the next version the team plans to Akka framework for data crawling
and Neo4j graph database that will allow to speed-up the connections and
allows to build recommendation engine on top of the solution.

Looking forward to hear more results from awesome EPAM Team.

{% endcapture %}

<div class="col-lg-8 col-md-8 col-sm-8">{{ left | markdownify }}</div>


