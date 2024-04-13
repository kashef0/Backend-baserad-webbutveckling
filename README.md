# Beskrivning av lösning

## Funktioner för Interaktion med Data

### addData-funktionen

Detta är en asynkron funktion som aktiveras när användaren skickar formuläret för att lägga till ny arbetslivserfarenhet. Följande steg utförs av funktionen:

1. Funktionen kommer att läsa värdena av företagsnamn, jobbtitel, ort, startdatum, slutdatum och beskrivning från fälten på formuläret.
2. POST request skickas till den angivna URL med insamlade data i JSON-format i request bodyn.
3. Om svaret är lyckat, flyttas användaren tillbaka till index.html-sidan där de kan se den uppdaterade listan av arbetslivserfarenheter.

### deleteData-funktionen

Detta är funktionen som använder 'Delete' metoden för att ta bort data från en databas genom att ansluta till en webbtjänst. Utan att ladda om sidan kan radering ske användande Fetch API och asynkron JavaScript.

Parametern som funktionen tar emot är ett händelseobjekt och sedan extraherar den värdet av knappen 'rowId' med hjälp av dataset. Därefter hämtas referensen till HTML-elementet som representerar raden som ska tas bort baserat på rowId. Slutligen skickas en DELETE-begäran till den angivna API:en.

### visaData-funktionen

När allt DOM-innehåll har laddats fungerar en funktion med en eventlyssnare för att säkerställa att alla nödvändiga element är tillgängliga innan någon interaktion som händer. Sedan hämtas referensen i dom-trädet. Formuläret som har id 'add_data' erhålls då, vilket innebär att vi kan ansluta formuläret till en händelselyssnare och hantera användarinmatningsdata genom det. Efter det gör jag en GET-förfrågan för att hämta befintlig data från webbtjänsten genom att skicka begäran till den angivna URLen. Om begäran är framgångsrik, tolkas svaret som JSON och funktionen 'visaData' anropas med de erhållna dataraderna för att visa dem på webbsidan.


## Testkörning
Du kan testköra webbapplikationen genom att besöka den länken [Jobb List](https://moment2-2--jobb-erfarenhet.netlify.app/)
