const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/generateToken")

module.exports.userRegister = async (req, res) => {
    let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
        req.flash("error", "User already exist");
        return res.redirect("/users/register");
    }
    else {
        try {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    const user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                });
            });
        } catch (error) {
            req.flash("error", "Something went wrong");
        }

    }
}

module.exports.userlogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            req.flash("error", "Password and email incorrect");
            return res.redirect("/users/register")
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                //const user = await userModel.create({
                //    email,
                //    password
                //});
                let token = generateToken(user);
                res.cookie("token", token);
                res.redirect("/shop");
            }
            else {
                req.flash("error", "Password and email incorrect");
                res.redirect("/users/register");
            }
        });
    } catch (error) {
        req.flash("error", "Something went wrong");
        res.redirect("/users/register");
    }
}