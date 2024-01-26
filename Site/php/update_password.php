<?php

require_once "CSCAccess.php";
use CSC\CSCAccess;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
setlocale(LC_ALL, 'it_IT');

ob_start();
require_once "../cliente.html";
$paginaHTML = ob_get_clean();

$messaggioForm = "";
$password_utente = "";
$pas_ut_error = "";
$nuova_password_utente = "";
$new_pas_ut_error = "";
$conferma_nuova_password_utente = "";
$conf_new_pas_ut_error = "";

if (!isset($_SESSION)) {
    session_start();
}

$nomeUtente = isset($_SESSION['user_name']) && $_SESSION['user_name'] !== null ? $_SESSION['user_name'] : '';
$cognomeUtente = isset($_SESSION['user_surname']) && $_SESSION['user_surname'] !== null ? $_SESSION['user_surname'] : '';

function pulisciInput($value)
{
    $value = trim($value);
    $value = strip_tags($value);
    $value = htmlentities($value);
    return $value;
}

$cscAccess = new CSCAccess();
$conn = $cscAccess->openConnection();

if ($conn) {
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        if (isset($_POST['submit'])) {
            $password_utente = pulisciInput($_POST['oldPassword']);
            $nuova_password_utente = pulisciInput($_POST['newPassword']);
            $conferma_nuova_password_utente = pulisciInput($_POST['confirmPassword']);

            // Verifica correttezza password inserita
            $check_pass = ['pass_hash' => $cscAccess->getUserPassword($_SESSION['user_id'])];

            if (empty($password_utente))
                $pas_ut_error = "Il campo vecchia password non deve essere vuoto.";
            else if ($check_pass['pass_hash'] != hash('sha256', $password_utente))
                $pas_ut_error = "La password inserita non è corretta.";

            if (empty($nuova_password_utente) || strlen($nuova_password_utente) < 8)
                $new_pas_ut_error = "Il campo nuova password deve esserci ed avere una lunghezza di almeno 8 caratteri.";
            else if ($nuova_password_utente === $password_utente)
                $new_pas_ut_error = "La nuova password non può essere uguale alla precedente.";

            if (empty($conferma_nuova_password_utente))
                $conf_new_pas_ut_error = "Il campo conferma password non deve essere vuoto.";
            else if ($nuova_password_utente != $conferma_nuova_password_utente)
                $conf_new_pas_ut_error = "Le due password non coincidono.";

            // Tutto ok -> Modifica della password
            if (empty($pas_ut_error) && empty($new_pas_ut_error) && empty($conf_new_pas_ut_error)) {
                $result = $cscAccess->updateUserPassword($_SESSION['user_id'], hash('sha256', $nuova_password_utente));

                if ($result) {
                    $messaggioForm = "<span>La password è stata aggiornata con successo!</span>";

                    $password_utente = "";
                    $nuova_password_utente = "";
                    $conferma_nuova_password_utente = "";
                } else
                    $messaggioForm = "<span class=\"error_form\">A causa di un problema non è stato possibile portare a termine la modifica. Si prega di riprovare più tardi.</span>";
            }
        }
    }
}
$closeResult = $cscAccess->closeConnection();

$paginaHTML = str_replace("{messaggioModificaPassword}", $messaggioForm, $paginaHTML);

$paginaHTML = str_replace("{old_pas_err}", $pas_ut_error, $paginaHTML);
$paginaHTML = str_replace("{new_pas_err}", $new_pas_ut_error, $paginaHTML);
$paginaHTML = str_replace("{conf_new_pas_err}", $conf_new_pas_ut_error, $paginaHTML);

/* MANTENERE SALVATI I DATI SUI SEGNAPOSTI */
$paginaHTML = str_replace("{oldPass}", $password_utente, $paginaHTML);
$paginaHTML = str_replace("{newPass}", $nuova_password_utente, $paginaHTML);
$paginaHTML = str_replace("{confPass}", $conferma_nuova_password_utente, $paginaHTML);

$paginaHTML = str_replace("Nome", $nomeUtente, $paginaHTML);
$paginaHTML = str_replace("Cognome", $cognomeUtente, $paginaHTML);

echo $paginaHTML;
?>
