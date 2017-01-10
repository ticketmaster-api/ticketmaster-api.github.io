(function(){
    $(document).ready(function(){

        function checkSize() {
            if ($(".carousel-controls").css("z-index") == "1") {
                return 200;
            }
            if ($(".carousel-controls").css("z-index") == "2") {
                return 100;
            }
            return 250;
        }

        var  numberSlides = checkSize() == 100 ?  0 : 1;

        var carousel = $("#carousel").waterwheelCarousel({
            separation: checkSize(),
            flankingItems: numberSlides,
            sizeMultiplier: 0.5,
            opacityMultiplier: 0.3,
            // autoPlay: 5500,
            // speed: 700
        });

        $(".carousel-controls .carousel-prev").on("click", function () {
            carousel.prev();
        });

        $(".carousel-controls .carousel-next").on("click", function () {
            carousel.next();
        });


        $(window).resize(function() {
            var  numberSlides = checkSize() == 100 ?  0 : 1;
            carousel.reload({
                separation: checkSize(),
                flankingItems: numberSlides,
                sizeMultiplier: 0.5,
                opacityMultiplier: 0.3,
            });
        });


    });
})();
