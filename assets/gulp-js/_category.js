$(function($){
	var indent = $boxslideUL.width() / $boxslideUL.css('column-count');

	$( window ).resize(function() {
		indent = $boxslideUL.width() / $boxslideUL.css('column-count');
		$boxslideUL.animate({'right' : 0},{queue:false, duration:800});
		newIndent = 0;
	});

	$boxslideNavNext.click(function(e){
		var check = $boxslideUL.width() - indent;
		if (newIndent<check) {
			newIndent += indent;
			$boxslideUL.animate({'right' : newIndent},{queue:false, duration:800});
		}
	});

	$boxslideNavPrev.click(function(e){
		newIndent -= indent;
		if (newIndent>=0) {
			$boxslideUL.animate({'right' : newIndent},{queue:false, duration:800});
		}
		else{
			newIndent = 0;
		}
	});

	$(window).bind('scroll',function(e){
   		parallaxScroll();
   	});
 
   	function parallaxScroll(){
   		var scrolledY = $(window).scrollTop();
		$('.sectionBlockE').css('background-position','center -'+((scrolledY*0.2))+'px');
		$('.sectionBlockE h3').css('top','-'+((scrolledY*0.5))+'px');
		$('.sectionBlockE p').css('top','-'+((scrolledY*0.8))+'px');
   	}
});