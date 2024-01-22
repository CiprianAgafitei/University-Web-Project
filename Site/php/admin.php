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

    $paginaHTML = file_get_contents('../admin.html');

    $prenotazioni = "";
    $messaggi = "";

    $csc = new CSCAccess();
    $conn = $csc->openConnection();
    
    if($conn) 
    {
        $prenotations = $csc->getAllPrenotations();

        foreach ($prenotations as $prenotazione) 
        {
            $sport = $csc->getNomeAttivita($prenotazione["id_Attivita"]);
            $ora = date("H:i", strtotime($prenotazione["ora"]));

            $prenotazioni .= "<tr>
                                <td>{$prenotazione["data"]}</td>
                                <td>$ora</td>
                                <td>$sport</td>
                                <td>{$prenotazione["codice_campo"]}</td>
                                <td>{$prenotazione["utente"]}</td>
                            </tr>";
        }

        $messages = $csc->getAllRequests();

        foreach ($messages as $messaggio) {
            $email = htmlspecialchars($messaggio['email']);
            $info = $csc->getClientInfoDetails($email);
            $nome_utente = $info ? htmlspecialchars($info['nome']) : "Nome non disponibile";

            $titolo = $messaggio["titolo"] ?? "Senza titolo";
            $testo = htmlspecialchars($messaggio['testo']);

            $messaggi .= "<div class=\"message-box\">
                            <h3 class=\"message-title\">$titolo</h3>
                            <p class=\"message-name\">Nome: \"$nome_utente\"</p>
                            <p class=\"message-email\">Email: $email</p>
                            <p class=\"message-content\">$testo</p>
                        </div>";
        }
    }
    $csc->closeConnection();

    $paginaHTML = str_replace("{messaggi}", $messaggi, $paginaHTML);
    $paginaHTML = str_replace("{righe_tabella}", $prenotazioni, $paginaHTML);

    echo $paginaHTML;
?>
