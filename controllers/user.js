const { render } = require("ejs");
const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let url = req.file?.path;
    let filename = req.file?.filename;
    let { username, email, password } = req.body;
    const newUser = new User({ email, username, dob: req.body.dob });
    newUser.image = { url, filename };
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to blisoNote!");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
};

module.exports.renderloginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome to blisoNote! You are logged in!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged Out from blisoNotes!");
    res.redirect("/listings");
  });
};

module.exports.profile = (req, res) => {
  const user = req.user;
  res.render("users/profile.ejs", { user });
};
