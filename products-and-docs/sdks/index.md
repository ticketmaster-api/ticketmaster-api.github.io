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

{% capture SDK_Java_img %}/assets/img/products-and-docs/sdk-java-img.png{% endcapture %}
{% capture SDK_Java_img_square %}/assets/img/products-and-docs/sdk-java-img-263.png{% endcapture %}
{% capture 1-SDK_Java_title %}

Java-SDK
{% endcapture %}
{% capture SDK_Java_description %}
Java SDK for the Ticketmaster Open Platform. 
{% endcapture %}
{% capture SDK_Java_link %}
https://github.com/ticketmaster-api/sdk-java
{% endcapture %}

{% capture SDK_JS_img %}/assets/img/products-and-docs/sdk-js-img.png{% endcapture %}
{% capture SDK_JS_img_square %}/assets/img/products-and-docs/sdk-js-logo.png{% endcapture %}
{% capture 2-SDK_JS_title %}
JavaScript-SDK
{% endcapture %}
{% capture SDK_JS_description %}
Javascript SDK for the Ticketmaster Open Platform.
{% endcapture %}
{% capture SDK_JS_link %}
https://github.com/ticketmaster-api/sdk-javascript
{% endcapture %}

{% capture SDK_scala_img %}/assets/img/products-and-docs/sdk-scala-img.png{% endcapture %}
{% capture SDK_scala_img_square %}/assets/img/products-and-docs/sdk-scala-img-263.png{% endcapture %}
{% capture 3-SDK_scala_title %}
Scala-SDK
{% endcapture %}
{% capture SDK_scala_description %}
Scala SDK for the Ticketmaster Open Platform. This SDK supports Discovery v2.
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


<div class="no-desktop" markdown="1">
  <div class="raw" id="sdk-java"> 
    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
        <div class="tutorials-article">                
            <a href="{{ SDK_Java_link }}"><img src=" {{ SDK_Java_img }} " class="image" alt="{{ SDK_Java_title }}"/></a>                
            <div class="announcement">
                <h3>{{ SDK_Java_title }}</h3>
                <p>{{ SDK_Java_description }}</p>
                <a class="button button-blue" href="{{ SDK_Java_link }}">Learn more</a>              
            </div>                
        </div>
    </div>
    <div class="clearfix" ></div>
  </div>  
  <div class="raw" id="sdk-javascript"> 
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
  <div class="raw" id="sdk-scala"> 
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
</div>


<!--caution! static loop 1 to 3-->
<div class="row tiles-wrapper desktop">
{% for i in (1..3) %}   
  <div class="col-md-4 col-lg-4 flipper" >      
    <div class="card" >    
        <div class="front">            
          <div class="img-wrapper">
            <img src="{% cycle {{SDK_Java_img_square}}, {{SDK_JS_img_square}},  {{SDK_scala_img_square}} %}" 
                 alt="{% cycle {{SDK_Java_title}}, {{SDK_JS_title}}, {{SDK_scala_title}} %}">
          </div>
        </div>
        <div class="back">
          <a href="{% cycle {{SDK_Java_link}},        {{SDK_JS_link}},        {{SDK_scala_link}} %}">
               <h3>{% cycle {{1-SDK_Java_title}},     {{2-SDK_JS_title}},     {{3-SDK_scala_title}} %}</h3>           
                <p>{% cycle {{SDK_Java_description}}, {{SDK_JS_description}}, {{SDK_scala_description}} %}</p>
          </a>
        </div>      
    </div>
  </div>  
{% endfor %}
</div><!--tiles-wrapper-->

<div class="grey-box android" markdown="1">
{{manager}}
</div>

<div id="disqus_thread" style="margin-top: 50px;"></div>
<script>
    var disqus_config = function () {
        this.page.url = document.URL || "http://developer.ticketmaster.com/";
        // this.page.identifier = "{{page.title}}";
        this.page.identifier = "http://developer.ticketmaster.com/products-and-docs/sdks/";
    };
    (function() { // DON'T EDIT BELOW THIS LINE
        var d = document, s = d.createElement('script');

        s.src = '//ticketmasterapi.disqus.com/embed.js';

        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();
</script>
