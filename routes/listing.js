const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

//Index Route
//create route
router.route("/")
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(upload.single('listing[image]'), (req, res) => {
        res.send(req.file);
    });

//New create route
//Put above /:id other wise /new will be treated as an id and this route will not work
router.get("/new", isLoggedIn, listingController.renderNewForm);


//show route
//update route
//Delete route
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));




//Edit Update Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;