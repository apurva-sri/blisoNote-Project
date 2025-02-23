const wrapAsync = require("../utils/wrapAsync.js");
const express = require("express");
const listingController = require("../controllers/listing.js");
const { validatedListing, isLoggedIn, isOwner, filterListingsByOwner } = require("../middlerware.js");
const router = express.Router();

router
  .route("/")
  .get(isLoggedIn,filterListingsByOwner,wrapAsync(listingController.index)) //index.ejs
  .post(isLoggedIn, validatedListing, listingController.createListing); //new.ejs, Create, post res from New.ejs

router.get("/new", isLoggedIn, listingController.renderNewForm); // Create, get req from index.ejs

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //show.ejs
  .put(// res from edit.ejs, Edit
    isLoggedIn,
    isOwner,
    validatedListing,
    wrapAsync(listingController.updateListing)
  ) 
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // delete

//edit.ejs
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
