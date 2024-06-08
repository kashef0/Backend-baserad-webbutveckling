const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);

// Protect the /api/protected route with the authenticateToken middleware
app.get("/api/protected", authenticateToken, (req, res) => {
    res.json({message: "Protected route!"});
});

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: "Not authorized, token missing!"});
    } 

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({message: "Invalid token"});
        }

        req.user = user; // store user information in request
        next();
    });
}

const port = process.env.PORT || 3000;

app.get("/home", authenticateToken, (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.listen(port, () => {
    console.log("Server started on port " + port);
});
