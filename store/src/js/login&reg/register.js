"use strict";
import { validateForm } from '/src/js/valdite_input';
const API_URL = "https://api-store-backend-jwkj.onrender.com/api/users";
const REGISTER_URL = `${API_URL}/register`;
// Registrera användare
const regist = document.getElementById('register-form');
regist.addEventListener('submit', regist_code);
export async function regist_code(event) {
    event.preventDefault();
    const username = document.getElementById('name').value;
    const email = document.getElementById('e-mail').value;
    const password = document.getElementById('passwords').value;
    
    const error = document.getElementById("error-message");
    if (password.length < 6) {
        error.innerHTML = "Lösenordet måste vara minst 6 tecken långt";
        return;
    } else {
        error.innerHTML = "";
    }

    try {
        const response = await fetch(REGISTER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        if (!response.ok) {
            alert("försök med ett annat lösenord eller e-post");
            throw new Error('försök med ett annat lösenord eller e-post');
        }

        // window.location.href = "/index.html";
        alert('Registrering lyckades! Logga in för att fortsätta.');

    } catch (error) {
        console.error('Error during registration:', error.message);
    }

};
const inputIds = ['name', 'e-mail', 'passwords'];
validateForm('register-form', inputIds);