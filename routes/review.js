const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reveiwController = require("../controllers/reviews.js");

//Review / Comments Route
router.post("/", isLoggedIn, validateReview, wrapAsync(reveiwController.createReview));

//Review Deletion
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reveiwController.destroyReview));

module.exports = router;