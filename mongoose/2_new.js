/* Data entry into model
================================*/
var  = new nest_model({ 	
	company_name: "Balzac's Coffee Roasters",
	website: 'www.balzacs.com',
	chain: true,
	date: {
		date_added: { type: Date, default: Date.now}, //come up with right logic
		date_lastupdated: { type: Date, default: Date.now},		
		},
	rating: {
		yelp_rating: 3.5,
		yelp_reviews: 25,
		user_rating: null,
		},
	locations: {
		location_number: 1,
		location_name: 'Liberty Village',
		address: '43 Hanna Ave, Toronto',
		phone: '(416)534-7372', 
		hours: {
			Monday: '7:00 AM - 7:00 PM',
			Tuesday: '7:00 AM - 7:00 PM',
			Wednesday: '7:00 AM - 7:00 PM',
			Thursday: '7:00 AM - 7:00 PM',
			Friday: '7:00 AM - 7:00 PM',
			Saturday: '9:00 AM - 7:00 PM',
			Sunday: '9:00 AM - 7:00 PM',
			},
	drinks: {
		drink: 'Americano',
			sizes: {
				small: 2.40,
				medium: 2.60,
				large: 3.10,
				}
			}
		}
});
console.log(manic);
