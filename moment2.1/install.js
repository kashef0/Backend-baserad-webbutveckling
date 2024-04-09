const { Client } = require("pg");
require("dotenv").config();

// ansluta till databasen
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



client.connect((err) => {
    if(err) {
        console.log("Fel vid anslutning: " + err);
    } else {
        console.log("ansluten till databasen....");
    }
});

// skapa tabell

client.query(
    `
    DROP TABLE IF EXISTS workexperience;
    CREATE TABLE workexperience(
        id              SERIAL PRIMARY KEY,
        company_name    VARCHAR(255) NOT NULL,
        job_title       VARCHAR(255) NOT NULL,
        location        VARCHAR(50)  NOT NULL,
        start_date      DATE,
        end_date        DATE,
        description     TEXT,
        created         TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
);