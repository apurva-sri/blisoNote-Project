const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middlerware.js");
const userController = require("../controllers/user.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(upload.single("image"),wrapAsync(userController.signup));

router.route("/profile").get(userController.profile);

router
  .route("/login")
  .get(userController.renderloginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

module.exports = router;
