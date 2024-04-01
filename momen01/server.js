
const { Client } = require("pg");
const express = require("express");
const bodyParser = require("body-parser");  // mölijghet att läsa in form-data

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");              // view engine: ejs
app.use(express.static("public"));             // statiska filer i katalog "public"
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const port = process.env.port | 3000;


// anslut till databasen 
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});


client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning: " + err);
    } else {
        console.log("ansluten till databasen...");
    }
});


app.get("/", async (req, res) => {
    client.query("SELECT * FROM kursData", (err, getData) => {
        if (err) {
            console.log("Error querying the database:", err);
            res.status(500).send("Internal Server Error");
        } else {
            res.render("index", {
                Data: getData.rows
            });
        }
    });
});


app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/add_course", (req, res) => {
    res.render("add_course", {
        errors : []
    });
});

app.post("/add_course/add", (req, res) => {
    res.render("add_course");
});




app.post("/", async(req, res) => {
    let kurskod = req.body.kurskod;
    let kurs_name = req.body.kurs_name;
    let Progression = req.body.Progression;
    let kurs_url = req.body.kurs_url;
    let errors = [];
    // Validate kursKod field
    if(kurskod === "" ) {
        errors.push("du måste fylla på kurskod fält");
    }
    if(kurs_name === "") {
        errors.push("du måste ange namn");
    }
    if(Progression === "") {
        errors.push("du måste välja Progression");
    }
    if(kurs_url === "") {
        errors.push("du måste lägga till URL");
    }

    // SQL query
    try {
        const getData = await client.query("INSERT INTO kursData(kursKod, kurs_name, Progression, kurs_url) VALUES($1, $2, $3, $4)",
        [kurskod, kurs_name, Progression, kurs_url]);
        res.redirect("/");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
    res.render("add_course", { errors: errors });
});


app.listen(process.env.PORT,  ()=> {
    console.log("server started on port" + process.env.PORT);
});