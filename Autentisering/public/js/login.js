"use strict";

let openBtn = document.getElementById("bli-medlem");
let closeBtn = document.getElementById("loginKlick");


openBtn.addEventListener('click', formSwitcher);
closeBtn.addEventListener('click', formSwitcher);


export function formSwitcher() {
    let navMenuEl = document.getElementById("registrationForm");
    let navMenuEl2 = document.getElementById("loginForm");

    let style = window.getComputedStyle(navMenuEl);

    if (style.display === "none") {
        navMenuEl.style.display = "block";
        navMenuEl2.style.display = "none";
    } else {
        navMenuEl.style.display = "none";
        navMenuEl2.style.display = "block";
    }
}

