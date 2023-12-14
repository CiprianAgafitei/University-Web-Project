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
                var timeButton = document.createElement('button');
                timeButton.textContent = option;
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
});

function scrollToConfirmationButton() {
    var confirmationButtonContainer = document.getElementById('confirmationButtonContainer');
    var yOffset = confirmationButtonContainer.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
}