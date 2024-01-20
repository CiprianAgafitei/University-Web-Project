<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    setlocale(LC_ALL, 'it_IT');

    if (!isset($_SESSION)) {
        session_start();
    }

    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if ($conn)
    {
        if (isset($_POST['selectedDate'])) 
        {
            $attivita_scelta = $_SESSION['attivita_scelta'];
            $selectedDate = $_POST['selectedDate'];
            $orari = array();

            // Recupero di tutte le prenotazioni dell'attivita scelta e della data selezionata
            $reservedPrenotations = $cscAccess->getReservedPrenotations($selectedDate, $attivita_scelta);
            if ($reservedPrenotations !== null)
            {
                foreach ($reservedPrenotations as $prenotazione) {
                    $orari[] = $prenotazione['ora'];
                }
            }
            echo json_encode($orari);
        }
    }
    $closeResult = $cscAccess->closeConnection();
?>