# MongoDB-baserat REST API för Arbetslivserfarenhet

En liveversion av APIet finns tillgänglig på följande URL: [API-webbtjänst](https://backend-baserad-webbutveckling-13.onrender.com/api/company)

Detta projekt innehåller koden för ett REST API byggt med Node.js och Express, som hanterar arbetslivserfarenheter med en MongoDB-databas.

## Installation och Start

För att komma igång med API:et, se till att du har Node.js och npm installerat på din dator. Klona sedan ned projektet och installera alla nödvändiga paket genom att köra:

* npm install express cors mongoose 
* npm install nodemon -dev

Efter installationen kan du starta servern med kommandot: 
* node server.js

### Anslutning till MongoDB

 för att skapa en anslutning till en MongoDB-databas. Detta görs genom att använda mongoose.connect()-funktionen och passera URI:en till MongoDB-databasen som argument.

### Endpoint-rutter

API:et har följande endpoint-rutter för att hantera arbetslivserfarenheter:

- `GET /api/company`: Hämtar alla tillgängliga arbetslivserfarenheter.
- `POST /company`: Skapar en ny arbetslivserfarenhet.
- `PUT /company/:id`: Uppdaterar en existerande arbetslivserfarenhet med ett angivet ID.
- `DELETE /company/:id`: Raderar en arbetslivserfarenhet med ett angivet ID.

### Arbetslivserfarenhets-objekt

För att lägga till eller uppdatera en arbetslivserfarenhet, används JSON-format med följande struktur:

```json
{
  "company_name": "Företagsnamn",
  "job_title": "Titel",
  "location": "Plats",
  "start_date": "Startdatum",
  "end_date": "Slutdatum",
  "description": "Beskrivning av arbetsuppgifter"
}

