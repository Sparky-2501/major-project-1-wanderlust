const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const Listing = require('../models/listing.js'); // Assuming you have a Listing model defined in models/listing.js
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require("../controllers/listings.js");
const multer= require('multer');
const {storage}= require('../cloudConfig.js');
const upload = multer({storage});

// index route && create route
router
    .route("/")
    .get(wrapAsync(listingController.indexListing))
    .post(isLoggedIn,upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing));
    
//new route

router.get('/new', isLoggedIn, listingController.newListing);

//update route && delete route  show route
router
    .route("/:id")
    .put(isLoggedIn, isOwner,upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
    .get(wrapAsync(listingController.showListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


//edit route
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.editListing));

module.exports = router;

