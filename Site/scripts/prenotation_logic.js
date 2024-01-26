window.onload = function() {
    document.getElementById('set-prenotation').style.display = "block";
    document.getElementById('end-prenotation').style.display = "none";
    document.getElementById('show-pren-details').style.display = "none";
    document.getElementById('logged-in-confirmation').style.display = "none";
    document.getElementById('modal').style.display = 'block';
    document.getElementById('time-elapsed').style.display = 'none';

    // GESTIONE MENU
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            document.querySelector("header").classList.add('is-scrolling');
        }
        else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_button = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_button.addEventListener('click', function() {
        menu_button.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}

window.addEventListener('DOMContentLoaded', checkWindowSize);
window.addEventListener('resize', checkWindowSize);

//===========================SELEZIONE DATA==================================
document.addEventListener('DOMContentLoaded', function () {
    var paragrafoData = document.getElementById('data-description');

    // Aggiungi la classe 'appear' per attivare l'animazione
    paragrafoData.classList.add('appear');
});

const display = document.getElementById("countdown");
const circle = document.getElementById("circle");
let countdownInterval;
var informazioni_prenotazione;

// ===========================CREAZIONE CONTAINER==================================
document.addEventListener('DOMContentLoaded', function () 
{
    function defaultDate() {
        var dataSelezionata = document.getElementById('dataSelezionata');
        var today = new Date();
        var formattedDate = today.toISOString().split('T')[0];
        dataSelezionata.value = formattedDate;
    
        // Trigger the database query
        var selectedDate = new Date(dataSelezionata.value).toISOString().split('T')[0];      
        fetch('../php/dateSelect.php', {
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
    
    defaultDate();

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
        fieldContainer.id = chosenSport;

        var fieldName = document.createElement('h2');
        fieldName.textContent = chosenSport.charAt(0).toUpperCase() + chosenSport.slice(1);

        var timeButtonsContainer = document.createElement('div');
        timeButtonsContainer.className = 'time-buttons';

        var allTimeOptions = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];

        var timeOptions = allTimeOptions.filter(element => !data.includes(element));

        if (timeOptions.length == 0) {
            var notAvailable = document.createElement('p');
            notAvailable.textContent = "La disponibilità dei campi è esaurita. Si prega di selezionare un'altra data.";
            fieldContainer.appendChild(fieldName);
            fieldContainer.appendChild(notAvailable);
        }
        else {
            var hasScrolled = false;

            timeOptions.forEach(function (option) {
                var timeButton = document.createElement('input');
                timeButton.type = 'button';
                timeButton.value = option;

                timeButton.addEventListener('click', function () {
                    if (nrSelectedButtons < 2 || timeButton.classList.contains('selected')) {
                        timeButton.classList.toggle('selected');
                        updateSelectedButtons(timeButton);
                        updateConfirmationButtonVisibility();
                        if (!hasScrolled) {
                            scrollToContinueButton();
                            hasScrolled = true;
                        }
                        nrSelectedButtons = document.querySelectorAll('.selected').length;
                    }
                });
                timeButtonsContainer.appendChild(timeButton);
            });
            fieldContainer.appendChild(fieldName);
            fieldContainer.appendChild(timeButtonsContainer);
        }
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
        today.setHours(0, 0, 0, 0);
        var oneMonthFromToday = new Date();
        oneMonthFromToday.setMonth(today.getMonth() + 1);

        if (chosenDate < today) {
            displayErrorPopup("Si prega di non selezionare una data passata");
            defaultDate();
        } 
        else if (chosenDate > oneMonthFromToday) {
            displayErrorPopup("Si prega a selezionare una data compresa tra la data corrente ed un mese dalla data corrente");
            defaultDate();
        }
        else {
            // Gestione data-selezionata-ricerca orari disponibili
            var selectedDate = new Date(dataSelezionata.value).toISOString().split('T')[0];      
            fetch('../php/dateSelect.php', {
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

    /** SEZIONE LEGATA AL COUNTDOWM */
    const startButton = document.getElementById("continueButton");
    const circle = document.getElementById("circle");

    /** AVVIO DEL CONTO ALLA ROVESCIA */
    function startCountdown(duration) {
        let timer = duration * 60;

        const countdownInterval = setInterval(function() {
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            document.getElementById("countdown").textContent = minutes + ":" + seconds;

            percentage = (timer / (duration * 60)) * 100;

            circleTimer.style.background = `conic-gradient(rgb(226, 157, 29) ${percentage}%, transparent ${percentage}%)`;

            // Tempo scaduto
            if (--timer < 0) {
                clearInterval(countdownInterval);

                document.getElementById('overlay').style.display = 'block';
                document.getElementById('modal').style.display = 'none';
                document.getElementById('time-elapsed').style.display = 'block';
            }
        }, 1000);
        return countdownInterval; 
    }
    
    var risultato_prenotazione = [];
 
    /** Pulsante di avvio conto alla rovescia/per bloccare la risorsa nel database */
    startButton.addEventListener('click', function () 
    {   
        // Blocco della risorsa nel database
        var selectedDate = document.getElementById('dataSelezionata').value;

        const data = new URLSearchParams();
        data.append('selectedDate', selectedDate);
        data.append('selectedButton1', selectedButtons[0] ? selectedButtons[0].value : null);
        data.append('selectedButton2', selectedButtons[1] ? selectedButtons[1].value : null);

        fetch('../php/bloccaPrenotazione.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString()
        })
        .then(response => response.text())
        .then(data => {
            risultato_prenotazione = JSON.parse(data);

            var orario1 = risultato_prenotazione[0] && 'ora_1' in risultato_prenotazione[0] ? risultato_prenotazione[0]['ora_1'] : null;
            var orario2 = risultato_prenotazione[1] && 'ora_2' in risultato_prenotazione[1] ? risultato_prenotazione[1]['ora_2'] : null;
            var campo1 = risultato_prenotazione[0] && 'campo1' in risultato_prenotazione[0] ? risultato_prenotazione[0]['campo1'] : null;
            var campo2 = risultato_prenotazione[1] && 'campo2' in risultato_prenotazione[1] ? risultato_prenotazione[1]['campo2'] : null;

            // Inserimento testi
            updateTextFields(chosenSport, selectedDate, orario1, orario2, campo1, campo2);

            const info_prenotazione = new URLSearchParams();
            info_prenotazione.append('orario1', orario1);
            info_prenotazione.append('campo1', campo1);
            info_prenotazione.append('orario2', orario2);
            info_prenotazione.append('campo2', campo2);

            informazioni_prenotazione = info_prenotazione;

            // Distinzione per utente loggato e non
            if (startButton.value === 'continua') 
            {
                countdownInterval = startCountdown(10);
                document.getElementById('set-prenotation').style.display = "none";
                document.getElementById('end-prenotation').style.display = "block";

                /** Annullamento della scelta della data e degli orari selezionati dell'utente non loggato */
                const backButton = document.getElementById("back-set-prenot");
                backButton.addEventListener('click', function () {
                    // Rilascio della risorsa (rimozione della prenotazione dal database)
                    fetch('../php/rilascioPrenotazione.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: info_prenotazione.toString()
                    })
                    stopCountdown();
                    document.getElementById("countdown").textContent = "10:00";
                    document.getElementById('set-prenotation').style.display = "block";
                    document.getElementById('end-prenotation').style.display = "none";
                });
            } 
            else if (startButton.value === 'conferma') {
                document.getElementById('set-prenotation').style.display = "none";
                document.getElementById('show-pren-details').style.display = "block";
                document.getElementById('logged-in-confirmation').style.display = "block";

                /** Annullamento della scelta della data e degli orari selezionati dell'utente loggato */
                const backToTimes = document.getElementById("back-to-times");
                backToTimes.addEventListener('click', function () {
                    // Rilascio della risorsa (rimozione della prenotazione dal database)
                    fetch('../php/rilascioPrenotazione.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: info_prenotazione.toString()
                    });
                    document.getElementById('set-prenotation').style.display = "block";
                    document.getElementById('show-pren-details').style.display = "none";
                    document.getElementById('logged-in-confirmation').style.display = "none";
                });
            } 
        })
        .catch(error => console.error('Errore:', error));       
        scrollToTop();
    });

    /** AGGIORNAMENTO DEI VALORI DEI PARAGRAFI FINALI RELATIVI AI DETTAGLI DELLA PRENOTAZIONE */
    function updateTextFields(sport, data, ora1, ora2, campo1, campo2) {
        document.getElementById('chosen_activity').textContent = sport;
        document.getElementById('chosen_date').textContent = data;

        // Verifica e gestione del primo orario scelto
        var chosenTime1Div = document.getElementById('div-time1');
        if (chosenTime1Div) {
            if (ora1 != null && campo1 != null) {
                chosenTime1Div.style.display = 'block';
                var testo = document.createElement('p');
                testo.textContent = "Ora: " + ora1 + " - Codice campo: " + campo1;
                chosenTime1Div.appendChild(testo);
            } else {
                chosenTime1Div.style.display = 'none';
            }
        }
        // Verifica e gestione del secondo orario scelto
        var chosenTime2Div = document.getElementById('div-time2');
        if (chosenTime2Div) {
            if (ora2 != null && campo2 != null) {
                chosenTime2Div.style.display = 'block';
                var testo = document.createElement('p');
                testo.textContent = "Ora: " + ora2 + " - Codice campo: " + campo2;
                chosenTime2Div.appendChild(testo);
            } else {
                chosenTime2Div.style.display = 'none';
            }
        }
    }

    /** Scorrimento verso il pulsante di conferma della scelta di data e orari */
    function scrollToContinueButton() {
        var continueButton = document.getElementById('continueButton');
        var yOffset = continueButton.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: yOffset, behavior: 'smooth' });
    }

    /** Visualizzazione del form per il login consentendo l'autenticazione senza la necessità
     * di reindirizzare l'utente sulla pagina Accedi, portando a numerosi vantaggi.
     */
    const loginButton = document.getElementById('loginAutentication');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close');

    // Autenticazione tramite login
    loginButton.addEventListener('click', () => {
        overlay.style.display = 'block';
    });

    closeButton.onclick = function() {
        overlay.style.display = 'none';
    };

    // Possibilità di nascondere la finestra modale cliccando fuori da essa
    // Aggiungi un evento al documento per nascondere la finestra modale
    window.addEventListener('click', (event) => {
        const timeElapsed = document.getElementById('time-elapsed').style.display;

        if (event.target === overlay) {
            overlay.style.display = 'none';
            
            if (timeElapsed === 'block') {
                aggiornaAContenutoIniziale();
                scrollToTop();
            }
        }
    });

    // Gestione della visualizzazione degli errori sul form di login
    var email_error_login = document.getElementById('errore_email');
    var pass_error_login = document.getElementById('errore_password');

    if (email_error_login && email_error_login.textContent.trim() === '') {
        email_error_login.style.display = 'none';
    }
    if (pass_error_login && pass_error_login.textContent.trim() === '') {
        pass_error_login.style.display = 'none';
    }

    /* =====================================================
       |   GESTIONE INSERIMENTO INFORMAZIONI DI CONTATTO   |
       =====================================================*/
    var nome_error_contat = document.getElementById('errore_nome_info');
    var email_error_contat = document.getElementById('errore_email_info');
    var conf_em_error_contat = document.getElementById('errore_conf_email');
    var checkBoxError = document.getElementById('errore_box'); 

    if (nome_error_contat && nome_error_contat.textContent.trim() === '') {
        nome_error_contat.style.display = 'none';
    }
    if (email_error_contat && email_error_contat.textContent.trim() === '') {
        email_error_contat.style.display = 'none';
    }
    if (conf_em_error_contat && conf_em_error_contat.textContent.trim() === '') {
        conf_em_error_contat.style.display = 'none';
    }
    if (checkBoxError && checkBoxError.textContent.trim() === '') {
        checkBoxError.style.display = 'none';
    }

    document.getElementById('submitForm').addEventListener('click', function() {
        var strutturaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var nome_contat = document.getElementById('nome').value.trim();
        var email_contat = document.getElementById('email_user').value.trim();
        var conf_em_contat = document.getElementById('conf_email_user').value.trim();
        var checkBox = document.getElementById('check-disclaimer');

        var nome_error_contat = document.getElementById('errore_nome_info');
        var email_error_contat = document.getElementById('errore_email_info');
        var conf_em_error_contat = document.getElementById('errore_conf_email');
        var checkBoxError = document.getElementById('errore_box');

        if (nome_contat === '' || nome_contat.length < 3) {
            nome_error_contat.textContent = "Il campo nome è richiesto e deve avere una lunghezza di almeno 3 caratteri.";
            nome_error_contat.style.display = 'block';
            return;
        } else
            nome_error_contat.textContent = '';
    
        if (email_contat === '') {
            email_error_contat.textContent = "Il campo email è richiesto.";
            email_error_contat.style.display = 'block';
            return;
        } else if (!strutturaEmail.test(email_contat)) {
            email_error_contat.textContent = "Il formato email non è valido.";
            email_error_contat.style.display = 'block';
            return;
        } else
            email_error_contat.textContent = '';
    
        if (conf_em_contat === '') {
            conf_em_error_contat.textContent = "Il campo conferma email non può essere vuoto.";
            conf_em_error_contat.style.display = 'block';
            return;
        }
        else if (conf_em_contat !== email_contat) {
            conf_em_error_contat.textContent = "Le due mail non coincidono.";
            conf_em_error_contat.style.display = 'block';
            return;
        } else
            conf_em_error_contat.textContent = '';
    
        if (!checkBox.checked) {
            checkBoxError.textContent = "Accetta i termini e le condizioni per continuare";
            checkBoxError.style.display = 'block';
            return;
        } else
            checkBoxError.textContent = '';
    
        // Tutto ok -> nessun errore
        const data = new URLSearchParams();
        data.append('nome', nome_contat);
        data.append('email', email_contat);
    
        // Aggiungi i parametri da informazioni_prenotazione a data
        for (const pair of informazioni_prenotazione.entries()) {
            data.append(pair[0], pair[1]);
        }
    
        fetch('../php/aggiornaUserPrenot.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data
        })
        .catch(error => console.error('Errore:', error));
    
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('set-prenotation').style.display = 'none';
        document.getElementById('end-prenotation').style.display = 'none';
        document.getElementById('show-pren-details').style.display = 'block';
        document.getElementById('logged-in-confirmation').style.display = 'none';
        scrollToTop();
        return true;    
    });

    // Gestione pulsante della finestra di fine sessione cliccato
    document.getElementById('submit-session-ended').addEventListener('click', function() {
        aggiornaAContenutoIniziale();
        scrollToTop();
    });

    /** RIPORTA IL CONTENUTO COME SE LA PAGINA FOSSE AGGIORNATA MA MANTIENE LE SELEZIONI DI DATA E ORARI
      *          (inoltre rilascia la risorsa del database che era stata bloccata)       */
    function aggiornaAContenutoIniziale() {
        fetch('../php/rilascioPrenotazione.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: informazioni_prenotazione.toString()
        })
        document.getElementById('set-prenotation').style.display = "block";
        document.getElementById('end-prenotation').style.display = "none";
        document.getElementById('show-pren-details').style.display = "none";
        document.getElementById('logged-in-confirmation').style.display = "none";
        document.getElementById('modal').style.display = 'block';
        document.getElementById('time-elapsed').style.display = 'none';
    }
});

/** SCORRIMENTO IN TESTA ALLA PAGINA */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/** FERMATO IL CONTO ALLA ROVESCIA */
function stopCountdown() {
    document.getElementById("countdown").textContent = "10:00";
    clearInterval(countdownInterval);
}

/** VALIDAZIONE DEI FORM DI LOGIN SULLA PAGINA DI PRENOTAZIONE */
function validateFormLogin(event) {
    event.preventDefault();

    var email = document.getElementById('email').value.trim();
    var password = document.getElementById('password').value.trim();

    var email_error_login = document.getElementById('errore_email');
    var pass_error_login = document.getElementById('errore_password');

    // EMAIL
    if (email === '') {
        email_error_login.textContent = 'Il campo email è vuoto.';
        email_error_login.style.display = 'block';
        return false;
    }
    else 
        email_error_login.textContent = '';

    // PASSWORD
    if (password === '') {
        pass_error_login.textContent = 'Il campo password è vuoto.';
        pass_error_login.style.display = 'block';
        return false;
    }
    else
        pass_error_login.textContent = '';

    // Gestione controllo credenziali-lato server
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);

    // Aggiungi i parametri da informazioni_prenotazione a data
    for (const pair of informazioni_prenotazione.entries()) {
        data.append(pair[0], pair[1]);
    }

    fetch('../php/verificaCredenziali.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data
    })
    .then(response => response.text())
    .then(data => {
        esito = JSON.parse(data);

        document.getElementById('messaggioLogin').textContent = "";

        if (esito['loginResult']) {
            stopCountdown();
            document.getElementById('messaggioLogin').textContent = "";

            document.getElementById('overlay').style.display = 'none';
            document.getElementById('set-prenotation').style.display = 'none';
            document.getElementById('end-prenotation').style.display = 'none';
            document.getElementById('show-pren-details').style.display = 'block';
            document.getElementById('logged-in-confirmation').style.display = 'block';

            /** Annullamento della scelta della data e degli orari selezionati dell'utente loggato */
            const backToTimes = document.getElementById("back-to-times");
            backToTimes.addEventListener('click', function () {
                // Rilascio della risorsa (rimozione della prenotazione dal database)
                fetch('../php/rilascioPrenotazione.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: informazioni_prenotazione.toString()
                });
                document.getElementById('set-prenotation').style.display = "block";
                document.getElementById('show-pren-details').style.display = "none";
                document.getElementById('logged-in-confirmation').style.display = "none";
                scrollToTop();
            });
            return true;   // credenziali corrette
        }
        else if ('registeredResult' in esito) {
            if (esito['registeredResult'])
                document.getElementById('messaggioLogin').textContent = "La password inserita non è corretta.";   // credenziali sbagliate
            else
                document.getElementById('messaggioLogin').textContent = "Utente non registrato.";   // utente non registrato
        }
        return false;
    })
    .catch(error => console.error('Errore:', error));
}

function checkWindowSize() {
    const screenWidth = window.innerWidth;
    const mobileMenu = document.querySelector('.mobile-nav');
    const desktopMenu = document.getElementById('menu');
    const mobileMenuButton = document.querySelector('.bar');

    if (screenWidth <= 1032) {
        // Schermo piccolo o uguale a 1032px (mobile)
        mobileMenu.setAttribute('aria-hidden', 'false');
        mobileMenu.setAttribute('tabindex', '0');
        mobileMenuButton.setAttribute('aria-hidden', false);
        mobileMenuButton.setAttribute('tabindex', '-1');
        desktopMenu.setAttribute('aria-hidden', 'true');
        desktopMenu.setAttribute('tabindex', '-1');
    } else {
        // Schermo più grande di 1032px (desktop)
        mobileMenu.setAttribute('aria-hidden', 'true');
        mobileMenu.setAttribute('tabindex', '-1');
        mobileMenuButton.setAttribute('aria-hidden', true);
        mobileMenuButton.setAttribute('tabindex', '0');
        desktopMenu.setAttribute('aria-hidden', 'false');
        desktopMenu.setAttribute('tabindex', '0');
    }
}
