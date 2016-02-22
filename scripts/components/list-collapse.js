(function () {
    $(document).ready(function () {

        $('.nested-list').wrap("<div class='nested-list-wrapper'></div>");

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
                "plugins" : ["state"] // activate the state plugin on this instance
            });

    });
})();