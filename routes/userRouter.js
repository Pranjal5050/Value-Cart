const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const isLoggedin = require("../middlewares/isloggedin");
const {userRegister, userlogin} = require("../controllers/Authcontroll");
const upload = require("../config/multer");


router.get("/register", (req, res) => {
    let error = req.flash("error")
    res.render("register", {error, loggedin : false});
});


router.post("/register", userRegister);

router.post("/login", userlogin);

router.get("/logout", (req, res)=>{
    res.cookie("token", "");
    res.redirect("/users/register");
})

router.get("/profile", isLoggedin,async (req, res)=>{
    let user = await userModel.findOne({email : req.user.email});
    res.render("profile", {user});
});

router.post("/edit/:userid", async (req, res)=>{
        let {fullname} = req.body;
        const finduser = await userModel.findOneAndUpdate({_id : req.params.userid}, {fullname}, {new : true});
        res.redirect("/shop");
});

module.exports = router;