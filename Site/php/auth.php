<?php
    if (!isset($_SESSION)) {
        session_start();
    }
    $logged_in = isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
    echo json_encode(['logged_in' => $logged_in]);
?>
