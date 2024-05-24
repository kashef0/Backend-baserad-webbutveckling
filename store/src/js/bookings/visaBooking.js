
const url = "https://api-store-backend-jwkj.onrender.com/api/bookings";


// Function to fetch data from the API and show it on the website
async function fetchDataShow() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        visaBooking(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

//  Funktion för att visa data i public sida
export function visaBooking(rows) {
    const display_booking = document.getElementById("booking");

    rows.forEach(element => {
        const date = new Date(element.date);
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }).format(date);
        const itemHTML = `
        <div class="booking-item">
            <div class="booking-description">
                <p class="food-title" style="color:tomato;">ID: ${element._id}</p>
                <p class="food-title">namn: ${element.name}</p>
                <p class="text">datum: ${formattedDate}</p>
                <p class="text">tid: ${element.time}</p>
                <p class="food-price text">Tel: ${element.phone}</p>
                <p class="food-price text">email: ${element.email}</p>
                <p class="food-price text">Antal personer: ${element.Antal_people}</p>
                <p class="food-price text">message: ${element.message}</p>
                <p class="food-price text">take away: ${element.takeOut}</p>
            </div>
        </div>
        `;

        if (display_booking){
            display_booking.innerHTML += itemHTML;
        }
    });
}



fetchDataShow();



