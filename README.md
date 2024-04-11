# API för Arbetslivserfarenhet

Detta repository innehåller koden för ett enklare REST API byggt med Express. APIet är skapat för att hantera arbetslivserfarenheter, inklusive lagring, uppdatering och radering av dessa. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

## Länk
En liveversion av APIet finns tillgänglig på följande URL: [https://backend-baserad-webbutveckling-2.onrender.com/api/workexperience](https://backend-baserad-webbutveckling-2.onrender.com/api/workexperience)

## Installation och databas
APIet använder en PostgreSQL-databas. För att komma igång, följ dessa steg:

1. Klona ner källkodsfilerna.
2. Kör kommandot `npm install` för att installera nödvändiga npm-paket.
3. Ange miljövariabler i en `.env.sample`-fil enligt följande exempel:
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=myusername
DB_PASSWORD=mypassword
DB_DATABASE=mydatabase

4. Kör kommandot `npm run start` för att starta APIet.

## Användning
Nedan beskrivs hur man använder APIet på olika sätt:

| Metod | Ändpunkt               | Beskrivning                                           |
|-------|------------------------|-------------------------------------------------------|
| GET   | /api/workexperience   | Hämtar alla tillgängliga arbetslivserfarenheter.      |
| POST  | /api/workexperience   | Lagrar en ny arbetslivserfarenhet. Kräver att ett arbetslivserfarenhets-objekt skickas med. |
| PUT   | /api/workexperience/:id | Uppdaterar en existerande arbetslivserfarenhet med angivet ID. Kräver att ett arbetslivserfarenhets-objekt skickas med. |
| DELETE| /api/workexperience/:id | Raderar en arbetslivserfarenhet med angivet ID.        |

Ett arbetslivserfarenhets-objekt ska skickas och returneras i JSON-format med följande struktur:

```json
{
  "company_name": "Lokal Livsmedelsbutik",
  "job_title": "Butikssäljare",
  "location": "Göteborg, Sverige",
  "start_date": "2021-04-15",
  "end_date": "2022-09-30",
  "description": "Ansvarig för kundservice, kassahantering och varuexponering."
}

