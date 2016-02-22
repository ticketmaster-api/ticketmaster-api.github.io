(function(){
    $(document).ready(function(){

        var slider = $('#slider'),
            screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

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
            sliderInitializator(getResponsiveId(screenWidth));
        };

        // initializes slider
        var sliderInitializator = function(slidesToShow){
            slider.slick({ // initialize slide
                infinite: false,
                speed: 500,
                swipeToSlide: true,
                slidesToShow: slidesToShow,
                mobileFirst: true,
                dots: slidesToShow < 4
            });
        };

        // returns 1 if mobile; 2 if tablet and 4 if desktop (same as column number in slider)
        var getResponsiveId = function(width){
            if (width < 768){
                return 1;
            }
            else{
                if (width < 1200){
                    return 2;
                }
                else {
                    return 4;
                }
            }
        };

        initSlider();

    });
})();