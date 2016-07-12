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


{% capture SDKJava_img %}
/assets/img/products-and-docs/sdk-java-img.png
{% endcapture %}
{% capture SDKJava_title %}
SDK-Java
{% endcapture %}
{% capture SDKJava_description %}

{% endcapture %}
{% capture SDKJava_link %}
https://github.com/ticketmaster-api/sdk-java
{% endcapture %}

{% capture SDK_JS_img %}
/assets/img/products-and-docs/sdk-js-img.png
{% endcapture %}
{% capture SDK_JS_title %}
SDK-JavaScript
{% endcapture %}
{% capture SDK_JS_description %}

{% endcapture %}
{% capture SDK_JS_link %}
https://github.com/ticketmaster-api/sdk-javascript
{% endcapture %}

{% capture SDK_scala_img %}
/assets/img/products-and-docs/sdk-scala-img.png
{% endcapture %}
{% capture SDK_scala_title %}
SDK-Scala
{% endcapture %}
{% capture SDK_scala_description %}

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



<div class="raw" id="sdk-java" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
      <div class="tutorials-article">                
          <a href="{{ SDKJava_link }}"><img src=" {{ SDKJava_img }} " class="image" alt="{{ SDKJava_title }}"/></a>                
          <div class="announcement">
              <h3>{{ SDKJava_title }}</h3>
              <p>{{ SDKJava_description }}</p>
              <a class="button button-blue" href="{{ SDKJava_link }}">Learn more</a>              
          </div>                
      </div>
  </div>
  <div class="clearfix" ></div>
</div>

<div class="raw" id="sdk-javascript" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
      <div class="tutorials-article">                
          <a href="{{ SDK_JS_link }}"><img src=" {{ SDK_JS_img }} " class="image" alt="{{ SDK_JS_title }}"/></a>                
          <div class="announcement">
              <h3>{{ SDK_JS_title }}</h3>
              <p>{{ SDK_JS_description }}</p>
              <a class="button button-blue" href="{{ SDK_JS_link }}">Learn more</a>              
          </div>                
      </div>
  </div>
  <div class="clearfix" ></div>
</div>

<div class="raw" id="sdk-scala" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
      <div class="tutorials-article">                
          <a href="{{ SDK_scala_link }}"><img src=" {{ SDK_scala_img }} " class="image" alt="{{ SDK_scala_title }}"/></a>                
          <div class="announcement">
              <h3>{{ SDK_scala_title }}</h3>
              <p>{{ SDK_scala_description }}</p>
              <a class="button button-blue" href="{{ SDK_scala_link }}">Learn more</a>              
          </div>                
      </div>
  </div>
  <div class="clearfix" ></div>
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
