<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    session_start();

    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if (isset($_POST['selectedDate'])) 
    {
        if ($conn) 
        {
            $selectedDate = $_POST['selectedDate'];
            $result = $cscAccess->getReservedPrenotations($selectedDate);
            echo json_encode($result);  
        }
    }
        
    $closeResult = $cscAccess->closeConnection();
    

    // Salvataggio data e orari selezionati con prenotazione temporanea su server per 10 minuti

?>
