const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review.js');

const CATEGORIES = [
  'Trending',
  'Rooms',
  'Iconic cities',
  'Mountains',
  'Castles',
  'Amazing pools',
  'Farms',
  'Camping',
  'Arctic',
  'Bed & breakfast',
  'Beach'
];


const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename: String
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    // creating review ONE TO MANY 
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: { 
            type: [Number],
            // required: true
        }
    },
     category: {
    type: String,
    enum: CATEGORIES,
    default: 'Trending',
    required: true
  }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const Listing = mongoose.model('Listing', listingSchema);   //collection name 
module.exports = Listing;
module.exports.CATEGORIES = CATEGORIES;