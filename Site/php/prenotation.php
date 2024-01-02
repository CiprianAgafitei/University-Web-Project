<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    


    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    // Verifica della connessione
    if (!$conn) {
        die("Connessione fallita");
    } 

    // Controllo se è stata inviata una richiesta POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $data_selezionata = $_POST["dataSelezionata"];
        
        // Verifica data non vuota != gg/mm/aaaa

        // Aggiornamento dei pulsanti in base alla disponibilità oraria

        // Salvataggio data e orari selezionati con prenotazione temporanea su server per 10 minuti

        
    }

    // Chiusura della connessione
    $closeResult = $cscAccess->closeConnection();

    if ($closeResult) {
        echo "Connection Closed Successfully";
    } else {
        echo "Failed to close connection";
    }
?>