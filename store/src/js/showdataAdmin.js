"use strict";
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";
// Function to fetch data from the API and show it on the website
async function fetchDataShow() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        visaDataAdmin(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



// Funktion för att visa data i admin sida
export function visaDataAdmin(rows) {
    const pizza2 = document.getElementById("pizza");
    const pasta2 = document.getElementById("pasta");
    const starters2 = document.getElementById("starters");
    
    rows.forEach(element => {
        const itemHTML = `<br>
        <div class="food-menu-item">
            <div class="food-description">
                <p class="food-title" style="color:tomato">Menu id: ${element._id}</p>
                <p class="food-title text">${element.title}</p>
                <p class="text"> kategori: ${element.category}</p>
                <p class="text"> Innehållet: ${element.descrip}</p>
                <p class="food-price text">Pris: ${element.price} Kr</p>
            </div>
        </div>
        `;

        if (element.category.toLowerCase() === "pizza"){
            pizza2.innerHTML += itemHTML;
        } else if (element.category.toLowerCase() === "pasta") {
            pasta2.innerHTML += itemHTML;
        } else if (element.category.toLowerCase() === "förrätter") {
            starters2.innerHTML += itemHTML;
        }
    });
}



fetchDataShow();