<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    


    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if($connectionResult) {
        echo "Connected Successfully";

        // Chiusura della connessione
        $closeResult = $cscAccess->closeConnection();
        
        if ($closeResult) {
            echo "Connection Closed Successfully";
        } else {
            echo "Failed to close connection";
        }
    }
    else {
        echo "Failed to connect to the database";
    }
?>
