window.onload = function() {
    document.getElementById('set-prenotation').style.display = "block";
    document.getElementById('end-prenotation').style.display = "none";
    document.getElementById('show-pren-details').style.display = "none";
    document.getElementById('logged-in-confirmation').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    let countdownInterval;

    const display = document.getElementById("countdown");
    const startButton = document.getElementById("continueButton");
    const circle = document.getElementById("circle");

    startButton.addEventListener('click', function () 
    {   
        // Distinzione per utente loggato e non
        if (startButton.value === 'continua') 
        {
            // Blocco della risorsa nel database
            var selectedDate = document.getElementById('dataSelezionata').value.toISOString().split('T')[0];      
            fetch('../php/bloccaPrenotazione.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: 'selectedDate=' + selectedDate
            })
            .then(response => response.text())
            .then(data => {
                
            })
            .catch(error => console.error('Errore:', error));

            countdownInterval = startCountdown(10, display);
            document.getElementById('set-prenotation').style.display = "none";
            document.getElementById('end-prenotation').style.display = "block";
        } 
        // Altrimenti interviene php
        else {
            // Rilascio della risorsa dal database
            
            document.getElementById('set-prenotation').style.display = "none";
            document.getElementById('show-pren-details').style.display = "block";
            document.getElementById('logged-in-confirmation').style.display = "block";
        }
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const backToTimes = document.getElementById("back-to-times");
    backToTimes.addEventListener('click', function () 
    {   
        document.getElementById('set-prenotation').style.display = "block";
        document.getElementById('show-pren-details').style.display = "none";
        document.getElementById('logged-in-confirmation').style.display = "none";
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const backButton = document.getElementById("back-set-prenot");
    backButton.addEventListener('click', function () {
        stopCountdown();
        display.textContent = "10:00";

        document.getElementById('set-prenotation').style.display = "block";
        document.getElementById('end-prenotation').style.display = "none";
    });

    function startCountdown(duration, display) {
        let timer = duration * 60;

        const countdownInterval = setInterval(function() {
            var minutes = Math.floor(timer / 60);
            var seconds = timer % 60;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            percentage = (timer / (duration * 60)) * 100;

            circleTimer.style.background = `conic-gradient(rgb(226, 157, 29) ${percentage}%, transparent ${percentage}%)`;

            if (--timer < 0) {
                clearInterval(countdownInterval);
                circle.style.background = "transparent";
            }
        }, 1000);

        return countdownInterval; 
    }

    function stopCountdown() {
        clearInterval(countdownInterval);
    }
});
