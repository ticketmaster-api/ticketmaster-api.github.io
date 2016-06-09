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

    $('.nested-list-wrapper').on("click","li", function () {

      $('.jstree-children .jstree-anchor')
        .each(function () {
          var replace = "Github (https://github.com/ticketmaster-api/sdk-java)",
            byMe = '<a href="https://github.com/ticketmaster-api/sdk-java">Github</a>';

          if ($(this).attr('href') === '#') {            $(this)
            .html($(this).html().replace(replace, byMe))
            .replaceWith("<span class=" + $(this).attr('class') + ">" + $(this).html() + "</span>")
          ;
          }
        });

      $('.jstree-anchor').on("click", "a", function (event) {
        //document.location.href = this;
        if(event.target.tagName === 'A' && event.target.href !== '#'){
          document.location.href = event.target.href;
        }
      });
    });


  });
})();

  