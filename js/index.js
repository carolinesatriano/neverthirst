/* Caroline Start */
var lastScrollTop = 0;

//This is to get the appearing text
jQuery(document).ready(function($) {
  
    // Function which adds the 'animated' class to any '.animatable' in view
    var doAnimations = function() {
      
      // Calc current offset and get all animatables
      var offset = $(window).scrollTop() + $(window).height(),
          $animatables = $('.animatable');
      
      // Check all animatables and animate them if necessary
          $animatables.each(function(i) {
         var $animatable = $(this);
        
        // Items that are "above the fold"
              if (($animatable.offset().top + $animatable.height() + 60) < offset) {
          
          // Item previously wasn't marked as "above the fold": mark it now
          if (!$animatable.hasClass('animate-in')) {
            $animatable.removeClass('animate-out').css('top', $animatable.css('top')).addClass('animate-in');
          }
  
              }
        
        // Items that are "below the fold"
        else if (($animatable.offset().top + $animatable.height() + 40) > offset) {
          
          // Item previously wasn't marked as "below the fold": mark it now
          if ($animatable.hasClass('animate-in')) {
            $animatable.removeClass('animate-in').css('top', $animatable.css('top')).addClass('animate-out');
          }
  
        }
  
      });
  
      };
    
    // Hook doAnimations on scroll, and trigger a scroll
    $(window).on('scroll', doAnimations);
    $(window).trigger('scroll');

    //This is to get the count up for the numbers
    $("span.counter").counterUp({
        delay: 40, /* The delay in milliseconds per number count up */
        time: 1000, /*The total duration of the count up animation */
        offset: 80, 
        /*The viewport percentile from which the counter starts (by default it's 100, meaning it's triggered at the very moment the element enters the viewport) */
    });
  
  });

//This is for the water drop scroll progress
function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}
  
window.onscroll = function () {
    progressBarScroll();
};

//This is for subscribe button
$('.subscribe-button').click(function(){
	$('.subscribe-button').html('<i class="fas fa-spinner fa-spin"></i>');
	$('.subscribe-button').addClass("iconize");
	$('input').attr("disabled", "true");
	setTimeout(function(){
	$('.subscribe-button').html('<i class="fas fa-hand-holding-water"></i>');
	}, 1000);
});

//for 80 percent circle 
function radial_animate() { 
  $('svg.radial-progress').each(function( index, value ) { 

      $(this).find($('circle.bar--animated')).removeAttr( 'style' );    
      // Get element in Veiw port
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight();
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      
      if(elementBottom > viewportTop && elementTop < viewportBottom) {
          var percent = $(value).data('countervalue');
          var radius = $(this).find($('circle.bar--animated')).attr('r');
          var circumference = 2 * Math.PI * radius;
          var strokeDashOffset = circumference - ((percent * circumference) / 100);
          $(this).find($('circle.bar--animated')).animate({'stroke-dashoffset': strokeDashOffset}, 2800);
      }
  });
}
// To check If it is in Viewport 
var $window = $(window);
function check_if_in_view() {    
  $('.countervalue').each(function(){
      if ($(this).hasClass('start')){
          var elementTop = $(this).offset().top;
          var elementBottom = elementTop + $(this).outerHeight();

          var viewportTop = $(window).scrollTop();
          var viewportBottom = viewportTop + $(window).height();

          if (elementBottom > viewportTop && elementTop < viewportBottom) {
                    $(this).removeClass('start');
                    $('.countervalue').text();
                    var myNumbers = $(this).text();
                    if (myNumbers == Math.floor(myNumbers)) {
                        $(this).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 2800,
                            easing: 'swing',
                            step: function(now) {
                                $(this).text(Math.ceil(now)  + '%');                                
                            }
                        });
                    } else {
                        $(this).animate({
                            Counter: $(this).text()
                        }, {
                            duration: 2800,
                            easing: 'swing',
                            step: function(now) {                                
                                $(this).text(now.toFixed(2)  + '$'); 
                            }
                        });
                    }

                    radial_animate();
                }
      }
  });
}

$window.on('scroll', check_if_in_view);
$window.on('load', check_if_in_view);



/* Caroline End */


/* Caylee Start */

