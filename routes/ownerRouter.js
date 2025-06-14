const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModel");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
    res.send("Owner Router");
})

router.post("/register", async (req, res) => {
    let { fullname, email, password } = req.body;
    const existingOwner = await ownerModel.find();
    if (existingOwner.length > 0) {
        return res.status(404).send("Already one owner registerd")
    }
    else {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const owner = await ownerModel.create({
                    fullname,
                    email,
                    password : hash
                });
                res.send(owner);
            });
        });
    }
});

module.exports = router;