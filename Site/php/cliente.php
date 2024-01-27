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

$emailUtente = $_SESSION['user_id'];
$nomeUtente = isset($_SESSION['user_name']) && $_SESSION['user_name'] !== null ? $_SESSION['user_name'] : '';
$cognomeUtente = isset($_SESSION['user_surname']) && $_SESSION['user_surname'] !== null ? $_SESSION['user_surname'] : '';

function pulisciInput($value)
{
    $value = trim($value);
    $value = strip_tags($value);
    $value = htmlentities($value);
    return $value;
}

ob_start();
require_once "../cliente.html";
$paginaHTML = ob_get_clean();

$elencoPrenotazioni = "";

$cscAccess = new CSCAccess();
$conn = $cscAccess->openConnection();

if ($conn) 
{
    $prenotations = $cscAccess->getClientPrenotations($emailUtente);

    if (is_array($prenotations) || is_object($prenotations)) 
    {
        foreach ($prenotations as $prenotazione) {
            $sport = $cscAccess->getNomeAttivita($prenotazione['id_Attivita']);
            $data = date("d-m-Y", strtotime($prenotazione['data']));
            $ora = date("H:i", strtotime($prenotazione['ora']));

            $elencoPrenotazioni .= "<div class=\"prenot_cliente\" tabindex=\"0\"><dt>Codice campo: <span>{$prenotazione['codice_campo']}</span> - Attività: <span>$sport</span></dt>
                                <dd>Data: <span>$data</span> - Ora: <span>$ora</span></dd></div>";
        }
    }
}
$cscAccess->closeConnection();

if ($elencoPrenotazioni === '')
    $elencoPrenotazioni = "Ancora nessuna prenotazione.";

$paginaHTML = str_replace("Nome", $nomeUtente, $paginaHTML);
$paginaHTML = str_replace("Cognome", $cognomeUtente, $paginaHTML);
$paginaHTML = str_replace("{elencoPrenotazioni}", $elencoPrenotazioni, $paginaHTML);

echo $paginaHTML;
?>
