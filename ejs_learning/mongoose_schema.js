/* Schema for mongoose. Unsure about support for multiple nested references
================================*/
var nest_schema = mongoose.Schema({
	company_name: String,
	website: String,
	chain: Boolean,
	date: {
		date_added: Date,
		date_lastupdated: Date,		
		},
	rating: {
		yelp_rating: Number,
		yelp_reviews: Number,
		user_rating: Number,
		},
	locations: {
		location_number: Number,
		location_name: String,
		address: String,
		phone: Number, 
		hours: {
			Monday: String,
			Tuesday: String,
			Wednesday: String,
			Thursday: String,
			Friday: String,
			Saturday: String,
			Sunday: String,
			},
	drinks: {
		drink: String,
			sizes: {
				small: Number,
				medium: Number,
				large: Number,
				}
			}
		}
});