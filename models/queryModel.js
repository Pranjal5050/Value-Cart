const mongoose = require("mongoose");

const querySchema = mongoose.Schema({
    name : String,
    email : String,
    message : String
});
module.exports = mongoose.model("querySchema", querySchema);