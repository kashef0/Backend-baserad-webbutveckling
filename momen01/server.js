
const { Client } = require("pg");                //  importera Client-objektet från pg-paketet'
const express = require("express");              // importera express-ramverket
const bodyParser = require("body-parser");      // mölijghet att läsa in form-data

require("dotenv").config();

const app = express();
app.set("view engine", "ejs");                      // view engine: ejs
app.use(express.static("public"));                  // statiska filer i katalog "public"
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

// GET-routing för about sökvägen
app.get("/about", (req, res) => {
    res.render("about");
});


app.get("/add_course", (req, res) => {
    res.render("add_course", {
        errors : []  // tomma arrayen skickas till vyn vid felmeddelande
    });
});

app.post("/add_course/add", (req, res) => {
    res.render("add_course");
});



app.post("/", async(req, res) => {
    let kurskod = req.body.coursecode;
    let kurs_name = req.body.coursename;
    let Progression = req.body.progression;
    let kurs_url = req.body.syllabus;
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

    if (errors.length === 0) {
        try {
            // SQL query
            const getData = await client.query("INSERT INTO kursData(coursecode, coursename, progression, syllabus) VALUES($1, $2, $3, $4)",
            [kurskod, kurs_name, Progression, kurs_url]);
            res.redirect("/");
            return;
        } catch (error) {
            console.error("Error inserting data:", error);
            errors.push("du måste fylla på alla fälten")
        }
    }
    
    res.render("add_course", { errors: errors });
    
    
});


// skapa en server som lyssnar på en port
app.listen(process.env.PORT,  ()=> {
    console.log("server started on port" + process.env.PORT);
});