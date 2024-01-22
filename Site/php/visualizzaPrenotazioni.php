<?php
include_once "CSCAccess.php"; 
require_once "session_manager.php";
use CSC\CSCAccess; 

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
setlocale(LC_ALL, 'it_IT');

/*session_start(); // Assicurati che la sessione sia avviata*/

// Verifica se l'utente è loggato
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Se l'utente non è loggato, reindirizzalo alla pagina di login
    header("Location: accedi.html");
    exit;
}

$paginaHTML = file_get_contents('../visualizzaPrenotazioni.html');

$prenotazioni = "";
$messaggi = "";

$csc = new CSCAccess();
$conn = $csc->openConnection();

if ($conn) {
    error_log("Connessione al database riuscita.");

    $emailUtente = $_SESSION['user_id']; // Usa l'email dell'utente dalla sessione
    error_log("Recupero prenotazioni per l'utente con email: " . $emailUtente);

    $prenotations = $csc->getPrenotationsByEmail($emailUtente); // Modifica questa funzione per usare l'email

    if (!empty($prenotations)) {
        foreach ($prenotations as $prenotazione) {
            $sport = $csc->getNomeAttivita($prenotazione["id_Attivita"]);

            $prenotazioni .= "<tr>
                                <td>{$prenotazione["data"]}</td>
                                <td>{$prenotazione["ora"]}</td>
                                <td>\"$sport\"</td>
                                <td>{$prenotazione["codice_campo"]}</td>
                                <td>{$prenotazione["utente"]}</td>
                            </tr>";
        }
    } else {
        $prenotazioni = '<tr><td colspan="5" style="text-align: center;">Nessuna prenotazione effettuata</td></tr>';
        error_log("Nessuna prenotazione trovata per l'utente con email: " . $emailUtente);
    }

    // Qui la logica per recuperare i messaggi, se necessario
    // ...

} else {
    error_log("Errore di connessione al database");
}

$csc->closeConnection();

$paginaHTML = str_replace("{messaggi}", $messaggi, $paginaHTML);
$paginaHTML = str_replace("{righe_tabella}", $prenotazioni, $paginaHTML);

echo $paginaHTML;
?>
