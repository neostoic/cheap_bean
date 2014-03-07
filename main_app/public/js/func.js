$(document).ready(function(){

	var ratings = $('.shop-rating');
	if(ratings.length){
		ratings.each(function(index, elem){
			console.log("hello");
			var $elem = $(elem), score = $elem.html();
			var settings = {
				    starHalf      : '/img/fse.png',
				    starOff       : '/img/unfilled.png',
				    starOn        : '/img/filled.png',
				    score         :score
				};
			$elem.html("").removeClass('raw-rating').raty(settings);
		});
		
	}

});