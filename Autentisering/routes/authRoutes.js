// route för auth

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("dotenv").config();


// connect to mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATEBASE).then(() => {
    console.log("connected to MongoDb...");
}).catch((error) => {
    console.log("error connecting to database..." + error);
});

// user models

const user = require("../models/user");

// add new user
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validate input
        if (!username || !password) {
            return res.status(400).json({error: "invalid input, send username and password"});
        }
        // correct - save user
        res.status(201).json({message: "user called"});
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
});

router.post("/login", async(req, res) => {
    try {
        const { username, password } = req.body;

        // validate input
        if (!username || !password) {
            return res.status(400).json({error: "invalid input, send username and password"});
        }
        // correct - save user
        if(username === "mohamed" && password === "password") {
            res.status(200).json({message: "login successful"});
        } else {
            res.status(401).json({error: "invalid password or username"});
        }
    } catch (error) {
        res.status(500).json({error: "server error"});
    }
});

module.exports = router;