// Funktion för att visa befintliga data på webbsidan
const dataShow = document.getElementById("created_list");

function visaData(rows) {
    dataShow.innerHTML = ""; 

    if (!Array.isArray(rows)) {
        console.error("Data is missing or not in the expected format.");
        return;
    }

    rows.forEach(element => {
        console.table(element);
        const rowId = element._id;
        dataShow.innerHTML += `
        <ul class="unorderList" id="row-${element._id}">
            <span>
            <li>Företagsnamn: ${element.company_name}</li>
            <li>Jobbtitel: ${element.job_title}</li>
            <li>Plats: ${element.location}</li>
            <li>Startdatum: ${new Date(element.start_date).toLocaleDateString()}</li>
            <li>Slutdatum: ${new Date(element.end_date).toLocaleDateString()}</li>
            <li>Beskrivning: ${element.description}</li>
            </span>
            <input type="button" class="del_BTN" data-row-id="${rowId}" id="row-${element._id}" value="Radera"> 
        </ul>
        <br>
        `;
    });


}


export { visaData };