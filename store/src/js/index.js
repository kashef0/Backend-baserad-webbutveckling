import { addBooking } from "./bookings/addBooking";
import { visaData } from "./menu/visa_data.js";
import { toggleNav } from './navmenu.js';
document.addEventListener('DOMContentLoaded', () => {
    // const bookingForm = document.getElementById('booking-form');
    // if (bookingForm) {
    //     bookingForm.addEventListener('submit', addBooking);
    // }
    addBooking();
   
    visaData();
    toggleNav();
});