<?php
require_once "session_manager.php";
require_once "CSCAccess.php";
use CSC\CSCAccess;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);



// Generazione e verifica del token CSRF
if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

function verifyCsrfToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

function pulisciInput($value) {
    return htmlentities(strip_tags(trim($value)));
}

$errorMessage = "";
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['submit'])) {
    if (!verifyCsrfToken($_POST['csrf_token'])) {
        $errorMessage = "Errore di validazione della richiesta.";
    } else {
        $cscAccess = new CSCAccess();
        if ($cscAccess->openConnection()) {
            $email = pulisciInput($_POST['email']);
            $oldPassword = hash('sha256', pulisciInput($_POST['oldPassword']));
            $newPassword = hash('sha256', pulisciInput($_POST['newPassword']));
            $confirmPassword = hash('sha256', pulisciInput($_POST['confirmPassword']));

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errorMessage = "Formato email non valido.";
            } else {
                $oldPasswordHash = $cscAccess->getUserPassword($email);

                if ($oldPassword !== $oldPasswordHash) {
                    $errorMessage = "La vecchia password non è corretta.";
                } elseif ($newPassword === $oldPassword) {
                    $errorMessage = "La nuova password deve essere diversa dalla vecchia.";
                } elseif ($newPassword !== $confirmPassword) {
                    $errorMessage = "La nuova password e la conferma non corrispondono.";
                } else {
                    if ($cscAccess->updateUserPassword($email, $newPassword)) {
                        header("Location: cliente.php");
                        exit;
                    } else {
                        $errorMessage = "Errore nell'aggiornamento della password.";
                    }
                }
            }
            $cscAccess->closeConnection();
        } else {
            $errorMessage = "Impossibile connettersi al database.";
        }
    }
}

ob_start();
require_once "../update_password.html";
$paginaHTML = ob_get_clean();
$paginaHTML = str_replace("{errorMessage}", $errorMessage, $paginaHTML);
$paginaHTML = str_replace("{csrf_token}", $_SESSION['csrf_token'], $paginaHTML);
echo $paginaHTML;
?>
