const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    image : Buffer,
    fullname : String,
    email : String,
    password : String,
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "productSchema"
        }
    ]
});

module.exports = mongoose.model("userSchema", userSchema);