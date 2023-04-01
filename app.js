const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

//home
app.get("/", (req, res) => {
    res.send("Route is working");
});

process.on("warning", warning => {
    console.log(console.stack);
});

module.exports = app;
