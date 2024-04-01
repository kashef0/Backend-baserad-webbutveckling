const { Client } = require("pg");
require("dotenv").config();


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


// skapa tabell


client.query(
    `
    DROP TABLE IF EXISTS kursData;
    create table kursData(
        kursKod    VARCHAR(10) primary key NOT NULL,
        kurs_name   VARCHAR(50) NOT NULL,
        Progression CHAR(1) NOT NULL,
        kurs_url    VARCHAR(255) NOT NULL,
        created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    )`
);