const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.indexListing = async (req, res) => {
    const { category, search } = req.query;

    let query = {};

    // If category filter applied
    if (category) {
        query.category = category;
    }

    // If search applied
    if (search) {
        const regex = new RegExp(search, "i");
        query.$or = [
            { title: regex },
            { location: regex },
            { country: regex },
            { category: regex }
        ];
    }

    // Fetch results using dynamic query
    const allListings = await Listing.find(query);

    // suggestions (optional)
    let suggestions = [];
    if (search) {
        const regex = new RegExp("^" + search, "i");
        const result = await Listing.find(
            { location: regex },
            { location: 1, _id: 0 }
        ).limit(5);

        suggestions = [...new Set(result.map(r => r.location))];
    }

    res.render("listings/index", {
        allListings,
        searchQuery: search || "",
        suggestions,
        category: category || ""
    });
};


module.exports.newListing = (req, res) => {
    res.render('listings/new');
};

module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            },
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "listing you requested for does not exits");
        return res.redirect('/listings');
    }
    console.log(listing);
    return res.render('listings/show', { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response= await geocodingClient.forwardGeocode({
  query: req.body.listing.location,
  limit: 1,
})
  .send();
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = response.body.features[0].geometry;  
    await newListing.save();
    req.flash("success", "new listing created!!");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "listing you requested for does not exist!");
        res.redirect("/listings");
    }

    let originalImage = listing.image.url;
    originalImage=originalImage.replace("/upload","/upload/,w_250");
    res.render('listings/edit.ejs', { listing ,originalImage});
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== 'undefined') {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    req.flash("success", "listing updated!!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success", "listing deleted!!");
    res.redirect('/listings');
    console.log('Deleted listing:', deletedlisting);
};
