document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1;
    const rowsPerPage = 10;
    const rows = document.querySelector(".custom-table tbody").rows;
    const totalRows = rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    var pulsantePrec = document.getElementById('prevPage');
    var pulsanteSucc = document.getElementById('nextPage');

    updateButtons();

    function updateButtons() {
        // Disabilita opzione precedente se pagina 1
        if (currentPage == 1)
            pulsantePrec.disabled = true;
        else
            pulsantePrec.disabled = false;

        // Disabilita opzione successiva se ultima pagina
        if (currentPage == totalPages)
            pulsanteSucc.disabled = true;
        else
            pulsanteSucc.disabled = false;
    }

    function displayRows(start, end) {
        for (let i = 0; i < totalRows; i++) {
            rows[i].style.display = (i >= start && i < end) ? "" : "none";
        }
    }

    function changePage(next = true) {
        currentPage += (next ? 1 : -1);
        currentPage = Math.max(1, Math.min(currentPage, totalPages));

        updateButtons();

        let start = (currentPage - 1) * rowsPerPage;
        let end = start + rowsPerPage;
        displayRows(start, end);
    }

    // Inizializza la prima visualizzazione
    displayRows(0, rowsPerPage);

    // Aggiungi listener ai bottoni di navigazione
    pulsantePrec.addEventListener("click", () => changePage(false));
    pulsanteSucc.addEventListener("click", () => changePage(true));
});
