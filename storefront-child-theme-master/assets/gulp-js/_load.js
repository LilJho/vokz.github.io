/**
* Header
*/

$(document).ready(function(){

	//Menu Event
	$menuli.addClass('go');
	
	$('.hasHover').mouseover(function(){
		var arr = $(this).attr("src").split('.');
		$(this).attr("src",arr[0]+'_hover.'+arr[1]);
	});

	$('.hasHover').mouseleave(function(){
		var arr = $(this).attr("src").split('.');
		$(this).attr("src",arr[0].replace('_hover','')+'.'+arr[1]);
	});
	
	$navicon.click(function(){
		$menuli.toggleClass('go');
		$(this).toggleClass('open');
		$header.toggleClass('slide-open').fade();
	});
	
});

$(window).resize(function() {
	if($(window).width() < 990){
		$menuli.removeClass('go');
	}
	else{
		$header.removeClass('slide-open');
		$navicon.removeClass('open');
		$menuli.addClass('go');
	}
});

//$(window).bind('scroll', function () {
//	if ($(window).scrollTop() > num) {
//		$('header').animate().addClass('fixed');
//		$('.bannerArea').css('margin-top',$('header').height());
//	} else {
//		$('header').animate().removeClass('fixed');
//		$('.bannerArea').css('margin-top','0');
//	}
//});
