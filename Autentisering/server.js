// 

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();


const app = express();
app.use(bodyParser.json());


app.use("/api", authRoutes);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port | 3000;

app.get("/", (req, res) => {
    res.render("index");
});

// app.get("/about", (req, res) => {
//     res.render("about");
// });


// starta app

app.listen(port, () => {
    console.log("server started on port " + port);
});