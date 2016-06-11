(function () {
  $(document).ready(function () {
    var $nestedLists = $('.nested-list');

    $nestedLists.wrap("<div class='nested-list-wrapper'></div>");

    $('.nested-list-wrapper')
      .on('select_node.jstree', function (event, data) {
        data.instance.toggle_node(data.node); //set open on one click
      })
      .on("click", "a", function (event) {
        if(event.target.tagName === 'A' && event.target.href !== '#'){
          document.location.href = event.target.href;
        }
      })
      .jstree({
        "core": {
          "themes": {
            "dots": true // no connecting dots between dots
          }
        },
        "plugins": [] // activate the state plugin on this instance
      })
    ;

    /*set open list in 'changelog page' on page ready*/
    // var $changelog = $('.changelog'),
    //     $listInsideChangelog = $('.nested-list-wrapper', $changelog);
    // $listInsideChangelog.on('ready.jstree', function() {
    //     $listInsideChangelog.jstree("open_all");
    // });

  });
})();

  