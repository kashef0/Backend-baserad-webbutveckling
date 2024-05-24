"use strict";

const BOOKING_URL = "https://api-store-backend-jwkj.onrender.com/api/bookings";
const token = localStorage.getItem('token');

// Function for adding new data
export async function addBooking(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const name = data.get('visitor_name');
    const date = data.get('checkin-date');
    const time = data.get('checkin-time');
    const phone = data.get('visitor_phone');
    const email = data.get('visitor_email');
    const antal_people = data.get('visitor_number');
    const takeout = data.get('takeout');
    const message = data.get('visitor_message');

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

    console.log('postData:', postData); // Log the data being sent

    let hasErrors = false;

    if (name === "") {
        document.getElementById('name_error').innerHTML = "du har inte angett name";
        hasErrors = true;
    } else {
        document.getElementById('name_error').innerHTML = "";
    }

    const current_date = new Date();
    const selectDate = new Date(date);
    if (date === "" || selectDate < current_date.setHours(0,0,0,0)) {
        document.getElementById('date_error').innerHTML = "du har inte angett datum eller datum inte stämmer";
        hasErrors = true;
    } else {
        document.getElementById('date_error').innerHTML = "";
    }

    if (time === "") {
        document.getElementById('time_error').innerHTML = "du har inte angett time";
        hasErrors = true;
    } else {
        document.getElementById('time_error').innerHTML = "";
    }

    if (phone === "") {
        document.getElementById('phone_error').innerHTML = "du har inte angett phone";
        hasErrors = true;
    } else {
        document.getElementById('phone_error').innerHTML = "";
    }
    if (email === "") {
        document.getElementById('email_error').innerHTML = "du har inte angett email";
        hasErrors = true;
    } else {
        document.getElementById('email_error').innerHTML = "";
    }
    if (antal_people === "") {
        document.getElementById('antal_people_error').innerHTML = "du har inte angett antal_people";
        hasErrors = true;
    } else {
        document.getElementById('antal_people_error').innerHTML = "";
    }

    if (!hasErrors) {
        try {
            const response = await fetch(BOOKING_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`ingen response! Status: ${response.status}, ${errorText}`);
            }

            const responseData = await response.json();
            console.log(responseData);

            // Show success message or perform any other actions upon success
            alert('Bokning lyckades!');

            // Clear the form after successful submission
            document.getElementById('booking-form').reset();

        } catch (error) {
            console.error("Det gick inte att lägga till data status:", error);
        }
    }
}

document.getElementById("booking-form").addEventListener('submit', addBooking);
