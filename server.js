const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const port = 4000;

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
