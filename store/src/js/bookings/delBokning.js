"use strict";


// Funktion för att radera em menu 
const url = "https://api-store-backend-jwkj.onrender.com/api/bookings";

const token = localStorage.getItem('token');

export async function deleteBooking(event) {
    event.preventDefault();
    
    const id = document.getElementById('_id').value.trim();

    if (id === "") {
        document.getElementById('id_error_booking').innerHTML = "du har inte angett ID";
        return;
    } else {
        document.getElementById('id_error_booking').innerHTML = "";
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`ingen response! Status: ${response.status}`);
        }

        alert('bokning raderades..');

    } catch (error) {
        console.error("Det gick inte att radera data status:", error);
    }
}
