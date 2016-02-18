(function () {
    $(document).ready(function () {

        $('.nested-list').wrap("<div class='nested-list-wrapper'></div>");
        $('.jstree-themeicon').remove(); //remove needless icon element

        $('.nested-list-wrapper')
            .on('before_open.jstree', function () {
                $('.jstree-themeicon').remove(); //remove needless element
            })
            .on('select_node.jstree', function (e, data) {
                data.instance.toggle_node(data.node); //set open on one click
            })
            .jstree({
                "core": {
                    "themes": {
                        "dots": true // no connecting dots between dots
                    },
                    "dblclick_toggle": false
                },
                "plugins": ["state"] // activate the state plugin on this instance
            });


        var hoveredCssClass = 'hovered';

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

        /*hover on a*/
        $('.jstree-container-ul')
            .on({
                mouseenter: function () {
                    toggleIconClass.call(this, true);
                },
                mouseleave: function () {
                    toggleIconClass.call(this, false);
                }
            }, 'i');


        /*hover on icon*/
        $('.jstree-container-ul')
            .on({
                mouseenter: function () {
                    toggleIconClass.call(this, true);
                },
                mouseleave: function () {
                    toggleIconClass.call(this, false);
                }
            }, 'a');


    });
})();