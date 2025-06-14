const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    image : Buffer,
    name : String,
    type : String,
    price : String,
    discount : {
        type : Number,
        default : 0
    },
    length : String,
    height : String,
    quantity : String
});

module.exports = mongoose.model("productSchema", productSchema);