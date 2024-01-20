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
    $nome = isset($_POST['nome']) ? $_POST['nome'] : null;
    $email = isset($_POST['email']) ? $_POST['email'] : null;

    $attivita_scelta = $_SESSION['attivita_scelta'];
    $data_selezionata = $_SESSION['data_scelta'];

    // Estrai i dati dagli oggetti nell'array
    $ora1 = isset($_POST['orario1']) ? $_POST['orario1'] : null;
    $campo1 = isset($_POST['campo1']) ? $_POST['campo1'] : null;
    $ora2 = isset($_POST['orario2']) ? $_POST['orario2'] : null;
    $campo2 = isset($_POST['campo2']) ? $_POST['campo2'] : null;

    // Verifica se l'utente è registrato nel database come utente
    if ($email !== null) {
        $result = $cscAccess->checkUser($email);

        if (!$result) { // Non registrato = inserimento
            $cscAccess->insertNewUser($email, $nome);
        }
    }

    if ($nome !== null && $email != null) 
    {
        // Modifica delle informazioni sulla prenotazione da guest a email dell'utente
        if ($campo1 && $campo1 !== null && $ora1 && $ora1 !== null)
            $cscAccess->updateUserPrenotation($campo1, $data_selezionata, $attivita_scelta, $ora1, $email);
        if ($campo2 && $campo2 !== null && $ora2 && $ora2 !== null)
            $cscAccess->updateUserPrenotation($campo2, $data_selezionata, $attivita_scelta, $ora2, $email);
    }     
    echo json_encode("OK");
}
$closeResult = $cscAccess->closeConnection();