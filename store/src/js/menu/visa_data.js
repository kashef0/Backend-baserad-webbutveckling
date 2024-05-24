
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";

import { toggleNav } from '../navmenu.js';

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
        visaData(data);
        visaDataAdmin(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//  Funktion för att visa data i public sida
export function visaData(rows) {
    const pizza = document.getElementById("pizza");
    const pasta = document.getElementById("pasta");
    const starters = document.getElementById("starters");
    
    rows.forEach(element => {
        const itemHTML = `
        <div class="food-menu-item">
            <div class="food-description">
                <h2 class="food-title">${element.title}</h2>
                <p class="text"> kategori: ${element.category}</p>
                <p class="text"> Innehållet: ${element.descrip}</p>
                <p class="food-price text">Pris: ${element.price} Kr</p>
            </div>
        </div>
        `;

        if (element.category.toLowerCase() === "pizza"){
            pizza.innerHTML += itemHTML;
        } else if (element.category.toLowerCase() === "pasta") {
            pasta.innerHTML += itemHTML;
        } else if (element.category.toLowerCase() === "förrätter") {
            starters.innerHTML += itemHTML;
        }
    });
}



fetchDataShow();



toggleNav();