document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const rowsPerPage = 10;
    const rows = document.querySelector(".custom-table tbody").rows;
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    function displayRows(start, end) {
        for (let i = 0; i < totalRows; i++) {
            rows[i].style.display = (i >= start && i < end) ? "" : "none";
        }
    }

    function changePage(next = true) {
        if (totalPages <= 1) return; // Aggiunto controllo per gestire tabelle con meno di 10 righe

        currentPage += (next ? 1 : -1);  
        currentPage = Math.max(1, Math.min(currentPage, totalPages));

        let start = (currentPage - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        displayRows(start, end);
    }

    // Inizializza la prima visualizzazione
    displayRows(0, rowsPerPage);

    // Aggiungi listener ai bottoni di navigazione
    document.getElementById("prevPage").addEventListener("click", () => changePage(false));
    document.getElementById("nextPage").addEventListener("click", () => changePage(true));
});
