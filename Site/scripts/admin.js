document.addEventListener("DOMContentLoaded", function() {
    const viewReqSection = document.getElementById('requests-view');
    const viewPrenSection = document.getElementById('prenotations-view');
    const viewReqButton = document.getElementById('show-requests');
    const viewPrenButton = document.getElementById('show-prenotations');

    var currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "admin.php") {
        // Applica effetti per mostrare il pulsante "Visualizza richieste" abilitato
        viewReqSection.style.display = "block";
        viewReqButton.classList.add('disabled-effect');
        viewReqButton.removeAttribute('href');
        viewReqButton.setAttribute('aria-disabled', 'true');
        viewReqButton.setAttribute('tabindex', '-1');

        // Applica effetti per mostrare il pulsante "Visualizza prenotazioni" disabilitato
        viewPrenSection.style.display = "none";
        viewPrenButton.classList.remove('disabled-effect');
        viewPrenButton.setAttribute('href', '../php/admin_prenotView.php');
        viewPrenButton.setAttribute('aria-disabled', 'false');
        viewPrenButton.setAttribute('tabindex', '0');
    }
    else if (currentPage === "admin_prenotView.php") {
        // Applica effetti per mostrare il pulsante "Visualizza richieste" disabilitato
        viewReqSection.style.display = "none";
        viewReqButton.classList.remove('disabled-effect');
        viewReqButton.setAttribute('href', '../php/admin.php');
        viewReqButton.setAttribute('aria-disabled', 'false');
        viewReqButton.setAttribute('tabindex', '0');

        // Applica effetti per mostrare il pulsante "Visualizza prenotazioni" abilitato
        viewPrenSection.style.display = "block";
        viewPrenButton.classList.add('disabled-effect');
        viewPrenButton.removeAttribute('href');
        viewPrenButton.setAttribute('aria-disabled', 'true');
        viewPrenButton.setAttribute('tabindex', '-1');

        // Gestione delle prenotazioni
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
                pulsantePrec.classList.add('disabled-effect');
            else
                pulsantePrec.classList.remove('disabled-effect');

            // Disabilita opzione successiva se ultima pagina
            if (currentPage == totalPages)
                pulsanteSucc.classList.add('disabled-effect');
            else
                pulsanteSucc.classList.remove('disabled-effect');
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
        displayRows(0, rowsPerPage);

        pulsantePrec.addEventListener("click", function() {
            // Selezione della prima riga
            var firstRow = document.querySelector('firstRow');
            if (firstRow) {
                firstRow.focus();
            }
            changePage(false);
        });
        pulsanteSucc.addEventListener("click", function() {
            // Selezione della prima riga
            var firstRow = document.querySelector('.firstRow');
            if (firstRow) {
                firstRow.focus();
            }
            changePage(true);
        });
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Tab') {
            // Controlla se il focus sta uscendo dalla tua tabella
            var lastRow = document.querySelector('.lastRow');
    
            if (document.activeElement == lastRow) {
                event.preventDefault();
                pulsanteSucc.focus(); // Sposta il focus al pulsante next
            }
        }
    });
});
