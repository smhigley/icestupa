// Don't break on browsers without console.log();
try { console.assert(1); } catch(e) { console = { log: function() {}, assert: function() {} }; }

(function($) {

  $('.photo-gallery').magnificPopup({
    delegate: 'a',
    gallery: {
      enabled: true
    },
    type: 'image',
    image: {
      titleSrc: 'data-caption',
      tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
    },
    midClick: true,
    removalDelay: 300,
    mainClass: 'animate-popup',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup 
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-anim');
      }
    },
  });

  $('.featured-image').magnificPopup({
    delegate: 'a',
    type: 'image',
    image: {
      titleSrc:  function(item) {
        return $(item.el).siblings('img').attr('alt');
      },
      tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
    },
    midClick: true,
    removalDelay: 300,
    mainClass: 'animate-popup',
    callbacks: {
      beforeOpen: function() {
        // just a hack that adds mfp-anim class to markup 
        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-anim');
      }
    },
  });

  // mobile menu
  if ( Modernizr.mq('only screen and (max-width:600px)')) {

    $('.menu-trigger').on('click', function(e) {
      e.preventDefault();
      $(this).parents('.main-menu').toggleClass('open');
    });

    $('.main-menu').find('.dropdown').each(function() {
      var $dropdown = $(this),
          dropdown_height = $dropdown.height();

      $dropdown.data('height', dropdown_height).css('height', 0);
    });
    $('.main-menu').on('click', '.has-dropdown > a', function(e) {
      console.log("clicked dropdown trigger");
      e.preventDefault();
      var $trigger = $(this),
          $dropdown = $trigger.siblings('.dropdown');
      if ($trigger.hasClass('open')) {
        $trigger.removeClass('open');
        $dropdown.css('height', 0);
      } else {
        $trigger.addClass('open');
        $dropdown.css('height', $dropdown.data('height'));
      }
    });
  } else {
    // handle dropdowns on touch
    $('.touch .main-menu').on('click', '.has-dropdown > a', function(e) {
      e.preventDefault();
      if( $(this).hasClass('open') ) {
        $(this).removeClass('open');
      } else {
        $('.main-menu a').removeClass('open');
        $(this).addClass('open');
      }
    });
  }


}(jQuery));

