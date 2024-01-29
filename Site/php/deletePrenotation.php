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
    $id = isset($_POST['idPrenotazione']) ? $_POST['idPrenotazione'] : null;

    $result = false;

    if ($id !== null)
        $result = $cscAccess->removePrenotationById($id);
    
    echo json_encode($result);
}
$closeResult = $cscAccess->closeConnection();