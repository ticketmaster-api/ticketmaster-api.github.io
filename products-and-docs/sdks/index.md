---
layout: documentation-single
categories:
- documentation
- sdks
title: SDKs
excerpt: Easy integration for iOS and Android.
keywords: API, SDK, AccountManager SDK, integration, iOS, Android
---


{: .noupper}
# SDKs

{: .lead}
A software development kit (SDK or "devkit") is typically a set of software development tools that allows the creation of applications for a certain software package ...

{% capture SDKJava_img %}
/assets/img/products-and-docs/ic-sdk-java.svg
{% endcapture %}
{% capture SDKJava_title %}
SDK-Java
{% endcapture %}
{% capture SDKJava_description %}
Java SDK for the Ticketmaster Open Platform.  
Aims to wrap the Ticketmaster API with coverage for all Open Platform endpoints
{% endcapture %}
{% capture SDKJava_link %}
https://github.com/ticketmaster-api/sdk-java
{% endcapture %}

{% capture SDK_JS_img %}
/assets/img/products-and-docs/sdk-js-logo.png
{% endcapture %}
{% capture SDK_JS_title %}
SDK-JavaScript
{% endcapture %}
{% capture SDK_JS_description %}
Javascript SDK for the Ticketmaster Open Platform.  
Aims to wrap the Ticketmaster API with coverage for all Open Platform endpoints
{% endcapture %}
{% capture SDK_JS_link %}
https://github.com/ticketmaster-api/sdk-javascript
{% endcapture %}

{% capture SDK_scala_img %}
/assets/img/products-and-docs/ic-sdk-scala.svg
{% endcapture %}
{% capture SDK_scala_title %}
SDK-Scala
{% endcapture %}
{% capture SDK_scala_description %}
Scala SDK for the Ticketmaster Open Platform.  
Aims to wrap the Ticketmaster API with coverage for all Open Platform endpoints
{% endcapture %}
{% capture SDK_scala_link %}
https://github.com/ticketmaster-api/sdk-scala
{% endcapture %}

{% capture manager %}

{: #account-manager}
### Account Manager

{: .body}
Enable fans to manage their tickets within your app using 
the AccountManager SDK for iOS and Android. Users can 
view, transfer and sell Ticketmaster-verified single and 
season tickets all in one trusted place.

[COMING SOON!](javascript:void(0)){: .button.button-grey}

{% endcapture %}

<div id="sdk-java" class="sdk-flip-container" ontouchstart="this.classList.toggle('hover');">
	<div class="sdk-flipper">
		<div class="sdk-front sdk-front-java">
			<img src=" {{ SDKJava_img }} " class="sdk-img-java sdk-img image" alt="{{ SDKJava_title }}"/>
		</div>
		<a href="{{ SDKJava_link }}" class="sdk-back desktop">
			<h3 class="sdk-description__title">{{ SDKJava_title }}</h3>
			<p class="sdk-description__text">{{ SDKJava_description }}</p>
		</a>
		<div class="sdk-back mobile">
			<h3 class="sdk-description__title">{{ SDKJava_title }}</h3>
			<p class="sdk-description__text">{{ SDKJava_description }}</p>
		</div>
		<a class="sdk-button button button-blue" href="{{ SDKJava_link }}">Learn more</a>
	</div>
</div>


<div id="sdk-javascript" class="sdk-flip-container" ontouchstart="this.classList.toggle('hover');">
	<div class="sdk-flipper">
		<div class="sdk-front sdk-front-js">
			<img src=" {{ SDK_JS_img }} " class="sdk-img-js sdk-img image" alt="{{ SDK_JS_title }}"/>
		</div>
		<a href="{{ SDK_JS_link }}" class="sdk-back desktop">
			<h3 class="sdk-description__title">{{ SDK_JS_title }}</h3>
			<p class="sdk-description__text">{{ SDK_JS_description }}</p>
		</a>
		<div class="sdk-back mobile">
			<h3 class="sdk-description__title">{{ SDK_JS_title }}</h3>
			<p class="sdk-description__text">{{ SDK_JS_description }}</p>
		</div>
		<a class="sdk-button button button-blue" href="{{ SDK_JS_link }}">Learn more</a>
	</div>
</div>


<div id="sdk-scala" class="sdk-flip-container" ontouchstart="this.classList.toggle('hover');">
	<div class="sdk-flipper">
		<div class="sdk-front sdk-front-scala">
			<img src=" {{ SDK_scala_img }} " class="sdk-img-scala sdk-img image" alt="{{ SDK_scala_title }}"/>
		</div>
		<a href="{{ SDK_scala_link }}" class="sdk-back desktop">
			<h3 class="sdk-description__title">{{ SDK_scala_title }}</h3>
			<p class="sdk-description__text">{{ SDK_scala_description }}</p>
		</a>
		<div class="sdk-back mobile">
			<h3 class="sdk-description__title">{{ SDK_scala_title }}</h3>
			<p class="sdk-description__text">{{ SDK_scala_description }}</p>
		</div>
		<a class="sdk-button button button-blue" href="{{ SDK_scala_link }}">Learn more</a>
	</div>
</div>

<div class="grey-box android" markdown="1">
{{manager}}
</div>


<div id="disqus_thread" style="margin-top: 50px;"></div>
<script>
    var disqus_config = function () {
        this.page.url = document.URL || "http://developer.ticketmaster.com/";
        this.page.identifier = "{{page.title}}";
    };
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');

        s.src = '//ticketmasterapi.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
