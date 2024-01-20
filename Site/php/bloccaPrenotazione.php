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

if ($conn) {

    $results = array();

    $attivita_scelta = $_SESSION['attivita_scelta'];
    $data_selezionata = $_POST['selectedDate'];
    $_SESSION['data_scelta'] = $data_selezionata;   // salvataggio nella sessione

    if (isset($_SESSION['user_id']))
        $utente = $_SESSION['user_id'];
    else
        $utente = "guest"; 

    $orario1 = isset($_POST['selectedButton1']) && $_POST['selectedButton1'] !== "null" ? $_POST['selectedButton1'] : null;
    $orario2 = isset($_POST['selectedButton2']) && $_POST['selectedButton2'] !== "null" ? $_POST['selectedButton2'] : null;

    if ($orario1 && $orario1 !== null) {
        $campo1 = $cscAccess->getCampoDisponibile($data_selezionata, $attivita_scelta, $orario1);
        $result1 = $cscAccess->insertNewPrenotation($campo1, $attivita_scelta, $utente, $data_selezionata, $orario1);
        $results[] = array('orario1' => $result1, 'campo1' => $campo1, 'ora_1' => $orario1);
    }
    if ($orario2 !== null) {
        $campo2 = $cscAccess->getCampoDisponibile($data_selezionata, $attivita_scelta, $orario2);
        $result2 = $cscAccess->insertNewPrenotation($campo2, $attivita_scelta, $utente, $data_selezionata, $orario2);
        $results[] = array('orario2' => $result2, 'campo2' => $campo2, 'ora_2' => $orario2);
    }
    echo json_encode($results);
}
$closeResult = $cscAccess->closeConnection();
?>