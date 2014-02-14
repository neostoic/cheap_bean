//Single document dump from mongo database, use for test purposes. 
var test = {
  company_name: "Balzac's Coffee Roasters",
  website: "www.balzacs.com",
  chain: true,
  _id: ObjectId("52fe5975fce2afac4d287e86"),
  drinks: [
    {
      sizes: {
        large: 3.1,
        medium: 2.6,
        small: 2.4
      },
      drink: "Americano"
    },
    {
      sizes: {
        large: 2.8,
        medium: 2.1,
        small: 3.4
      },
      drink: "Cappucino"
    }
  ],
  locations: [
    {
      hours: {
        Sunday: "8:00 AM - 7:00 PM",
        Saturday: "7:00 AM - 8:00 PM",
        Friday: "7:00 AM - 8:00 PM",
        Thursday: "7:00 AM - 8:00 PM",
        Wednesday: "7:00 AM - 8:00 PM",
        Tuesday: "7:00 AM - 8:00 PM",
        Monday: "7:00 AM - 8:00 PM"
      },
      phone: "(416)207-1709",
      address: "1 Trinity Street, Toronto",
      location_name: "Distillery District",
      location_number: 1
    },
    {
      hours: {
        Sunday: "9:00 AM - 7:00 PM",
        Saturday: "8:00 AM - 7:00 PM",
        Friday: "7:00 AM - 7:00 PM",
        Thursday: "7:00 AM - 7:00 PM",
        Wednesday: "7:00 AM - 7:00 PM",
        Tuesday: "7:00 AM - 7:00 PM",
        Monday: "7:00 AM - 7:00 PM"
      },
      phone: "(416)534-7372",
      address: "43 Hanna Ave, Toronto",
      location_name: "Liberty Village",
      location_number: 2
    },
    {
      hours: {
        Sunday: "10:00 AM - 5:00 PM",
        Saturday: "10:00 AM - 5:00 PM",
        Friday: "7:00 AM - 9:00 PM",
        Thursday: "7:00 AM - 9:00 PM",
        Wednesday: "7:00 AM - 9:00 PM",
        Tuesday: "7:00 AM - 9:00 PM",
        Monday: "7:00 AM - 9:00 PM"
      },
      phone: "(416)597-1700",
      address: "122 Bond Street, Toronto",
      location_name: "Ryerson Image Arts",
      location_number: 3
    },
    {
      hours: {
        Sunday: "9:00 AM - 4:00 PM",
        Saturday: "8:00 AM - 5:00 PM",
        Friday: "7:00 AM - 7:00 PM",
        Thursday: "7:00 AM - 8:30 PM",
        Wednesday: "7:00 AM - 8:30 PM",
        Tuesday: "7:00 AM - 8:30 PM",
        Monday: "7:00 AM - 8:30 PM"
      },
      phone: "(416)922-3700",
      address: "789 Yonge Street, Toronto",
      location_name: "Toronto Reference Library",
      location_number: 4
    }
  ],
  rating: {
    yelp_rating: 3.5,
    yelp_reviews: 25,
    user_rating: null
  },
  date: {
    date_lastupdated: ISODate("2014-02-14T17:59:17.000Z")
  },
  __v: 0}