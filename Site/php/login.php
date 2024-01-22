<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    setlocale(LC_ALL, 'it_IT');

    // Ottenimento del contenuto di accedi.php senza file_get_contents
    ob_start();
    require_once "../accedi.html";
    $paginaHTML = ob_get_clean();

    $messaggioForm = "";

    $email_utente = "";
    $password_utente = "";
    $em_ut_error = "";
    $pas_ut_error = "";

    function pulisciInput($value) {
        $value = trim($value);
        $value = strip_tags($value);
        $value = htmlentities($value);
        return $value;
    }

    if (!isset($_SESSION)) {
        session_start();
    }

    if (isset($_SESSION["logged_in"]) && $_SESSION["logged_in"] === true) {
        if($_SESSION['user_id'] === 'admin') {
            header("Location: admin.php");
            exit();
        }
        else {
            header("Location: cliente.php");
            exit();
        }
    }

    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if ($conn) 
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            if (isset($_POST['submit'])) 
            { 
                $email_utente = pulisciInput($_POST['email']);
                $password_utente = pulisciInput($_POST['password']);

                if (empty($email_utente))
                    $em_ut_error = "Il campo email non deve essere vuoto.";

                if (empty($password_utente))
                    $pas_ut_error = "Il campo password non deve essere vuoto.";

                // Se tutto ok
                if (empty($em_ut_error) && empty($pas_ut_error)) 
                {
                    $result = $cscAccess->checkLoginClientCredentials($email_utente, hash('sha256', $password_utente));
                    
                    if ($result) 
                    {
                        $info = $cscAccess->getClientInfoDetails($email);

                        // Salvataggio informazioni dell'utente nella sessione
                        $_SESSION['user_id'] = $email_utente;
                        $_SESSION['user_name'] = $info['nome'];
                        $_SESSION['user_surname'] = $info['cognome'];
                        $_SESSION['logged_in'] = true;

                        if ($email_utente == "admin")
                            header("Location: admin.php");
                        else
                            header("Location: cliente.php");
                        exit;
                    } 
                    else {
                        // Verifica se l'utente esiste e ha immesso una password sbagliata 
                        $wrong_pass_check = $cscAccess->checkRegisteredClient($email_utente);

                        if($wrong_pass_check) 
                        {
                            $pas_ut_error = "La password immessa non è corretta.";
                        }
                        else {
                            $messaggioForm = "<span class=\"error_form\">Utente non registrato.</span>";
                        }
                    }
                }
            }
        }    
    }
    $closeResult = $cscAccess->closeConnection();
    
    $paginaHTML = str_replace("{messaggioLogin}", $messaggioForm, $paginaHTML);
    $paginaHTML = str_replace("{login_EmEr}", $em_ut_error, $paginaHTML);
    $paginaHTML = str_replace("{login_PasEr}", $pas_ut_error, $paginaHTML);
    
    /* MANTENERE SALVATI I DATI SUI SEGNAPOSTI */
    $paginaHTML = str_replace("{loginEm}", $email_utente, $paginaHTML);
    $paginaHTML = str_replace("{loginPas}", $password_utente, $paginaHTML);

    echo $paginaHTML;
?>
