"use strict";

const url = "https://backend-baserad-webbutveckling-9.onrender.com/company";


// Funktion för att lägga till ny data
async function addData(event) {
    event.preventDefault();
    
    
    const company_name = document.getElementById('company_name').value;
    const job_title = document.getElementById('job_title').value;
    const location = document.getElementById('location').value;
    const start_date = document.getElementById('start_date').value;
    const end_date = document.getElementById('end_date').value;
    const description = document.getElementById('description').value;
    const dateError = document.getElementById("error");
    
    const postData = {
        company_name: company_name,
        job_title: job_title,
        location: location,
        start_date: start_date,
        end_date: end_date,
        description: description
    };
    // function för att Dela upp datumsträngen och konvertera dem till siffror
    function convertDateStr(dateStr) {
        const [year, month, date] = dateStr.split('-').map(Number) 
        return new Date(year, month - 1, date)
        }
    const startDate = convertDateStr(start_date);
    const endDate = convertDateStr(end_date);
    // Kontrollera om slutdatum kommer före startdatum
    if (endDate.valueOf() < startDate.valueOf()) {
        dateError.innerHTML = "Slutdatum är före startdatum!";
        throw new Error('Slutdatum är före startdatum!');
    }

    if (company_name === "") {
        document.getElementById('company_name_error').innerHTML = "du måste ange företagetsnamn";
    } else {
        document.getElementById('company_name_error').innerHTML = "";
    }
    if (job_title === "") {
        document.getElementById('job_title_error').innerHTML = "du måste ange Jobbstitle";
    } else {
        document.getElementById('job_title_error').innerHTML = "";
    }
    if (location === "") {
        document.getElementById('location_error').innerHTML = "du måste ange Ort";
    } else {
        document.getElementById('location_error').innerHTML = "";
    }
    if (start_date === "") {
        console.log(start_date);
        document.getElementById('Startdatum_error').innerHTML = "du måste ange Startdatum";
    } else {
        document.getElementById('Startdatum_error').innerHTML = "";
    }
    if (end_date === "") {
        document.getElementById('error').innerHTML = "du måste ange Startdatum";
    } else {
        document.getElementById('error').innerHTML = "";
    }
    if (description === "") {
        document.getElementById('description_error').innerHTML = "du måste ange Beskrivning";
    } else {
        document.getElementById('description_error').innerHTML = "";
    }

    const errorElements = document.querySelectorAll(".error");
    let hasErrors = false;
    errorElements.forEach(element => {
        if (element.innerHTML !== "") {
            hasErrors = true;
        }
    });

    if (!hasErrors) {
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
                window.location.href = "/";
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

    
};

export { addData };