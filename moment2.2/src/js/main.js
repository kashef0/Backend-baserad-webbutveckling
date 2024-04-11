"use strict";

const url = "https://backend-baserad-webbutveckling-2.onrender.com/api/workexperience";
const dataShow = document.getElementById("created_list");
const form = document.getElementById('add_data');

// Funktion för att hämta befintliga data från API:et
async function getData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        visaData(data.rows);
    } catch (error) {
        console.error("Error vid hämtning av data:", error);
    }
}

// Funktion för att visa befintliga data på webbsidan
function visaData(rows) {
    dataShow.innerHTML = ""; 

    rows.forEach(element => {
        dataShow.innerHTML += `
        <ul>
            <li>Företagsnamn: ${element.company_name}</li>
            <li>Jobbtitel: ${element.job_title}</li>
            <li>Plats: ${element.location}</li>
            <li>Startdatum: ${new Date(element.start_date).toLocaleDateString()}</li>
            <li>Slutdatum: ${new Date(element.end_date).toLocaleDateString()}</li>
            <li>Beskrivning: ${element.description}</li>
        </ul>
        <br>
        `;
    });
}

// Funktion för att lägga till ny data
async function addData(event) {
    event.preventDefault();
    
    
    const company_name = document.getElementById('company_name').value;
    const job_title = document.getElementById('job_title').value;
    const location = document.getElementById('location').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;

    const postData = {
        company_name: company_name,
        job_title: job_title,
        location: location,
        start_date: start_date,
        end_date: end_date,
        description: description
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        // Uppdatera och visa data efter tilläggning av ny data
        getData();
        // Rensa formuläret
        form.reset();
    } catch (error) {
        console.error("Det gick inte att lägga till data status:", error);
    }
}

form.addEventListener('submit', addData);

// Hämta och visa befintlig data när sidan laddas
getData();

