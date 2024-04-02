# Moment 1 - Serverbaserad webbutveckling

Jag kommer att ge en snabb och steg-för-steg förklaring av hur jag gick igenom lösningarna för den här uppgiften och beskriver min process.
## arbetsprocessen:
1. **Import av moduler:**
2. **Konfigurering av express-applikationen:**
3. **Anslutning till databasen:**
4. **Hantering av GET-förfrågningar:**
5. **Hantering av POST-förfrågningar:**
6. **Starta servern:**

---
---

### 1. Import av moduler:
- Jag använde Express.js-ramverket för att skapa en webbserver och kommunicera med en PostgreSQL-databas via det pg-paketet. Därefter importerade jag moduler såsom pg, express och body-parser för att hantera HTTP-anrop och för att läsa in data från HTML-formulär.

### 2. Konfigurering av express-applikationen:
- "view engine", "ejs": Användes för att ange att EJS används som view engine för att rendera HTML-sidor.
- express.static("public"): Konfigurerar en statisk filserver för att serva statiska filer från katalogen "public".
- express.urlencoded({extended: true}): Middleware för att tolka inkommande request body från HTML-formulär.

### 3. Anslutning till databasen:
- för att Skapa ett objekt av Klient från pg-paketet för att koppla upp mot PostgreSQL-databasen skapade jag en env fil som definierade miljövariablerna där för att hämta dessa miljövariablerna när Anslutning till databasen sker.

### 4. Hantering av GET-förfrågningar:
- för att kunna hämta infformation använde jag app.get("/about") för att Hämta information från databastabellen kursData och visar sidan index med den hämtade informationen.

### 5. Hantering av POST-förfrågningar:
- använde app.post("/add_course/add") för att Visa sidan add_course efter en POST-begäran till /add_course/add.
- sedan hanterar app.post("/") en POST-begäran som kommer från ett HTML-formulär på rotvägen ("/"). använde if statement och SQL query för att Kontrollera inmatningsfälten, lägger till data i databasen och (res.render("add_course", { errors: errors }) skickar data till HTML-sidan genom att använda en variabel med namnet “errors” och värdet som matchar innehållet i den lokala variabeln errors. På det sättet kan felmeddelanden visas på sidan add_course och kommuniceras till användaren om inte fylla på formulären.

### 6. Starta servern:
i det här steget använde jag app.listen(process.env.PORT): Servern för att starta och lyssna på den port som är specificerad i miljövariabeln PORT.
