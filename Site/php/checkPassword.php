<?php

require_once "CSCAccess.php";
use CSC\CSCAccess;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
setlocale(LC_ALL, 'it_IT');

function pulisciInput($value)
{
    $value = trim($value);
    $value = strip_tags($value);
    $value = htmlentities($value);
    return $value;
}

if (!isset($_SESSION)) {
    session_start();
}

$cscAccess = new CSCAccess();
$conn = $cscAccess->openConnection();

if ($conn) 
{
    // Verifica della correttezza della password immessa
    $check_pass = ['pass_hash' => $cscAccess->getUserPassword($_SESSION['user_id'])];

    $password_inserita = $_POST['password'];

    if ($check_pass['pass_hash'] === hash('sha256', $password_inserita))
        $esito = true;
    else
        $esito = false;

    echo json_encode($esito);
}
$closeResult = $cscAccess->closeConnection();
?>