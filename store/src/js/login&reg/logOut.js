"use strict";
// import { addData, updateData, deleteData } from '/src/js/add_data';


const logOut = document.getElementById('logoutBtn');
logOut.addEventListener('click', logOut_code);

export function logOut_code(event) {
    event.preventDefault();
    console.log('Logout button clicked');
    // Clear token from local storage
    localStorage.removeItem('token');
    // Redirect user to login page
    window.location.href = "/login.html";
};

// toggleNav();

// document.getElementById('add_data').addEventListener('submit', addData);
// document.getElementById('update_data').addEventListener('click', updateData);
// document.getElementById('delete_data').addEventListener('click', deleteData);