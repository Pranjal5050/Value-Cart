const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const productModel = require("../models/productModel");
const isLoggedin = require("../middlewares/isloggedin");

router.get("/product", isLoggedin, (req, res) => {
    res.render("createProduct")
});

router.post("/createproduct", upload.single("image"), async (req, res) => {
    try {
        let { name,
            type,
            price,
            discount,
            length,
            height,
            quantity } = req.body;
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            type,
            price,
            discount,
            length,
            height,
            quantity
        });
        req.flash("success", "Product added successfully");
        res.redirect("/shop");
    } catch (error) {
        console.log(error)
    }
})



module.exports = router;