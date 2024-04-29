import { formSwitcher } from './login.js'; // Importera funktionen från login.js
import { toggleMenu } from './navMenu.js'; // Importera funktionen från navMenu.js

document.addEventListener('DOMContentLoaded', function() {
    // Hämta referenser till knapparna eller andra element
    let openBtnLogin = document.getElementById("bli-medlem");
    let closeBtnLogin = document.getElementById("loginKlick");

    let openBtnNav = document.getElementById("open-menu");
    let closeBtnNav = document.getElementById("close-menu");

    // Bifoga händelselyssnare och använd funktionerna
    openBtnLogin.addEventListener('click', formSwitcher);
    closeBtnLogin.addEventListener('click', formSwitcher);

    openBtnNav.addEventListener('click', toggleMenu);
    closeBtnNav.addEventListener('click', toggleMenu);
});
