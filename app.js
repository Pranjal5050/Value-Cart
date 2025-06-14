const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const ownerRouter = require("./routes/ownerRouter");
const queryRouter = require("./routes/queryRouter");

const index = require("./routes/index");
const db = require("./config/mongoose-connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const expressSession = require("express-session");
const flash = require("connect-flash");

app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "process.env.JET_KEY"
}));
app.use(flash())


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.use("/", index);
app.use('/users', userRouter);
app.use('/product', productRouter);
app.use('/owner', ownerRouter);
app.use('/query', queryRouter);

app.listen(3000);