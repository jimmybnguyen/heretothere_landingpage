// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  $(window).on("scroll", function() {
    console.log("****************************************")
    var currentPos = $(window).scrollTop();
    $('.navbar-nav li a').each(function() {
      var sectionLink = $(this);
      // console.log("sectionLink")
      // console.log(sectionLink)
      // capture the height of the navbar
      var navHeight = $('#nav-wrapper').outerHeight() + 1;
      //console.log("navHeight: " + navHeight)
      var section = $(sectionLink.attr('href'));
      //console.log("section:")
      //console.log(section)
      // subtract the navbar height from the top of the section
      console.log(section)
      console.log ("navHeight: " + navHeight)
      console.log(section.position().top - navHeight)
      console.log("currentPos: " + currentPos)
      console.log("sectionLink: " + sectionLink.offset().top + section.height()> currentPos)
      if(section.position().top - navHeight <= currentPos && sectionLink.offset().top + section.height()> currentPos) {
        $('.nav li').removeClass('active');
        sectionLink.parent().addClass('active');
      } else if (section.position().top - navHeight >= 3000 && currentPos + 500 >= section.position().top - navHeight) {
        $('.nav li').removeClass('active');
        sectionLink.parent().addClass('active');
      } else {
        sectionLink.parent().removeClass('active');
      }
    });        
  });