const path = require("path");
const express = require("express");

const publicPath = path.join(__dirname, "../public"); //Helps to link the path more cleanly
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
})




