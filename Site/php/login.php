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
        $email = $_POST["email"];
        $password = $_POST["password"];

        $result = $cscAccess->checkLoginClientCredentials($email, $password);
        
        if ($result) // Operazione da fare per l'utente registrato
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
