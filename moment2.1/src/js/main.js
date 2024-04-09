"use strict";

const url ="http://127.0.0.1:3000/api/workexperience";


async function getdata() {
    
    const response = await fetch(url);        // Skicka en GET-förfrågan till den URL

    const data = await response.json();       // omvandla svaret till JSON-format

    console.table(data.rows);
}

async function createWorkexperience(company_name, job_title, location, start_date, end_date, description) {
    // Skapa ett objekt med workexperience
    let workexperience = {
        company_name: company_name,
        job_title: job_title,
        location: location,
        start_date: start_date,
        end_date: end_date,
        description: description
    }

    // Skicka en POST-förfrågan till den URL med workexperience_data
    const response = await fetch(url, {
        method: "POST",                                     // Ange att det är en POST-förfrågan
        headers: {
            "content-type": "Application/json"              // Ange typen av data i förfrågan är JSON
        },
        body: JSON.stringify(workexperience)                // omvandla workexperience_data till JSON-format och skicka som body i förfrågan
    });
    const data = await response.json();
    // console.table(data);

}



getdata();
createWorkexperience();