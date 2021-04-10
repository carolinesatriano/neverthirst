jQuery(function($) {
  
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
  
  });

  $('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
  
    {
      duration: 2000,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
        //alert('finished');
      }
    });  
  });

  var checkBox = document.getElementById("myCheck");
  const body = document.querySelector("body");
  checkBox.addEventListener("click", function () {
    body.classList.toggle("dark");
  });
