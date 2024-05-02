// 

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));


app.use("/api", authRoutes);

app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "shyddad route! "});
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) res.status(401).json({message: "Not authorized for this token missing!"});
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, username) => {
        if(err) return res.status(403).json({message: "not correct jwt"});

        req.username = username;

        next();
    });
}


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static("public"));
const port = process.env.port | 3000;

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});
app.get("/signup", (req, res) => {
    res.render("signup");
});


// app.get("/about", (req, res) => {
//     res.render("about");
// });


// starta app

app.listen(port, () => {
    console.log("server started on port " + port);
});