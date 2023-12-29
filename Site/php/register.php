<?php
    include 'CSCAccess.php';

    $cscAccess = new \CSC\CSCAccess();

    $conn = $cscAccess->openConnection();

    // Verifica della connessione
    if (!$conn) {
        die("Connessione fallita");
    }

    // Controllo se è stata inviata una richiesta POST
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = $_POST["nome"];
        $cognome = $_POST["cognome"];
        $email = $_POST["email_new_client"];
        $password = $_POST["pass_new_client"];
        $conf_password = $_POST["conf_pass_new_client"];

        // Verifica se l'utente ha già un account
        $check_registered_user = $cscAccess->checkRegisteredClient($email);

        if ($check_registered_user) {
            // Utente già registrato -----------------------------
        }

        // Verifica password coincidenti
        if($password != $password) {
            // messaggio di errore -------------------------------
        }

        $result = $cscAccess->insertNewClient($email, $nome, $cognome, hash('sha256', $password));
        
        if ($result) // Operazione da fare per l'utente registrato correttamente
        {
            // --------------------------------------------------------
            echo "Utente registrato correttamente";
        } 
        else 
        {
            // --------------------------------------------------------
            echo "Utente non registrato";
        }
    }

    // Chiusura della connessione
    $closeResult = $cscAccess->closeConnection();

    if ($closeResult) {
        echo "Connection Closed Successfully";
    } else {
        echo "Failed to close connection";
    }
?>