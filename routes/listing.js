const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema");
const Listing = require("../models/listings");
const { isLoggedIn, isOwner } = require("../middleware");

const listingController = require("../controllers/listings");

const multer = require("multer");
const { storage } = require("../cloudConflict");
const upload = multer({ storage });

router
  .route("/")
  .get(listingController.index)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingController.createListing)
  );

//CREATE ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(listingController.showListing)
  .put(isLoggedIn, isOwner, listingController.updateListing)
  .delete(isLoggedIn, isOwner, listingController.destroyListing);

//EDIT ROUTE
router.get("/:id/edit", isLoggedIn, isOwner, listingController.editListing);

module.exports = router;
