const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { reviewSchema } = require("../schema");
const Listing = require("../models/listings");
const Review = require("../models/review");
const {isLoggedIn, isAuthor} = require("../middleware");

const reviewController = require("../controllers/reviews");

// CREATE REVIEW
router.post(
  "/",
  isLoggedIn,
  wrapAsync(reviewController.createReview)
);

// DELETE REVIEW
router.delete(
  "/:reviewId",
  isLoggedIn,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
