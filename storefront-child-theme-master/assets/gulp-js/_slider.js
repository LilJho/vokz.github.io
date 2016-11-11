$(function($){
	
	
	
	var autoplaySlide = setInterval(function() {autoPlay()},5000);

	$('.sliderImg').hover(function(){
		clearInterval(autoplaySlide);
	},function() {
		autoplaySlide = setInterval(function() {autoPlay()}, 5000);
	});
	
	start_slider();
	
	$('.sliderImg').width($imgcount*$slide.width());

	for(i=1;i<=$imgcount;i++){
		if($('.sliderImg li:nth-child('+i+')').hasClass('active')){
			$bullets.append("<li class='active'><div class='circle'></div></li>");
		}
		else{
			$bullets.append("<li><div class='circle'></div></li>");
		}
	}

	$rightNav.click(function(e){
		var item_width = $('.sliderImg li').width();
		var left_indent = parseInt($slide.css('left')) - item_width;

		//$('.sliderImg li.active').prev().removeClass('active');
		if($('.sliderImg li.active').is(':last-child')){
			$slide.animate({'left' : '0'},{queue:false, duration:800});
			$('.sliderImg li:first-child').addClass('active').siblings().removeClass('active');
			$('.navBullets li:first-child').addClass('active').siblings().removeClass('active');
		}
		else{
			$('.sliderImg li.active').next().addClass('active').siblings().removeClass('active');
			$('.navBullets li.active').next().addClass('active').siblings().removeClass('active');
			$slide.animate({'left' : left_indent},{queue:false, duration:800});
		}
	});

	$leftNav.click(function(e){
		var item_width = $('.sliderImg li').width();
		var right_indent = parseInt($slide.css('left')) - item_width*($imgcount-1);
		var left_indent = parseInt($slide.css('left')) + item_width;

		if($('.sliderImg li.active').is(':first-child')){
			$slide.animate({'left' : right_indent},{queue:false, duration:800});
			$('.sliderImg li:last-child').addClass('active').siblings().removeClass('active');
			$('.navBullets li:last-child').addClass('active').siblings().removeClass('active');
		}
		else{
			$('.sliderImg li.active').prev().addClass('active').siblings().removeClass('active');
			$('.navBullets li.active').prev().addClass('active').siblings().removeClass('active');
			$slide.animate({'left' : left_indent},{queue:false, duration:800});
		}
	});
	function start_slider(){
		$('.navBullets li').click(function(e){
			var item_width = $('.sliderImg li').width();

			if($('.sliderImg li.active').is(':first-child')){
				var currentIndex = $(this).index();
				var left_indent = parseInt($('.sliderImg li').css('left')) - item_width*currentIndex;
				$('.sliderImg li:eq('+currentIndex+')').addClass('active').siblings().removeClass('active');
				$('.navBullets li:eq('+currentIndex+')').addClass('active').siblings().removeClass('active');
				$slide.animate({'left' : left_indent},{queue:false, duration:800});
			}
			else if($('.sliderImg li.active').is(':last-child')){
				var currentIndex = $(this).index()+1;
				var left_indent = parseInt($('.sliderImg li').css('left')) + (item_width*($imgcount-currentIndex));
				$('.sliderImg li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
				$('.navBullets li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
				$slide.animate({'left' : left_indent},{queue:false, duration:800});
			}
			else{
				var currentIndex = $('.sliderImg li.active').index()+1;
				var targetIndex = $(this).index()+1;
				if(targetIndex<currentIndex){
					var left_indent = parseInt($('.sliderImg li').css('left')) + (item_width*(currentIndex-targetIndex));
					$('.sliderImg li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
					$('.navBullets li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
					$slide.animate({'left' : left_indent},{queue:false, duration:800});
				}
				else{
					var left_indent = parseInt($('.sliderImg li').css('left')) - (item_width*(targetIndex-currentIndex));
					$('.sliderImg li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
					$('.navBullets li:eq('+$(this).index()+')').addClass('active').siblings().removeClass('active');
					$slide.animate({'left' : left_indent},{queue:false, duration:800});
				}
			}
		});
	};

	function autoPlay(){
		var item_width = $('.sliderImg li').width();
		var left_indent = parseInt($slide.css('left')) - item_width;
		if($('.sliderImg li.active').is(':last-child')){
			$slide.animate({'left' : '0'},{queue:false, duration:800});
			$('.sliderImg li:first-child').addClass('active').siblings().removeClass('active');
			$('.navBullets li:first-child').addClass('active').siblings().removeClass('active');
		}
		else{
			$('.sliderImg li.active').next().addClass('active').siblings().removeClass('active');
			$('.navBullets li.active').next().addClass('active').siblings().removeClass('active');
			$slide.animate({'left' : left_indent},{queue:false, duration:800});
		}
	};
});