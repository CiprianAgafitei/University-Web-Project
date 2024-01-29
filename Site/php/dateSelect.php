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
    if (isset($_POST['selectedDate'])) {
        $attivita_scelta = $_SESSION['attivita_scelta'];
        $selectedDate = $_POST['selectedDate'];
        $orari = array();

        // Recupero di tutte le prenotazioni dell'attivita scelta e della data selezionata
        $reservedPrenotations = $cscAccess->getReservedPrenotations($selectedDate, $attivita_scelta);

        $data = new DateTime();
        $currentHour = $data->format('H');
        $currentHour = sprintf('%02d:00', $currentHour);

        for ($hour = 8; $hour <= 21; $hour++) {
            // Formatta l'ora aggiungendo uno zero se necessario davanti
            $formattedHour = sprintf('%02d:00', $hour);

            // Aggiungi l'ora se è già prenotata o se è precedente a quella corrente
            if ($formattedHour <= $currentHour || (!in_array($formattedHour, $orari) && isHourBooked($formattedHour, $reservedPrenotations))) {
                $orari[] = $formattedHour;
            }
        }
        echo json_encode($orari);
    }
}
$closeResult = $cscAccess->closeConnection();

function isHourBooked($hour, $reservedPrenotations)
{
    if ($reservedPrenotations && count($reservedPrenotations) > 0)
    {
        // Controlla se l'ora è già prenotata
        foreach ($reservedPrenotations as $prenotazione) {
            if ($prenotazione['ora'] == $hour) {
                return true;
            }
        }
    }
    return false;
}
?>
