const Notelisting = require("./models/listing.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema} = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //redirect URL
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create listing!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl = req.session.redirectUrl;
  }else{
    res.locals.redirectUrl = "/listings";
  }
  next();
};

module.exports.validatedListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(result);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); // IMPORTANT
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

module.exports.isOwner = async(req,res,next)=>{
  let{id} = req.params;
  let listing = await Notelisting.findById(id);
  if(!listing.owner.equals(res.locals.currUser._id)){
    req.flash("error","You are not the Owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.filterListingsByOwner = async (req, res, next) => {
  try {
    const userId = req.user._id;
    // console.log(req.user);
    const userListings = await Notelisting.find({ owner: userId });
    res.locals.userListings = userListings;
    next();
  } catch (error) {
    console.error("Error filtering listings by owner:", error);
    req.flash("error", "Something went wrong while fetching your listings");
    res.redirect("/listings");
  }
};

