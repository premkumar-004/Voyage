const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
})

router.post("/signup", async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = await new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.flash("success", "Welcome to voyage");
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
})

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
})

router.post("/login", passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }),
    async (req, res) => {
        req.flash("success", "Welcome to Voyage");
        res.redirect("/listings");
    })

module.exports = router;