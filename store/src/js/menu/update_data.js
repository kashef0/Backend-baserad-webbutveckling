"use strict";
const url = "https://api-store-backend-jwkj.onrender.com/api/menu";

const token = localStorage.getItem('token');


// Funktion för att uppdatera en beniftliga menu
export async function updateData(event) {
    event.preventDefault();

    const id = document.getElementById('id').value.trim();
    const title = document.getElementById('title').value.trim();
    const descrip = document.getElementById('descrip').value.trim();
    const category = document.getElementById('category').value.trim();
    const price = document.getElementById('price').value.trim();

    const putData = {
        title: title,
        descrip: descrip,
        category: category,
        price: price
    };

    if (id === "") {
        document.getElementById('id_error').innerHTML = "du har inte angett ID";
        return;
    } else {
        document.getElementById('id_error').innerHTML = "";
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(putData)
        });

        if (!response.ok) {
            throw new Error(`ingen response! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);

        // Show success message or perform any other actions upon success
        alert('Meny uppdaterad..');

    } catch (error) {
        console.error("Det gick inte att uppdatera data status:", error);
    }
}

