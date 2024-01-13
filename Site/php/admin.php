<?php
    include_once "CSCAccess.php"; 

    use CSC\CSCAccess;

    $csc = new CSCAccess();
    
    if($csc->openConnection()) {
        $prenotations = $csc->getAllPrenotations();
        $messages = $csc->getAllRequests();
        $csc->closeConnection();
        
        echo json_encode($prenotations);
        echo json_encode($messages);
    } else {
        echo json_encode(array("error" => "Unable to connect to database."));
    }
?>
