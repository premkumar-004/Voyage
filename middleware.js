module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //If user not logged in then we redirect him to the same page where the request was generated after login
        //redirectUrl
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create listing!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};