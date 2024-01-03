//===========================SELEZIONE DATA==================================

document.addEventListener('DOMContentLoaded', function () {
    // Imposta la data minima consentita come la data attuale
    var dataAttuale = new Date();
    var annoAttuale = dataAttuale.getFullYear();
    var meseAttuale = ('0' + (dataAttuale.getMonth() + 1)).slice(-2);
    var giornoAttuale = ('0' + dataAttuale.getDate()).slice(-2);
    var dataMinima = annoAttuale + '-' + meseAttuale + '-' + giornoAttuale;

    // Calcola la data massima consentita (data corrente + 1 mese)
    var dataMassima = new Date(dataAttuale);
    dataMassima.setMonth(dataMassima.getMonth() + 1);
    var annoMassimo = dataMassima.getFullYear();
    var meseMassimo = ('0' + (dataMassima.getMonth() + 1)).slice(-2);
    var giornoMassimo = ('0' + dataMassima.getDate()).slice(-2);
    var dataMassimaString = annoMassimo + '-' + meseMassimo + '-' + giornoMassimo;

    // Imposta gli attributi min e max sull'elemento input
    dataInput.setAttribute('min', dataMinima);
    dataInput.setAttribute('max', dataMassimaString);

    // Imposta la data di default come la data attuale
    dataInput.setAttribute('value', dataMinima);

    dataInput.addEventListener('keydown', function (event) {
        event.preventDefault();
        return false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var paragrafoData = document.getElementById('data-description');

    // Aggiungi la classe 'appear' per attivare l'animazione
    paragrafoData.classList.add('appear');
});

// ===========================CREAZIONE CONTAINER==================================

document.addEventListener('DOMContentLoaded', function () {
    var containerSection = document.getElementById('fieldContainerSection');

    var confirmationButtonContainer = document.getElementById('confirmationButtonContainer');
    confirmationButtonContainer.style.display = 'none';

    var selectedButtons = [];        
    let nrSelectedButtons = 0;

    // Ottiene l'URL corrente
    var urlParams = new URLSearchParams(window.location.search);

    // Recupera il valore del parametro 'option' dall'URL che conterrà lo sport scelto
    var chosenSport = urlParams.get('option');

    /** Aggiornamento del contenitore contenente gli orari disponibili */
    function updateFieldContainers(data) {
        containerSection.innerHTML = '';

        var fieldContainer = document.createElement('div');
        fieldContainer.className = 'field-container';

        var fieldName = document.createElement('h2');
        fieldName.textContent = chosenSport;

        var timeButtonsContainer = document.createElement('div');
        timeButtonsContainer.className = 'time-buttons';

        var allTimeOptions = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

        var timeOptions = allTimeOptions.filter(element => !data.includes(element));

        timeOptions.forEach(function (option) {
            var timeButton = document.createElement('input');
            timeButton.type = 'button';
            timeButton.value = option;

            timeButton.addEventListener('click', function () {
                if (nrSelectedButtons < 2 || timeButton.classList.contains('selected')) {
                    timeButton.classList.toggle('selected');
                    updateSelectedButtons(timeButton);
                    updateConfirmationButtonVisibility();

                    nrSelectedButtons = document.querySelectorAll('.selected').length;
                }
            });
            timeButtonsContainer.appendChild(timeButton);
        });

        fieldContainer.appendChild(fieldName);
        fieldContainer.appendChild(timeButtonsContainer);
        containerSection.appendChild(fieldContainer);
    }

    /** Aggiornamento dell'elenco dei pulsanti selezionati */
    function updateSelectedButtons(clickedButton) {
        if (clickedButton.classList.contains('selected')) {
            selectedButtons.push(clickedButton);
        } else {
            selectedButtons = selectedButtons.filter(button => button !== clickedButton);
        }
    }

    /* Mostra o nascondi il pulsante per la conferma se, rispettivamente, è stato selezionato
     *   almeno un'opzione oraria oppure nessuna */
    function updateConfirmationButtonVisibility() {
        if (selectedButtons.length > 0) {
            confirmationButtonContainer.style.display = 'block';
        } else {
            confirmationButtonContainer.style.display = 'none';
        }
    }

    var dataSelezionata = document.getElementById('dataSelezionata');

    /** Controllo sulla data selezionata in modo che sia selezionabile solo
     *  quella successiva all'ora attuale del giorno attuale. */
    dataSelezionata.addEventListener('change', function () {
        var chosenDate = new Date(dataSelezionata.value);
        var today = new Date();
        var oneMonthFromToday = new Date();
        oneMonthFromToday.setMonth(today.getMonth() + 1);

        if (chosenDate < today) {
            displayErrorPopup("Si prega di selezionare una data successiva alla data attuale");
            dataSelezionata.value = today;
            containerSection.innerHTML = '';
        } 
        else if (chosenDate > oneMonthFromToday) {
            displayErrorPopup("Si prega a selezionare una data compresa tra la data corrente ed un mese dalla data corrente");
            dataSelezionata.value = today;
            containerSection.innerHTML = '';
        }
        else {
            // Gestione data-selezionata-ricerca orari disponibili
            var selectedDate = new Date(dataSelezionata.value).toISOString().split('T')[0];      
            fetch('php/prenotation.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'selectedDate=' + selectedDate
            })
            .then(response => response.text())     
            .then(data => {
                updateFieldContainers(data);
            })     
            .catch(error => console.error('Errore:', error));
        }
    });

    /** Effetti per la chisura della selezione della data */
    function closeDateSelectionDialog() {
        var datePicker = document.getElementById('dataSelezionata');
        if (datePicker) {
            datePicker.blur();
        }
    }

    /** Visualizzazione dei messaggi di errore relativi all'inserimento erratto della data */
    function displayErrorPopup(errorMessage) {
        closeDateSelectionDialog();
        var popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';

        var popup = document.createElement('div');
        popup.className = 'popup';

        var errorText = document.createElement('p');
        errorText.textContent = errorMessage;

        var closeButton = document.createElement('input');
        closeButton.type = 'button';
        closeButton.value = 'Ho capito';
        closeButton.addEventListener('click', function () {
            document.body.removeChild(popupContainer);
            document.body.style.overflow = 'auto';
        });

        popup.appendChild(errorText);
        popup.appendChild(closeButton);
        popupContainer.appendChild(popup);

        document.body.appendChild(popupContainer);
        document.body.style.overflow = 'hidden';
    }
 
    /* Aggiunta di un listener al form per intercettare la conferma della data e degli orari 
    document.getElementById('set-prenotation').addEventListener('submit', function(event) {
        var buttons = document.querySelectorAll('.dynamic-button');
        var selectedValues = [];

        // Loop sui bottoni per verificare quelli selezionati
        buttons.forEach(function(button) {
            if (button.classList.contains('selected')) {
                selectedValues.push(button.value);
            }
        });

        // Assegna i valori dei bottoni selezionati all'input nascosto
        document.getElementById('selectedButtons').value = selectedValues.join(',');

        return true;
    });*/
});

/** Visualizzazione del form per il login consentendo l'autenticazione senza la necessità
 * di reindirizzare l'utente sulla pagina Accedi, portando a numerosi vantaggi.
 */
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginAutentication');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close');
    const loginForm = document.getElementById('loginForm');

    // Autenticazione tramite login
    loginButton.addEventListener('click', () => {
        overlay.style.display = 'block';
    });

    // Nascondi la finestra modale quando si fa clic sul pulsante di chiusura
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });

    // Possibilità di nascondere la finestra modale cliccando fuori da essa
    // Aggiungi un evento al documento per nascondere la finestra modale
    window.addEventListener('click', (event) => {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });

    // Gestione dell'autenticazione dell'utente
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Inserisci qui la logica per gestire il login
    });
});
