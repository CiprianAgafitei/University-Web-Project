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

if (!isset($_SESSION["logged_in"]) || $_SESSION["logged_in"] !== true) {
    header("Location: login.php");
    exit();
}

$paginaHTML = file_get_contents("../cliente.html");

$elencoPrenotazioni = "";
$emailUtente = $_SESSION['user_id'];

$cscAccess = new CSCAccess();
$conn = $cscAccess->openConnection();

if ($conn) {
    $prenotations = $cscAccess->getClientPrenotations($emailUtente);

    foreach ($prenotations as $prenotazione) {
        $sport = $cscAccess->getNomeAttivita($prenotazione['id_Attivita']);

        $elencoPrenotazioni .= "<dt>{$prenotazione['codice_campo']} - $sport</dt>
                            <dd>{$prenotazione['data']} {$prenotazione['ora']}</dd>";
    }
}
$cscAccess->closeConnection();

$paginaHTML = str_replace("Nome Utente", $emailUtente, $paginaHTML);
$paginaHTML = str_replace("{elencoPrenotazioni}", $elencoPrenotazioni, $paginaHTML);

echo $paginaHTML;
?>