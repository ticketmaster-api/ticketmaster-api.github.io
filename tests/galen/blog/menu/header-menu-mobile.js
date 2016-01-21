test("Home page test on mobile device", function () {
    var driver = createDriver("http://ticketmaster-api-staging.github.io/blogs",
                            "349x800",
                            "firefox"
    );

    var Blogs = $page("Blogs", {
        title: "title",
        closeButton: ".tm-close",
        burgerButton: "#menu-btn"

        /*load: function () {
            this.open("http://ticketmaster-api-staging.github.io/products-and-docs/apis/partner/");
            return this.waitToBeShown();
        }*/
    });

    var blogs = new Blogs(driver);
        blogs.burgerButton.click();

    blogs.closeButton.waitFor(function (button) {
        console.log('button.isDisplayed()' + button.isDisplayed());
        checkLayout({
            driver: driver,
            spec: "tests/galen/blog/menu/mobile-header-menu-open.gspec",
            tags: ["mobile"]
        });
        return button.isDisplayed();
    });

    /*GalenPages.wait( {time: "2s", period: "1s"}).untilAll({
        "closeButton should be shown": function () {
            console.log('blogs.closeButton.isDisplayed()' + blogs.closeButton.isDisplayed());

            checkLayout({
                driver: driver,
                spec: "tests/galen/blog/menu/mobile-header-menu-open.gspec",
                tags: ["mobile"]
            });

            return blogs.closeButton.isDisplayed();
        }
    });*/

});



/*
check local:
galen test tests/galen/blog/menu/header-menu-mobile.js --htmlreport tests/galen/reports/jsClick
 */
