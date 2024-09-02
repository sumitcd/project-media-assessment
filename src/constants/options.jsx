// Travel Options
export const SelectTravelesList=[
    {
        id:1,
        title:'Going solo',
        desc:'A sole traveles in exploration',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'Partner',
        desc:'Travel with your love one',
        icon:'💞',
        people:'2 People'
    },
    {
        id:3,
        title:'Family',
        desc:'Family trips made easy and unforgettable.',
        icon:'👪',
        people:'3 to 5 People'
    },
    {
        id:4,
        title:'Friends',
        desc:'Group adventures, effortlessly planned.',
        icon:'🚤',
        people:'5 to 10 People'
    }
]

// Budget Options
export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
    {
        id:2,
        title:'Moderate',
        desc:'Travel with your love one',
        icon:'💴',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Dont worry about cost',
        icon:'💰',
    }
]

// AI PROMPT
export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {noOfPeople} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 3 days with each day plan with best time to visit in JSON format. In json format'