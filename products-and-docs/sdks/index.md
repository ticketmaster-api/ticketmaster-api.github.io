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


{: .lead .double-margin}
Easy integration for iOS and Android.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.

When an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

{% capture SDKJava_img %}
/assets/img/products-and-docs/sdk-java-img.png
{% endcapture %}
{% capture SDKJava_title %}
SDK-Java
{% endcapture %}
{% capture SDKJava_description %}
Description information about Certified Partners, what is it, how to became etc. Synth polaroid bitters chillwave pickled. Vegan disrupt tousled. For more information please contact us or visit FAQ section.
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
Description information about Certified Partners, what is it, how to became etc. Synth polaroid bitters chillwave pickled. Vegan disrupt tousled. For more information please contact us or visit FAQ section.
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
Description information about Certified Partners, what is it, how to became etc. Synth polaroid bitters chillwave pickled. Vegan disrupt tousled. For more information please contact us or visit FAQ section.
{% endcapture %}
{% capture SDK_scala_link %}
https://github.com/ticketmaster-api/sdk-scala
{% endcapture %}

{% capture manager %}
### Account Manager

{: .body}
Enable fans to manage their tickets within your app using 
the AccountManager SDK for iOS and Android. Users can 
view, transfer and sell Ticketmaster-verified single and 
season tickets all in one trusted place.

[COMING SOON!](javascript:void(0)){: .button.button-grey}

{% endcapture %}



<div class="raw" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
      <div class="tutorials-article">                
              <a href=" tutorials.link "><img src=" {{ SDKJava_img }} " class="image" alt="{{ SDKJava_title }}"/></a>                
          <div class="announcement">
              <h3>{{ SDKJava_title }}</h3>
              <p>{{ SDKJava_description }}</p>
              <a class="button button-blue" href="{{ SDKJava_link }}">Learn more</a>              
          </div>                
      </div>
  </div>
  <div class="clearfix" ></div>
</div>

<div class="raw" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10 double-margin-top">        
      <div class="tutorials-article">                
              <a href=" tutorials.link "><img src=" {{ SDK_JS_img }} " class="image" alt="{{ SDK_JS_title }}"/></a>                
          <div class="announcement">
              <h3>{{ SDK_JS_title }}</h3>
              <p>{{ SDK_JS_description }}</p>
              <a class="button button-blue" href="{{ SDK_JS_link }}">Learn more</a>              
          </div>                
      </div>
  </div>
  <div class="clearfix" ></div>
</div>

<div class="raw" markdown="1"> 
  <div class="col-xs-12 col-sm-12 col-md-9 col-lg-10">        
      <div class="tutorials-article">                
              <a href=" tutorials.link "><img src=" {{ SDK_scala_img }} " class="image" alt="{{ SDK_scala_title }}"/></a>                
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
