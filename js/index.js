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



//donations
var amount;
var reach;

var x = $(window).width() - 400;

$('.donate form').on("click", function(){
  amount = $('input[name=amount]:checked', '#donAmount').val();
  reach = amount * 22;
  $('#confirm .amount').text("$" + amount);
  $('#check span').text("$" + amount);
  $('#confirm strong').text(reach + " voters");
});

$(".donate button").on("click", function(){
  $(".donate").toggleClass("active");
  if( $(".donate").is(".active") ) {
    $("form").slideDown(450, "easeOutQuart");
  } else {
    $("form").slideUp(300, "easeInOutQuad");
  }
});

$('.donate label').on("click", function(){
  setTimeout(function() {
    if (amount == "other"){
      $("#custom").css("margin-left", x/2);
$("#custom").css("margin-right", x/2);
      $('body').addClass('custom');
    	$(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    		$("#custom").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
    	});
  	} else {
      $('body').removeClass('custom');
    	$(".donate").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    		$("#details").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
  		});
  	}
  }, 150);
});

$('#custom .next').on("click", function(){
  amount = $('input[name=custom-amount]', '#customDonation').val();
  reach = amount * 22;
  $('#confirm .amount').text("$" + amount);
  $('#check span').text("$" + amount);
  $('#confirm strong').text(reach + " voters");
  $("#custom").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $("#details").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
  });
});

$('#custom .back').on("click", function(){
  $("#custom").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $(".donate").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
});

$('#details .next').on("click", function(){
  console.log(amount);
  $("#details").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $("#card").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
  });
});

$('#details .back').on("click", function(){
  
  if ( $('body.custom').length > 0 ){
      $("#details").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $("#custom").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
  } else {
      $("#details").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $(".donate").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
  });
  }
  
});

$('#card .next').on("click", function(){
  $("#card").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
  });
});

$('#card .back').on("click", function(){
  $("#card").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $(".details").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
	});
});

$('#card .next').on("click", function(){
  $("#card").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $("#check").show("slide", { easing: "easeOutQuart", direction: "right" }, 700);
  });
});

$('#check .back').on("click", function(){
  $("#check").hide("slide", { easing: "easeInQuart", direction: "right" }, 700, function(){
    $("#card").show("slide", { easing: "easeOutQuart", direction: "left" }, 700);
	});
});

$("#check .next").on('click', function(){
  $("#check").hide("slide", { easing: "easeInQuart", direction: "left" }, 700, function(){
    $(".processing").fadeIn(1500, function(){
      $(".progress").animate({ width: "14em" }, 3500, "easeInOutCirc", function() {
        $( ".mask" ).hide("slide", { easing: "easeInQuart", direction: "right" }, 400);
      });
    });
  });
  
	setTimeout(function() {
		$('.processing .message, .outer').fadeOut();
  	$("#confirm").addClass('animated fadeInUp');
	}, 6250);
});

/* Caroline End */


/* Caylee Start */

