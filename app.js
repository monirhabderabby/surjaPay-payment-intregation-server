const express = require("express");
const app = express();
const cors = require("cors");
const paymentRoute = require("./Routes/payment.route");

// middleware
app.use(express.json());
app.use(cors());

//Routes
app.use("/", paymentRoute);

//home
app.get("/", (req, res) => {
    res.send("Route is working");
});

process.on("warning", warning => {
    console.log(console.stack);
});

module.exports = app;
