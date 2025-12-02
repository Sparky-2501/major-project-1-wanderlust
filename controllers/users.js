const User = require('../models/user.js');

module.exports.signupUser = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        //auto login after signup
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust ");
            res.redirect("/listings");
        });
    }
    catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.getLoginUser = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.postloginUser = async (req, res) => {
    req.flash("success", "welcome back to Wanderlust !! you are logged in");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.Logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out now !");
        res.redirect("/listings");
    });
};