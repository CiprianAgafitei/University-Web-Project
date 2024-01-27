<?php

include_once "CSCAccess.php";
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

$nomeUtente = isset($_SESSION['user_name']) && $_SESSION['user_name'] !== null ? $_SESSION['user_name'] : '';

$paginaHTML = file_get_contents('../admin.html');

$prenotazioni = "";

$csc = new CSCAccess();
$conn = $csc->openConnection();

if ($conn) {
    $prenotations = $csc->getAllPrenotations();

    if (is_array($prenotations) || is_object($prenotations)) 
    {
        $count_rows = 1;    // Variabile per contare il numero di riga corrente da 1 a 10

        foreach ($prenotations as $prenotazione) 
        {
            $sport = $csc->getNomeAttivita($prenotazione["id_Attivita"]);
            $ora = date("H:i", strtotime($prenotazione["ora"]));

            // Aggiunta dell'id lastRow solo sull'ultima colonna
            if ($count_rows % 10 == 1)
                $prenotazioni .= "<tr tabindex=\"0\" class=\"firstRow\">";
            else if ($count_rows % 10 == 0)
                $prenotazioni .= "<tr tabindex=\"0\" class=\"lastRow\">";
            else
                $prenotazioni .= "<tr tabindex=\"0\">";
            
            $prenotazioni .= "<td>{$prenotazione["data"]}</td>
                            <td>$ora</td>
                            <td>$sport</td>
                            <td>{$prenotazione["codice_campo"]}</td>
                            <td>{$prenotazione["utente"]}</td>
                        </tr>";
            $count_rows++;
        }
    }
}
$csc->closeConnection();

if ($prenotazioni === '')
    $prenotazioni = "<tr><td colspan=\"5\">Ancora nessuna prenotazione.</td></tr>";

$paginaHTML = str_replace("Nome", $nomeUtente, $paginaHTML);
$paginaHTML = str_replace("{righe_tabella}", $prenotazioni, $paginaHTML);

echo $paginaHTML;
?>
