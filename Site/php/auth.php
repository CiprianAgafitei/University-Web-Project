<?php
    session_start();

    function checkLoginStatus() {
        if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
            return true;
        } else {
            return false;
        }
    }

    function getLinkInfo() {
        if (checkLoginStatus()) {
            return array('text' => 'Area Riservata', 'address' => 'area_riservata.php');
        } else {
            return array('text' => 'Accedi', 'address' => 'login.php');
        }
    }
?>
