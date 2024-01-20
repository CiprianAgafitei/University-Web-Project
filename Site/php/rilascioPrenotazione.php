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
    $results = array();

    $attivita_scelta = $_SESSION['attivita_scelta'];
    $data_selezionata = $_SESSION['data_scelta'];

    // Estrai i dati dagli oggetti nell'array
    $ora1 = isset($_POST['orario1']) ? $_POST['orario1'] : null;
    $campo1 = isset($_POST['campo1']) ? $_POST['campo1'] : null;
    $ora2 = isset($_POST['orario2']) ? $_POST['orario2'] : null;
    $campo2 = isset($_POST['campo2']) ? $_POST['campo2'] : null;

    if (isset($_SESSION['user_id']))
        $utente = $_SESSION['user_id'];
    else
        $utente = "guest";

    $result = false;

    if ($campo1 && $campo1 !== null && $ora1 && $ora1 !== null) {
        $result = $cscAccess->removePrenotation($campo1, $attivita_scelta, $utente, $data_selezionata, $ora1);
    }
    if ($campo2 && $campo2 !== null && $ora2 && $ora2 !== null) {
        $result = $cscAccess->removePrenotation($campo2, $attivita_scelta, $utente, $data_selezionata, $ora2);
    }
    echo json_encode($result);
}
$closeResult = $cscAccess->closeConnection();