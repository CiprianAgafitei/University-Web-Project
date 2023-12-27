// ===========================SELEZIONE DATA==================================

document.addEventListener('DOMContentLoaded', function() {
    // Ottieni l'elemento dell'input date
    var dataInput = document.getElementById('dataSelezionata');

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

    dataInput.addEventListener('keydown', function(event) {
        event.preventDefault();
        return false;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Trova il paragrafo nel file incluso
    var paragrafoData = document.getElementById('data-description');

    // Aggiungi la classe 'appear' per attivare l'animazione
    paragrafoData.classList.add('appear');
});

// ===========================CREAZIONE CONTAINER==================================

document.addEventListener('DOMContentLoaded', function () {
    var containerSection = document.getElementById('fieldContainerSection');
    var confirmationButtonContainer = document.getElementById('confirmationButtonContainer');
    var confirmationButton = document.getElementById('confirmationButton');
    var selectedButtons = [];

    // Call the function to initially populate fields
    updateFieldContainers();

    function getRandomName() {
        var names = ['Field A', 'Field B', 'Field C', 'Field D', 'Field E'];
        var randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    }

    function updateFieldContainers() {
        // Clear existing containers
        containerSection.innerHTML = '';

        // Generazione container
        for (var i = 0; i < 3; i++) {
            var fieldContainer = document.createElement('div');
            fieldContainer.className = 'field-container';

            var fieldName = document.createElement('h2');
            fieldName.textContent = getRandomName();

            var timeButtonsContainer = document.createElement('div');
            timeButtonsContainer.className = 'time-buttons';

            // Esempio
            var timeOptions = ['10:00 AM', '12:00 PM','10:00 AM', '12:00 PM','10:00 AM', '12:00 PM'];
            var hasScrolled = false

            timeOptions.forEach(function (option) {
                var timeButton = document.createElement('input');
                timeButton.type = 'button';
                timeButton.value = option;
                timeButton.addEventListener('click', function () {
                    timeButton.classList.toggle('selected');
                    updateSelectedButtons(timeButton);
                    updateConfirmationButtonVisibility();
                    if (!hasScrolled) {
                        scrollToConfirmationButton();
                        hasScrolled = true;
                    }
                });
                timeButtonsContainer.appendChild(timeButton);
            });

            fieldContainer.appendChild(fieldName);
            fieldContainer.appendChild(timeButtonsContainer);
            containerSection.appendChild(fieldContainer);
        }
    }

    confirmationButton.addEventListener('click', function () {
        alert('Pagina conclusione prenotazione');
    });

    function updateSelectedButtons(clickedButton) {
        // Update the selected buttons array
        if (clickedButton.classList.contains('selected')) {
            selectedButtons.push(clickedButton);
        } else {
            selectedButtons = selectedButtons.filter(button => button !== clickedButton);
        }
    }

    function updateConfirmationButtonVisibility() {
        // Show or hide the confirmation button based on selection
        if (selectedButtons.length > 0) {
            confirmationButtonContainer.style.opacity = '1';
        } else {
            confirmationButtonContainer.style.opacity = '0';
        }
    }

    var dataSelezionata = document.getElementById('dataSelezionata');

    dataSelezionata.addEventListener('change', function () {
        var selectedDate = new Date(dataSelezionata.value);
        var today = new Date();
        var oneMonthFromToday = new Date();
        oneMonthFromToday.setMonth(today.getMonth() + 1);

        if (selectedDate < today) {
            // Date is before today, display error popup
            displayErrorPopup("Si prega di selezionare una data successiva alla data attuale");
            dataSelezionata.value = today; // Clear the invalid date
            updateFieldContainers();
        } else if (selectedDate > oneMonthFromToday) {
            // Date is more than one month from today, display error popup
            displayErrorPopup("Si prega a selezionare una data compresa tra la data corrente ed un mese dalla data corrente");
            dataSelezionata.value = today; // Clear the invalid date
            updateFieldContainers();
        } else {
            updateFieldContainers();
        }
    });

    function closeDateSelectionDialog() {
        var datePicker = document.getElementById('dataSelezionata');
        if (datePicker) {
            datePicker.blur();
        }
    }

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


});

function scrollToConfirmationButton() {
    var confirmationButtonContainer = document.getElementById('confirmationButtonContainer');
    var yOffset = confirmationButtonContainer.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
}

/** Visualizzazione del form per il login consentendo l'autenticazione senza la necessità
 * di reindirizzare l'utente sulla pagina Accedi, portando a numerosi vantaggi.
 */
document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginAutentication');

    // Autenticazione tramite login
    loginButton.addEventListener('click', () => {
        overlay.style.display = 'block';
    });

    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close');
    const loginForm = document.getElementById('loginForm');

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
