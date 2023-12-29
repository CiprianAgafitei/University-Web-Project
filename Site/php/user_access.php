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
        $email = $_POST["email_user"];
        $conf_email = $_POST["conf_email_user"];

        // Verifica password coincidenti
        if($email != $conf_email) {
            // messaggio di errore -------------------------------
        }

        // Verifica se utente già presente nel db
        $result_check = $cscAccess->checkUser($email);

        if (!$result_check)     // Non serve inserire nuovamente l'utente nel db
        {
            $result = $cscAccess->insertNewUser($email, $nome);
            
            if ($result) // Operazione da fare per l'utente inserito correttamente
            {
                // --------------------------------------------------------
                echo "Utente inserito correttamente";
            } 
            else 
            {
                // --------------------------------------------------------
                echo "Utente non inserito";
            }
        }

        // Operazione per continuare la prenotazione -----------------------------------
    }

    // Chiusura della connessione
    $closeResult = $cscAccess->closeConnection();

    if ($closeResult) {
        echo "Connection Closed Successfully";
    } else {
        echo "Failed to close connection";
    }
?>