"use strict";
const API_URL = "https://api-store-backend-jwkj.onrender.com/api";
const PROTECTED_URL = `${API_URL}/protected`;

// Visa skyddat innehåll om användaren är inloggad
export function showProtectedContent() {
    const messageEL = document.getElementById("skyddad");
    const username = localStorage.getItem('username');
    const testEl = document.getElementById("test");
   // kontrollera om 
    if (testEl) {
        testEl.innerHTML = `Välkomna :<span style="color:red"> ${username}</span>`;
    } else {
        console.error("Element med id 'test' finns inte");
    }

    const token = localStorage.getItem('token');
    if (token && window.location.pathname !== "/index.html") {
        fetch(PROTECTED_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Access denied');
                }
                return response.text();
            })
            .then(data => {
                window.location.href = "/protected.html";
                messageEL.style.display = "block";
            })
            .catch(error => {
                console.error('Error accessing protected content:', error.message);
            });
    }

}

window.addEventListener('load', showProtectedContent);