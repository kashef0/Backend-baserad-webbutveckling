
const url = "mongodb+srv://dbcompany:qw9wi6JLMGY1vjj8@atlascluster.egpcvs9.mongodb.net/?retryWrites=true&w=majority";
// funktion för att radera en rad data
async function deleteData(event) {
    const button = event.target;
    const rowId = button.dataset.rowId;                
    const rowEl = document.getElementById(`row-${rowId}`);
    console.log(rowEl);
    try {
        const response = await fetch(`${url}/${rowId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("misslyckades att ta bort rad data med ID: " + rowId);
        }

        
        if (rowEl) {
            rowEl.remove();
        }
    } catch (error) {
        console.error("det går inte att radera data:", error);
    }
}
export { deleteData };