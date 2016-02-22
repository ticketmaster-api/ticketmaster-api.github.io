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


        var hoveredCssClass = 'hovered',
            listContainer = $('.jstree-container-ul');

        function toggleIconClass(toggle) {
            var iconElement,
                me = $(this);

            if (me.is('a')) {
                iconElement = me.prev('i');
            } else {
                iconElement = me.next('a');
            }

            if (toggle) {
                iconElement.addClass(hoveredCssClass);
            } else {
                iconElement.removeClass(hoveredCssClass);
            }
        };


        //hover on a
        listContainer
            .on({
                mouseenter: function (e) {
                    toggleIconClass.call(this, true);
                },
                mouseleave: function (e) {
                    toggleIconClass.call(this, false);
                },
                touchend: function (e) {
                    toggleIconClass.call(this, false);
                }
            }, 'i');


        //hover on icon
        listContainer
            .on({
                mouseenter: function (e) {
                    toggleIconClass.call(this, true);
                },
                mouseleave: function (e) {
                    toggleIconClass.call(this, false);
                },
                touchend: function (e) {
                    toggleIconClass.call(this, false);
                }
            }, 'a');


    });
})();