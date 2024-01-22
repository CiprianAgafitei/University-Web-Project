<?php
session_start();

// Verifica se l'utente è autenticato
if (!isset($_SESSION['logged_in'])) {
    // Reindirizza l'utente alla pagina di login se non è autenticato
    header("Location: login.php");
    exit;
}
?>
