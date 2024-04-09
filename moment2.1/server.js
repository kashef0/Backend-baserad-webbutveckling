const { Client } = require("pg");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());   


//  skapa en ny instans av PostgreSQL-Clienten
const client = new Client ({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

// ansluta till en PostgreSQL-databas
client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning: " + err);
    } else {
        console.log("ansluten till databasen....");
    }
});



//routes
app.get("/api", (req, res) => {
    res.json({message: "Välkomen till mitt API"});
});

app.get("/api/workexperience", (req, res) => {

    //hämta workexperience
    client.query(`SELECT * FROM workexperience;`, (err, getData) => {
        if(err) {
            console.log("Error querying databasen:", err);
            res.status(500).json("internal server error: " + err);

            return;
        }

        // console.log(getData);
        if(getData.length === 0) {
            res.status(404).json({message: "inga workexperience hittades"});
        } else {
            res.json(getData);
        }
        
    })
    // res.json({message: "get workexperience"});
});

//express-route som hanterar POST-förfrågningar
app.post("/api/workexperience", (req, res) => {
    let company_name = req.body.company_name;
    let job_title = req.body.job_title;
    let location = req.body.location;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;

    let errors = {
        meassge: "",
        detail: "",
        http_response: {

        }
    }

    if(!company_name || !job_title || !location || !start_date || !end_date || !description) {
        // error message
        errors.meassge = "alla fält måste fylla på";
        errors.detail = "du måste fylla på alla fält med json";

        // response code 
        errors.http_response.meassge = "bad request";
        errors.http_response.code = 400;


        res.status(400).json({errors});

        return;
    }

    // sql fråga
    client.query(`INSERT INTO workexperience(company_name, job_title, location, start_date, end_date, description) VALUES($1, $2, $3, $4, $5, $6)`,
    [company_name, job_title, location, start_date, end_date, description], (err, getData) => {
        if(err) {
            res.status(500).json({error: "något gick fel: " + err});
            return;
        }

        console.log("fråga skabad: " + getData);

        let workexperience = {

            company_name: company_name,
            job_title: job_title,
            location: location,
            start_date: start_date,
            end_date: end_date,
            description: description
        };
        
        res.json({message: "workexperience added", workexperience});
    });
    
    

});

//express-route som hanterar Put(uppdatering)-förfrågningar
app.put("/api/workexperience/:id", (req, res) => {
    let id = req.params.id;                             // Hämta id från URL-parametern
    let company_name = req.body.company_name;
    let job_title = req.body.job_title;
    let location = req.body.location;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;

    let errors = {
        meassge: "",
        detail: "",
        http_response: {

        }
    }

    if(!company_name || !job_title || !location || !start_date || !end_date || !description) {
        // error message
        errors.meassge = "alla fält måste fylla på";
        errors.detail = "du måste fylla på alla fält med json";

        // response code 
        errors.http_response.meassge = "bad request";
        errors.http_response.code = 400;


        res.status(400).json({errors});

        return;
    }

    client.query(
        `UPDATE workexperience SET company_name = $1, job_title = $2, location = $3, start_date = $4, end_date = $5, description = $6 WHERE id = $7`,
        [company_name, job_title, location, start_date, end_date, description, id],
        (err, getdata) => {
            if(err) {
                res.status(500).json({error: "något gick fel: " + err});
                return;
            }
            console.log("fråga lyckades: " + getdata);

            let workexperience = {
                id: id,
                company_name: company_name,
                job_title: job_title,
                location: location,
                start_date: start_date,
                end_date: end_date,
                description: description
            };

            res.json({message: "workexeperience uppdaterad", workexperience});
        }
        
    );

    // res.json({message: "workexperience updated: " + req.params.id});
});

//express-route som hanterar delete(radering)-förfrågningar
app.delete("/api/workexperience/:id", (req, res) => {
    let id = req.params.id;

    client.query(`
        DELETE FROM workexperience WHERE id = $1
    `,
    [id],
    (err, getData) => {
        if(err) {
            res.status(500).json({error: "Något gick fel: " + err});

            return;
        }

        console.log("fråga lyckades: " + getData);
        res.json({message: "workexperience deleted", id: id});
    }

);
    // res.json({message: "workexperience deleted: " + req.params.id});
});



app.listen(port, () => {
    console.log("server körs på port: " + port)
});