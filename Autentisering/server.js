// 

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();


const app = express();
app.use(bodyParser.json());



app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port | 3000;

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/about", (req, res) => {
    res.render("about");
});


// starta app

app.listen(port, () => {
    console.log("server started on port " + port);
});