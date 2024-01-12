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

    $nome_utente = "";
    $nome_error = "";
    $cognome_utente = "";
    $cognome_error = "";
    $email_utente = "";
    $em_ut_error = "";
    $password_utente = "";
    $pas_ut_error = "";
    $conferma_password_utente = "";
    $conf_pas_ut_error = "";

    function pulisciInput($value) {
        $value = trim($value);
        $value = strip_tags($value);
        $value = htmlentities($value);
        return $value;
    }

    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if ($conn) 
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            if (isset($_POST['submit'])) 
            {  
                $nome_utente = pulisciInput($_POST['nome']); 
                $cognome_utente = pulisciInput($_POST['cognome']);
                $email_utente = pulisciInput($_POST['emailReg']);
                $password_utente = pulisciInput($_POST['passwordReg']); 
                $conferma_password_utente = pulisciInput($_POST['conf_password']);

                if (empty($nome_utente) || strlen($nome_utente) < 3)
                    $nome_error = "Il campo nome deve esserci ed avere una lunghezza maggiore di 2 caratteri.";

                if (empty($cognome_utente) || strlen($cognome_utente) < 3)
                    $cognome_error = "Il campo cognome deve esserci ed avere una lunghezza maggiore di 2 caratteri.";

                if (empty($email_utente))
                    $em_ut_error = "Il campo email non deve essere vuoto.";
                else if (!filter_var($email_utente, FILTER_VALIDATE_EMAIL))
                    $em_ut_error = "Il formato dell'email non è valido.";

                if (empty($password_utente) || strlen($password_utente) < 8)
                    $pas_ut_error = "Il campo password non deve essere vuoto e deve avere una lunghezza cmaggiore di 8 caratteri.";

                if (empty($conferma_password_utente))
                    $conf_pas_ut_error = "Il campo conferma password non deve essere vuoto.";
                else if($password_utente != $conferma_password_utente) {
                    $conf_pas_ut_error = "Le password non coincidono.";
                }

                // Tutto ok
                if (empty($nome_error) && empty($cognome_error) && empty($em_ut_error) && empty($pas_ut_error) && empty($conf_pas_ut_error))
                {
                    $check_registered_user = $cscAccess->checkRegisteredClient($email_utente);

                    if ($check_registered_user) {
                        $messaggioForm = "<span class=\"error_form\">L'indirizzo email inserito corrisponde ad un account già registrato.</span>";
                    }
                    else if (!$check_registered_user && $password_utente === $conferma_password_utente)
                    {
                        // Verifica se è già presente nella tabella utenti
                        $user_check = $cscAccess->checkUser($email_utente);

                        if (!$user_check) {
                            $result1 = $cscAccess->insertNewUser($email_utente, $nome_utente);

                            if ($result1) 
                            {
                                // Inserimento nuovo cliente
                                $result2 = $cscAccess->insertNewClient($email_utente, $nome_utente, $cognome_utente, hash('sha256', $password_utente));
                                                        
                                if ($result2) {
                                    header("Location: ../cliente.html");
                                    exit;
                                }
                            }
                            // Se nessun result true errore nella communicazione con il db
                            $messaggioForm = "<span class=\"error_form\">Errore di autenticazione. Si prega di riprovare o contattarci.</span>";
                        }
                    }
                }
            }
        }
    }
    $closeResult = $cscAccess->closeConnection();

    $paginaHTML = str_replace("{messaggioRegistrazione}", $messaggioForm, $paginaHTML);
    $paginaHTML = str_replace("{nomeErr}", $nome_error, $paginaHTML);
    $paginaHTML = str_replace("{cognomeErr}", $cognome_error, $paginaHTML);
    $paginaHTML = str_replace("{emailErr}", $em_ut_error, $paginaHTML);
    $paginaHTML = str_replace("{passwordErr}", $pas_ut_error, $paginaHTML);
    $paginaHTML = str_replace("{confPasErr}", $conf_pas_ut_error, $paginaHTML);
    
    /* MANTENERE SALVATI I DATI SUI SEGNAPOSTI */
    $paginaHTML = str_replace("{registrNome}", $nome_utente, $paginaHTML);
    $paginaHTML = str_replace("{registrCognome}", $cognome_utente, $paginaHTML);
    $paginaHTML = str_replace("{registrEmail}", $email_utente, $paginaHTML);
    $paginaHTML = str_replace("{registrPassword}", $password_utente, $paginaHTML);
    $paginaHTML = str_replace("{registrConfPass}", $conferma_password_utente, $paginaHTML);

    echo $paginaHTML;
?>
