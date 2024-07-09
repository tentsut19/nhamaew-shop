// invoke the carousel
$('#myCarousel').carousel({
    interval: 3000
  });
  
  /* SLIDE ON CLICK */ 
  
  $('.carousel-linked-nav > li > a').click(function() {
  
      // grab href, remove pound sign, convert to number
      var item = Number($(this).attr('href').substring(1));
  
      // slide to number -1 (account for zero indexing)
      $('#myCarousel').carousel(item - 1);
  
      // remove current active class
      $('.carousel-linked-nav .active').removeClass('active');
  
      // add active class to just clicked on item
      $(this).parent().addClass('active');
  
      // don't follow the link
      return false;
  });
  
  /* AUTOPLAY NAV HIGHLIGHT */
  
  // bind 'slid' function
  $('#myCarousel').bind('slid', function() {
  
      // remove active class
      $('.carousel-linked-nav .active').removeClass('active');
  
      // get index of currently active item
      var idx = $('#myCarousel .item.active').index();
  
      // select currently active item and add active class
      $('.carousel-linked-nav li:eq(' + idx + ')').addClass('active');
  
  });