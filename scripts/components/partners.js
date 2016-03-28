(function(){
    $(document).ready(function(){

        /*
        var slider = $('#slider');

        $('.show-more-link').on('click', function(e){
            e.preventDefault();
            var self = this,
                text = '';

            if ($(self).hasClass('expanded'))
                text = 'Show more information';
            else
                text = 'Hide';

            $(self).text(text);
            $(self).toggleClass('expanded');
            $(self).parent().parent().find('.show-more').toggleClass('expanded');
        });

        // calls slider initializator function with parameters defined by screen resolution
        var initSlider = function(){
            slider.slick({ // initialize slide
                infinite: true,
                centerMode: true,
                variableWidth: true,
                adaptiveHeight: true,
                dots: true
            });
        };

        initSlider();
        */

        function carouselSlider() {
            function checkSize() {
                if ($(".carousel-controls").css("z-index") == "1") {
                    return 200;
                }
                if ($(".carousel-controls").css("z-index") == "2") {
                    return 100;
                }
                return 250;
            }

            var numberSlides = 1;
            if (checkSize() == 100) numberSlides = 0;

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
        }

        carouselSlider();


    });
})();