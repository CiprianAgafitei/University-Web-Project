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
    $email = isset($_POST['email']) ? $_POST['email'] : null;
    $password = isset($_POST['password']) ? $_POST['password'] : null;

    $attivita_scelta = $_SESSION['attivita_scelta'];
    $data_selezionata = $_SESSION['data_scelta'];

    // Estrai i dati dagli oggetti nell'array
    $ora1 = isset($_POST['orario1']) ? $_POST['orario1'] : null;
    $campo1 = isset($_POST['campo1']) ? $_POST['campo1'] : null;
    $ora2 = isset($_POST['orario2']) ? $_POST['orario2'] : null;
    $campo2 = isset($_POST['campo2']) ? $_POST['campo2'] : null;

    $results = array();
    if ($email !== null && $password != null) {
        $result = $cscAccess->checkLoginClientCredentials($email, hash('sha256', $password));
        $results['loginResult'] = $result;

        if ($result)
        {
            // Ottenimento del resto delle informazioni dell'utente per salvarle nella sessione
            $informazioni = $cscAccess->getClientInfoDetails($email);
            $_SESSION['user_name'] = $informazioni['nome'];
            $_SESSION['user_surname'] = $informazioni['cognome'];

            // Modifica delle informazioni sulla prenotazione da guest a email dell'utente
            if ($campo1 && $campo1 !== null && $ora1 && $ora1 !== null)
                $cscAccess->updateUserPrenotation($campo1, $data_selezionata, $attivita_scelta, $ora1, $email);
            if ($campo2 && $campo2 !== null && $ora2 && $ora2 !== null)
                $cscAccess->updateUserPrenotation($campo2, $data_selezionata, $attivita_scelta, $ora2, $email);

            $_SESSION['user_id'] = $email;
            $_SESSION['logged_in'] = true;
        }
        else {
            $result = $cscAccess->checkRegisteredClient($email);
            $results['registeredResult'] = $result;
        }
        echo json_encode($results);
    }       
}
$closeResult = $cscAccess->closeConnection();