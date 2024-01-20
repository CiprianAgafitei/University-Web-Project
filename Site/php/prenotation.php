<?php
    require_once "CSCAccess.php";
    use CSC\CSCAccess;

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    setlocale(LC_ALL, 'it_IT');

    // Ottenimento del contenuto di accedi.php senza file_get_contents
    $paginaHTML = file_get_contents("../prenotazioni.html");

    function pulisciInput($value) {
        $value = trim($value);
        $value = strip_tags($value);
        $value = htmlentities($value);
        return $value;
    }

    if (!isset($_SESSION)) {
        session_start();
    }

    $url = $_SERVER['REQUEST_URI'];
    $url_components = parse_url($url);

    // Verifica se ci sono parametri nella URL
    if (isset($url_components['query'])) {
        parse_str($url_components['query'], $params);

        // Verifica se il parametro 'option' è presente nei parametri
        if (isset($params['option'])) {
            $_SESSION['attivita_scelta'] = $params['option'];
        }
    }

    // Verfica se loggato
    $logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;

    if ($logged_in) {
        $continuaOconferma = "conferma";
    }
    else
        $continuaOconferma = "continua";


    $cscAccess = new CSCAccess();
    $conn = $cscAccess->openConnection();

    if ($conn) 
    {
        if ($_SERVER["REQUEST_METHOD"] == "POST") 
        {
            // Ricarico il valore dell'attività scelta della sessione
            $attivita_scelta = $_SESSION['attivita_scelta'];
        }
    }
    $closeResult = $cscAccess->closeConnection();

    $paginaHTML = str_replace("{Continua_O_Conferma}", $continuaOconferma, $paginaHTML);

    echo $paginaHTML;
?>
