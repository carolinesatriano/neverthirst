/* Caroline Start */
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
              if (($animatable.offset().top + $animatable.height() + 50) < offset) {
          
          // Item previously wasn't marked as "above the fold": mark it now
          if (!$animatable.hasClass('animate-in')) {
            $animatable.removeClass('animate-out').css('top', $animatable.css('top')).addClass('animate-in');
          }
  
              }
        
        // Items that are "below the fold"
        else if (($animatable.offset().top + $animatable.height() + 50) > offset) {
          
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
        offset: 100, 
        /*The viewport percentile from which the counter starts (by default it's 100, meaning it's triggered at the very moment the element enters the viewport) */
    });
  
  });

//Cant remember what this is for...may need to remove
  /*var checkBox = document.getElementById("myCheck");
  const body = document.querySelector("body");
  checkBox.addEventListener("click", function () {
    body.classList.toggle("dark");
  });*/

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
/* Caroline End */


/* Caylee Start */

