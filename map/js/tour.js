// JavaScript Document
$(function () { 
		$('.tour_content ul.tour li:first-child').addClass('active');
		$('.tour_content article.tour_box:first').show();
		
		$('.tour_content ul.tour li a').click(function (f) { 
			var tour = $(this).parent().parent().parent().parent(), 
				index = $('ul.tour li').index($(this).parent());
			
			tour.find('ul.tour').find('li').removeClass('active');
			$(this).parent().addClass('active');
			
			tour.find('article.tour_box').not('article.tour_box:eq(' + index + ')').slideUp(300);
			tour.find('article.tour_box:eq(' + index + ')').slideDown(300);
			
			f.preventDefault();
		} );
	});
	
	
$(function () { 
		$('.tour_contentmaa ul.tours li:first-child').addClass('active');
		$('.tour_contentmaa article.tour_boxs:first').show();
		
		$('.tour_contentmaa ul.tours li a').click(function (f) { 
			var tours = $(this).parent().parent().parent().parent(), 
				index = $('ul.tours li').index($(this).parent());
			
			tours.find('ul.tours').find('li').removeClass('active');
			$(this).parent().addClass('active');
			
			tours.find('article.tour_boxs').not('article.tour_boxs:eq(' + index + ')').slideUp(300);
			tours.find('article.tour_boxs:eq(' + index + ')').slideDown(300);
			
			f.preventDefault();
		} );
	});


   
   $(window).load(function(){
      
	$("li.prod_hold").hover(function () {
	      								 
		$('.linkss', this).stop().animate({top:'0px'},{queue:false,duration:400});
		
	}, function () {
		
		$('.linkss', this).stop().animate({top:'-100%'},{queue:false,duration:260});
		
		
	});

 
});