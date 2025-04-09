const Notelisting = require("../models/listing.js");

module.exports.index = async (req, res) => {
  try {
    const userListings = res.locals.userListings || [];
    res.render("./listings/index.ejs", {
      allListings: userListings,
      showFooter: true,
    });
  } catch (error) {
    req.flash("error", "Cannot fetch listings");
    res.redirect("/listings");
  }
};

module.exports.renderNewForm = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.createListing = async (req, res) => {
  const newListing = new Notelisting({
    title: req.body.listing.title,
    content: req.body.listing.content,
    // date: new Date(),
  });
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success", "Your Note is successfully added!");
  res.redirect("/listings");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Notelisting.findById(id);
  if (!listing) {
    res.send("no such listings");
  }
  res.render("./listings/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Notelisting.findById(id);
  if (!listing) {
    req.flash("error", "Note not found!");
    res.redirect("/listings");
  }
  res.render("./listings/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let { title, content } = req.body.listing;

  if (!title || !content) {
    req.flash("error", "All fields are required!");
    return res.redirect(`/listings/${id}/edit`);
  }

  try {
    const listing = await Notelisting.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    req.flash("success", "Note updated successfully!");
    res.redirect(`/listings/${id}`);
  } catch (err) {
    req.flash("error", "Error updating listing");
    res.redirect(`/listings/${id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Notelisting.findByIdAndDelete(id);
  req.flash("success", "Note is deleted successfully!");
  res.redirect("/listings");
};
