const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync');
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users");
//------------------------AUTHENTICATION PROCESSES------------------------------

router
    .route("/signup")
    .get(userController.signupUser)
    .post(wrapAsync(userController.postUser));

router
    .route("/login")
    .get( userController.getLoginUser)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.postloginUser);

router.get('/logout', userController.Logout);

module.exports = router;