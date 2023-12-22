
window.onload = function() {
    // Nasconde la seconda parte e mostra la prima
    document.getElementById('set-prenotation').style.display = "block";
    document.getElementById('end-prenotation').style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    let countdownInterval;

    const display = document.getElementById("countdown");
    const startButton = document.getElementById("continueButton");
    const circle = document.getElementById("circle");

    startButton.addEventListener('click', function() {
        // Avvia il conto alla rovescia di 10 minuti
        countdownInterval = startCountdown(10, display); 

        // Nasconde la prima sezione e mostra la seconda
        document.getElementById('set-prenotation').style.display = "none";
        document.getElementById('end-prenotation').style.display = "block";

        // Scorre in cima alla pagina
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const backButton = document.getElementById("back-set-prenot");

    backButton.addEventListener('click', function() {
        // Ferma il contro alla rovescia
        stopCountdown();
        // Aggiorna il valore di "display" su 10:00 in modo da evitare errori cliccando nuovamente conferma
        display.textContent = "10:00";
        // Ritorna a mostrare gli elementi principali e a nascondere i secondari
        document.getElementById('set-prenotation').style.display = "block";
        document.getElementById('end-prenotation').style.display = "none";
    });

    // Funzione per avviare il conto alla rovescia
    function startCountdown(duration, display) {
        let timer = duration * 60;

        const countdownInterval = setInterval(function() {
            var minutes = Math.floor(timer / 60); // Calcolo dei minuti
            var seconds = timer % 60; // Calcolo dei secondi

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;

            // Calcola la percentuale rimanente del tempo
            percentage = (timer / (duration * 60)) * 100;

            circleTimer.style.background = `conic-gradient(rgb(226, 157, 29) ${percentage}%, transparent ${percentage}%)`;

            if (--timer < 0) {
                clearInterval(countdownInterval);
                circle.style.background = "transparent";
            }
        }, 1000);

        // Ritorna l'intervallo per poterlo utilizzare esternamente
        return countdownInterval; 
    }

    // Ferma il conto alla rovescia
    function stopCountdown() {
        clearInterval(countdownInterval);
    }
});
