const mongoose = require("mongoose");
const debug = require("debug")('development:mongoose');
const config = require("config");
mongoose.connect(`${config.get("MONGODB_URI")}/Codeliber`)

.then((req, res)=>{
   debug("connected");
}).catch((error)=>{
   debug(error.message);
})

module.exports = mongoose