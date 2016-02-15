function onExpandNodeClick() {
    var expandLink = this;

    var container = $(this).siblings(".expand-container");
    container.slideToggle({
        duration: "fast",
        complete: function () {
            if ($(this).is(":visible")) {
                $(expandLink).removeClass("collapsed").addClass("expanded");
            } else {
                $(expandLink).removeClass("expanded").addClass("collapsed");
            }
        }
    });

    return false;
}

$("a.expand-link.contains-children-true").click(onExpandNodeClick);
