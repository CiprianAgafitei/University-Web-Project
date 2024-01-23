<?php
require_once "CSCAccess.php";
use CSC\CSCAccess;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
setlocale(LC_ALL, 'it_IT');

// Avvia la sessione solo se non è già attiva
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$cscAccess = new CSCAccess();
$conn = $cscAccess->openConnection();


// Verifica se l'utente è loggato
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Se l'utente non è loggato, reindirizzalo alla pagina di login
    header("Location: accedi.html");
    exit;
}

// Recupera l'email dell'utente dalla sessione
$emailUtente = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'Utente Sconosciuto';

// Carica il file HTML
$paginaHTML = file_get_contents("../cliente.html");

// Sostituisci il segnaposto con l'email dell'utente
$paginaHTML = str_replace("Nome Utente", $emailUtente, $paginaHTML);

$elencoPrenotazioni = ""; // Qui va la logica per ottenere l'elenco delle prenotazioni

// Sostituisci altri segnaposto se necessario
$paginaHTML = str_replace("{elencoPrenotazioni}", $elencoPrenotazioni, $paginaHTML);

echo $paginaHTML;

$cscAccess->closeConnection();
?>
