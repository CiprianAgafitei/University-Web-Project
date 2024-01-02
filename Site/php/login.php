<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    setlocale(LC_ALL, 'it_IT');


    $paginaHTML = file_get_contents("../accedi.html");

    $messaggioForm = "";

    $email_utente = "";
    $em_ut_error = "";
    $password_utente = "";
    $pas_ut_error = "";

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
        // Controllo se è stata inviata una richiesta POST
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $email = $_POST["email"];
            $password = $_POST["password"];

            $result = $cscAccess->checkLoginClientCredentials($email, $password);
            
            if ($result) 
            {
                $user_info = $cscAccess->getUserInfo($email);
                $info = $use_info->fetch_assoc();

                // Salvataggio informazioni dell'utente nella sessione
                $_SESSION['user_id'] = $email;
                $_SESSION['user_password'] = $password;
                $_SESSION['user_name'] = $info['nome'];
                $_SESSION['user_surname'] = $info['cognome'];

                if ($email == "admin")
                    header("Location: admin.html");
                else
                    header("Location: cliente.html");
                exit;
            } 
            else {
                $messaggioForm = "<p>Utente non registrato.</p>";
            }
        }    
    }

    if (isset($_POST['submit'])) 
    { 
        $email_utente = pulisciInput($_POST['email']);
        $password_utente = pulisciInput($_POST['password']);

        if (empty($email_utente))
            $em_ut_error = "<p>Il campo email non deve essere vuoto.</p>";

        if (!filter_var($email_utente, FILTER_VALIDATE_EMAIL))
            $em_ut_error = "<p>Il formato dell'email non è valido.</p>";

        if (empty($password_utente))
            $pas_ut_error = "<p>Il campo password non deve essere vuoto.</p>";
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