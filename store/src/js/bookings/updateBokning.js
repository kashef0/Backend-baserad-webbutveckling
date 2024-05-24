"use strict";
const url = "https://api-store-backend-jwkj.onrender.com/api/bookings";

const token = localStorage.getItem('token');


// Funktion för att uppdatera en beniftliga menu
export async function updateBooking(event) {
    event.preventDefault();
    const form = document.getElementById('bookning_hantering');
    const data = new FormData(form);

    const id = data.get('_id');
    const name = data.get('name');
    const date = data.get('date');
    const time = data.get('time');
    const phone = data.get('tel');
    const email = data.get('email');
    const antal_people = data.get('Antal_people');
    const message = data.get('message');
    const takeout = data.get('takeout');

    const postData = {
        name: name,
        date: date,
        time: time,
        phone: phone,
        email: email,
        Antal_people: parseInt(antal_people),
        message: message,
        takeOut: takeout
    };

    if (id === "") {
        document.getElementById('id_error_booking').innerHTML = "du har inte angett ID";
        return;
    } else {
        document.getElementById('id_error_booking').innerHTML = "";
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            throw new Error(`ingen response! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        alert('bokning är uppdaterad..');

    } catch (error) {
        console.error("Det gick inte att uppdatera data status:", error);
    }
}

