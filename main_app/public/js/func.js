$(document).ready(function(){

	var ratings = $('.shop-rating');
	if(ratings.length){
		ratings.each(function(index, elem){
			console.log("hello");
			var $elem = $(elem), score = $elem.html();
			var settings = {
					starHalf      : '/img/Coffeebean_ratings/filled_halfbean.png',
					starOff       : '/img/Coffeebean_ratings/unfilled_wholebean.png',
					starOn        : '/img/Coffeebean_ratings/filled_wholebean.png',
					score         :score
				};
			$elem.html("").removeClass('raw-rating').raty(settings);
		});
		
	}

});