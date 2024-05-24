"use strict";

import { visaDataAdmin } from '/src/js/showdataAdmin';
import { addData } from '/src/js/menu/add_data';
import { deleteData } from "/src/js/menu/del_data";
import { updateData } from "/src/js/menu/update_data";
import { toggleNav } from './navmenu.js';
import { logOut_code } from './login&reg/logOut.js';
import { getAdmin } from "/src/js/login&reg/getAdmin";
import { regist_code } from "/src/js/login&reg/register";
import { visaBooking } from './bookings/visaBooking.js';
import { deleteBooking } from "./bookings/delBokning.js";
import { updateBooking } from "./bookings/updateBokning.js";

document.addEventListener('DOMContentLoaded', async function() {

    // document.getElementById('add_data').addEventListener('submit', addData);
    // document.getElementById('update_data').addEventListener('click', updateData);
    // document.getElementById('delete_data').addEventListener('click', deleteData);
    
    // document.getElementById('update_booking').addEventListener('click', updateBooking);
    // document.getElementById('delete_booking').addEventListener('click', deleteBooking);
    document.getElementById('add_data').addEventListener('submit', async function(event) {
        event.preventDefault();
        await addData(event);
        location.reload(); // Ladda om sidan efter att data har lagts till
    });

    document.getElementById('update_data').addEventListener('click', async function(event) {
        event.preventDefault();
        await updateData(event);
        location.reload(); // Ladda om sidan efter att data har uppdaterats
    });

    document.getElementById('delete_data').addEventListener('click', async function(event) {
        event.preventDefault();
        await deleteData(event);
        location.reload(); // Ladda om sidan efter att data har tagits bort
    });
    
    document.getElementById('update_booking').addEventListener('click', async function(event) {
        event.preventDefault();
        await updateBooking(event);
        location.reload(); // Ladda om sidan efter att bokningen har uppdaterats
    });

    document.getElementById('delete_booking').addEventListener('click', async function(event) {
        event.preventDefault();
        await deleteBooking(event);
        location.reload(); // Ladda om sidan efter att bokningen har tagits bort
    });
    visaDataAdmin();
    visaBooking();
    
});


getAdmin();
regist_code();
logOut_code();
toggleNav();

