"use strict";
export function validateForm(formId, inputIds) {
    const form = document.getElementById(formId);

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Loop genom alla inputid och validera
        for (const inputId of inputIds) {
            const inputValue = form.querySelector(`#${inputId}`).value;
            if (!inputValue) {
                alert("Alla fält måste fylla i");
                return false;
            }
        }

        // om alla är true, form försäter
        return true;
    });
}