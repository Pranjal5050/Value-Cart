const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isloggedin");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

router.get("/shop", isloggedin, async (req, res) => {
    let product = await productModel.find();
    let success = req.flash("success");
    let error = req.flash("error");
    res.render("shop", { product, success, error });
});

router.get("/products/:productid", async (req, res) => {
    let productdet = await productModel.findOne({ _id: req.params.productid })
    res.render("productdetails.ejs", { productdet });
})

router.get("/cart", isloggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email }).populate("cart");
        //let bill = Number(user.cart[0].pprice) + 20 - Number(user.cart[0].discount);
        let bill = 0;
        let discount = 0;
        let price = 0;
        user.cart.forEach(item => {
            bill += Number(item.price) - Number((item.discount));
            discount += Number(item.discount);
            price += Number(item.price);
        });
        res.render("cart", { user, bill, discount, price });
    } catch (error) {
        res.send("error")
    }
})

router.get("/cart/:id", isloggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    if(user.cart.includes(req.params.id)){
    req.flash("error", "Product already in your cart");
    return res.redirect("/shop");
}
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success", "Product Added Successfully");
    res.redirect("/shop");
});

router.get("/cart/remove/:id", async (req, res) => {
    let user = await userModel.findOneAndDelete({_id: req.params.id });
    res.redirect("/shop");
})

module.exports = router;