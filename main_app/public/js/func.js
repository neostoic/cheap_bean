$(document).ready(function(){

	var ratings = $('.shop-rating');
	if(ratings.length){
		ratings.each(function(index, elem){
			console.log("hello");
			var $elem = $(elem), score = $elem.html();
			var settings = {
				    starHalf      : '/img/30w_filled_half_bean.png',
				    starOff       : '/img/30w_unfilled_whole_bean.png',
				    starOn        : '/img/30w_filled_whole_bean.png',
				    score         :score
				};
			$elem.html("").removeClass('raw-rating').raty(settings);
		});
		
	}

});