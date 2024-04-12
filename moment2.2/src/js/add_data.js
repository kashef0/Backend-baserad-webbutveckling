"use strict";

const url = "https://backend-baserad-webbutveckling-2.onrender.com/api/workexperience";


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
            throw new Error(`ingen response! Status: ${response.status}`);
        } else {
            window.location.href = "./index.html";
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
};

export { addData };