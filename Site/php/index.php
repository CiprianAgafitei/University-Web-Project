<?php
    include 'CSCAccess.php';

    $cscAccess = new \CSC\CSCAccess();

    $connectionResult = $cscAccess->openConnection();

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