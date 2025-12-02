const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require('../utils/wrapAsync');
const Review = require('../models/review.js');
const Listing = require('../models/listing.js'); // Assuming you have a Listing model defined in models/listing.js
const { validateReview, isLoggedIn,isReviewAuthor} = require('../middleware.js');
const reviewController = require("../controllers/reviews.js");

//post review route
router.post('/',isLoggedIn, validateReview, wrapAsync(reviewController.postReview));

//delete review route 
router.delete('/:reviewId',isLoggedIn,isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports= router;