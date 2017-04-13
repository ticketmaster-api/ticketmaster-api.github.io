---
layout: search
category: search
title: Search
excerpt: Search Results Ticketmaster Developer Portal
keywords: search
---

<div class="row search">
  <div class="row-container">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 column">
        <h1>SEARCH RESULTS</h1>
        <script>
          (function() { 
            window.__gcse = {
              callback: function() {
                console.log( document.querySelector('.gs-webResult.gs-result.gs-no-results-result') );
                /* $('input.q').val($('input.gsc-input').val()); */
              }
            };
            var cx = '000111791941460729347:zmu0d7yvkfq';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
                '//cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
          })();
          
          (function () {
                  var ev = new $.Event('remove'),
                      orig = $.fn.remove;
                  var evap = new $.Event('append'),
                     origap = $.fn.append;
                  $.fn.remove = function () {
                      $(this).trigger(ev);
                      return orig.apply(this, arguments);
                  }
                  $.fn.append = function () {
                      $(this).trigger(evap);
                      return origap.apply(this, arguments);
                  }
              })();
              
              // $(document).on('append', function (e) { console.log('added'); });
              // $(document).on('remove', function (e) { console.log('removed'); });
          
          document.addEventListener('DOMContentLoaded', function(){ 
              $( ".gsc-search-button" ).on( "click", function() {
                alert('2ergwerg');
              });
          }, false);
          
        </script>
        <gcse:search enableAutoComplete="true" autoCompleteMaxCompletions="5" noResultsString="Unfortunately, no results found for this search. Please change search conditions."></gcse:search>
    </div>
  </div>
</div>
