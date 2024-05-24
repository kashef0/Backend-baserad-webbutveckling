"use strict";

import { string } from "sharp/lib/is";

const API_URL = "https://api-store-backend-jwkj.onrender.com/api/users/api/users";
const token = localStorage.getItem('token');

export async function fetchAdmin() {
    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error("Http error status: " + response.status);
        }
        const admin = await response.json();
        getAdmin(admin);
    } catch (error) {
        console.error("error fetching: " + error);
        return [];
    }
}

export function getAdmin(admin) {
    const adminContainer = document.getElementById("admin-container");
    adminContainer.innerHTML = "";
    admin.forEach((element, index) => {
        let admin_nr = String(index + 1).padStart(4, "0");
        const adminHTML = `
        <div class="admin-item">
            <h3>Admin nr: ${admin_nr}</h3>
            <p>username: ${element.username}</p>
            <p>Email: ${element.email}</p>
            
        </div>
        `;
        adminContainer.innerHTML += adminHTML;
    });
}


fetchAdmin();