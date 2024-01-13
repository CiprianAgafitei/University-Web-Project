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

            $prenotazioni .= "<tr>
                                <td>{$prenotazione["data"]}</td>
                                <td>{$prenotazione["ora"]}</td>
                                <td>\"$sport\"</td>
                                <td>1</td>
                                <td>{$prenotazione["utente"]}</td>
                            </tr>";
        }

        $messages = $csc->getAllRequests();

        foreach ($messages as $messaggio) 
        {
            $nome_utente = $csc->getNomeUtente($messaggio["email"]);

            if ($messaggio["titolo"] === NULL) {
                $messaggio["titolo"] = "Senza titolo";
            }

            $messaggi .= "<div class=\"message-box\">
                            <h3 class=\"message-title\">{$messaggio["titolo"]}</h3>
                            <p class=\"message-name\">Nome: \"$nome_utente\"</p>
                            <p class=\"message-email\">Email: {$messaggio["email"]}</p>
                            <p class=\"message-content\">{$messaggio["testo"]}</p>
                        </div>";
        }
    }
    $csc->closeConnection();

    $paginaHTML = str_replace("{messaggi}", $messaggi, $paginaHTML);
    $paginaHTML = str_replace("{righe_tabella}", $prenotazioni, $paginaHTML);

    echo $paginaHTML;
?>
