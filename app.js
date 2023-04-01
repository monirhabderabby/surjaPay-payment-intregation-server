const express = require("express");
const app = express();
const cors = require("cors");
const paymentRoute = require("./Routes/payment.route");
const orderRoute = require("./Routes/order.route");

// middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/", paymentRoute);
app.use("/", orderRoute);

//home
app.get("/", (req, res) => {
    res.send("Route is working");
});

process.on("warning", warning => {
    console.log(console.stack);
});

module.exports = app;
