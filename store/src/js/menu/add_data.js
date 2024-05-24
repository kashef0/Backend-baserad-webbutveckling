"use strict";

const url = "https://api-store-backend-jwkj.onrender.com/api/menu";

const token = localStorage.getItem('token');
// Function for adding new data
export async function addData(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const descrip = document.getElementById('descrip').value.trim();
    const category = document.getElementById('category').value.trim();
    const price = document.getElementById('price').value.trim();

    const postData = {
        title: title,
        descrip: descrip,
        category: category,
        price: price
    };

    let hasErrors = false;

    if (title === "") {
        document.getElementById('title_error').innerHTML = "du har inte angett title";
        hasErrors = true;
    } else {
        document.getElementById('title_error').innerHTML = "";
    }

    if (descrip === "") {
        document.getElementById('descrip_error').innerHTML = "du har inte angett description";
        hasErrors = true;
    } else {
        document.getElementById('descrip_error').innerHTML = "";
    }

    if (category === "") {
        document.getElementById('category_error').innerHTML = "du har inte angett category";
        hasErrors = true;
    } else {
        document.getElementById('category_error').innerHTML = "";
    }

    if (price === "") {
        document.getElementById('price_error').innerHTML = "du har inte angett price";
        hasErrors = true;
    } else {
        document.getElementById('price_error').innerHTML = "";
    }

    if (!hasErrors) {
        try {
            const response = await fetch(url, {
                method: "POST",
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

            // Show success message or perform any other actions upon success
            alert('En ny menu har lagts till..');
            
            // Clear the form after successful submission
            document.getElementById('add_data').reset();

        } catch (error) {
            console.error("Det gick inte att lägga till data status:", error);
        }
    }
}

