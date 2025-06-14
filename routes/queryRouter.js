const express = require("express");
const router = express.Router();
const queryModel = require("../models/queryModel");
const isLoggedIn = require("../middlewares/isloggedin");

router.get("/contact",isLoggedIn, (req, res)=>{
    res.render("contact");
});

router.post("/query",async (req, res)=>{
    let {name, email, message} = req.body
    let user = await queryModel.create({
        name,
        email,
        message
    });
    req.flash("success", "Your message will be send");
    res.redirect("/shop");
})

module.exports = router