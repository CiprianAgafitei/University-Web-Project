<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    setlocale(LC_ALL, 'it_IT');

    // Ottenimento del contenuto di accedi.php senza file_get_contents
    $paginaHTML = file_get_contents("../contatti.html");

    $messaggioForm = "";

    $email_utente = "";
    $em_ut_error = "";
    $nome_utente = "";
    $nome_error = "";
    $titolo_messaggio = "";
    $tit_mes_error = "";
    $messaggio = "";
    $mes_error = "";

    function pulisciInput($value) {
        $value = trim($value);
        $value = strip_tags($value);
        $value = htmlentities($value);
        return $value;
    }

    session_start();

    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if ($conn) {
        
        if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            if (isset($_POST['submit'])) 
            {
                $email_utente = pulisciInput($_POST["email"]);
                $nome_utente =  pulisciInput($_POST["user-name"]);
                $titolo_messaggio =  pulisciInput($_POST["message-title"]);
                $messaggio =  pulisciInput($_POST["message-text"]);

                if (empty($email_utente))
                    $em_ut_error = "Il campo email non può essere vuoto.";
                else if (!filter_var($email_utente, FILTER_VALIDATE_EMAIL))
                    $em_ut_error = "Il formato dell'email non è corretto.";

                if (empty($nome_utente) || strlen($nome_utente) < 3)
                    $nome_error = "Il campo nome deve esserci ed avere una lunghezza maggiore di 2 caratteri.";

                if (strlen($titolo_messaggio) > 50)
                    $tit_mes_error = "Il titolo deve avere una lunghezza inferiore ai 50 caratteri.";

                if (empty($messaggio) || strlen($nome_utente) > 500)
                    $mes_error = "Il messaggio deve esserci ed avere una lunghezza non superiore ai 500 caratteri.";

                if (empty($em_ut_error) && empty($nome_error) && empty($tit_mes_error) && empty($mes_error))
                {
                    // Verifica se l'utente è già noto nel db come cliente
                    $client_check = $cscAccess->checkRegisteredClient($email);

                    if (!$client_check) {
                        $user_check = $cscAccess->checkUser($email);    // Verifica se utente già noto nel db come utente
                    
                        if (!$user_check) 
                        {
                            $cscAccess->insertNewUser($email, $nome);    // Registrazione nella tabella utente
                        }
                    }
                    $result = $cscAccess->insertNewRequest($email, $titolo_messaggio, $messaggio);

                    if(!$result) {
                        $messaggioForm = "<span class=\"error_form\">Ci dispiace, non è stato possibile completare l'invio della richesta. Si prega di riprovare più tardi o contattarci tramite email o telefono.</span>";
                        exit;
                    }
                            
                    if ($email == "admin")
                        header("Location: ../admin.html");
                    else
                        header("Location: ../cliente.html");
                    exit;
                }
            }
        }    
    }
    $closeResult = $cscAccess->closeConnection();

    $paginaHTML = str_replace("{messaggioContatti}", $messaggioForm, $paginaHTML);
    $paginaHTML = str_replace("{errore_nome}", $nome_error, $paginaHTML);
    $paginaHTML = str_replace("{errore_email}", $em_ut_error, $paginaHTML);
    $paginaHTML = str_replace("{errore_titolo}", $tit_mes_error, $paginaHTML);
    $paginaHTML = str_replace("{errore_messaggio}", $mes_error, $paginaHTML);
    
    /* MANTENERE SALVATI I DATI SUI SEGNAPOSTI */
    $paginaHTML = str_replace("{email_utente}", $email_utente, $paginaHTML);
    $paginaHTML = str_replace("{nome_utente}", $nome_utente, $paginaHTML);
    $paginaHTML = str_replace("{titolo_richiesta}", $titolo_messaggio, $paginaHTML);
    $paginaHTML = str_replace("{testo_messaggio}", $messaggio, $paginaHTML);

    echo $paginaHTML;
?>