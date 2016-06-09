(function () {
  $(document).ready(function () {
    var $nestedLists = $('.nested-list'),
        $nestedListsWrapper = $('.nested-list-wrapper');

    $nestedLists.wrap("<div class='nested-list-wrapper'></div>");

    $('.nested-list-wrapper')
      .on('select_node.jstree', function (e, data) {
        data.instance.toggle_node(data.node); //set open on one click
      })
      .jstree({
        "core": {
          "themes": {
            "dots": true // no connecting dots between dots
          }
        },
        "plugins": [] // activate the state plugin on this instance
      });

    /*set open list in 'changelog page' by load*/
    // var $changelog = $('.changelog'),
    //     $listInsideChangelog = $('.nested-list-wrapper', $changelog);
    // $listInsideChangelog.on('ready.jstree', function() {
    //     $listInsideChangelog.jstree("open_all");
    // });

    

  });
})();

(function () {
  $(document).ready(function () {

    $('.nested-list-wrapper').on("click","li", function () {
      console.log('click li');

      $('.jstree-children .jstree-anchor')
        .each(function () {
          var replace = "Github (https://github.com/ticketmaster-api/sdk-java)",
            byMe = '<a href="https://github.com/ticketmaster-api/sdk-java">Github</a>';

          if ($(this).attr('href') === '#') {
            //console.log("me", $(this).text());

            var newMe = $(this)
                .html($(this).html().replace(replace, byMe))
                .replaceWith("<span class=" + $(this).attr('class') + ">" + $(this).html() + "</span>")
              ;

            //console.log("newMe", newMe);
          }

        });

      $('.jstree-anchor').on("click", "a", function (event) {
        //document.location.href = this;
        if(event.target.tagName === 'A' && event.target.href !== '#'){
          console.log("target = " + event.target.href + ", this=" + this.tagName);
          document.location.href = event.target.href;
        }
      });
    });


    
  })
  })();
  