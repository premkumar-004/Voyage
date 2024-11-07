const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    let errMsg = "Some error occured";
    // errMsg = error.details.map((el) => el.message).join(",");]
    if (error) {
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
}

//Index Route
router.get("/", wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
}))

//New create route
router.get("/new", (req, res) => {
    res.render("./listings/new.ejs");
})

//show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
        req.flash("error", "Listing Donot Exists!");
        res.redirect("/listings");
    }
    res.render("./listings/show.ejs", { listing });
}))

//create route
router.post("/", validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
}));


//Edit Update Route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    if (!listing) {
        req.flash("error", "Listing Donot Exists!");
        res.redirect("/listings");
    }
    const listing = await Listing.findById(id);
    res.render("./listings/edit.ejs", { listing });
}))

//update route
router.put("/:id", validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Updated Listing Successfully");
    res.redirect(`/listings/${id}`);
}))


//Delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}))


module.exports = router;