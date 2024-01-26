document.addEventListener('DOMContentLoaded', function () {
    const editPassSection = document.getElementById('resetPasswordForm');
    const viewPrenSection = document.getElementById('prenotazioni-container');
    const editPassButton = document.getElementById('modify-password');
    const viewPrenButton = document.getElementById('visualizza-prenotazioni');

    var currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "cliente.php") {
        // Applica effetti per mostrare il pulsante "Modifica password" abilitato
        editPassSection.style.display = "none";
        editPassButton.classList.remove('disabled-effect');
        editPassButton.setAttribute('href', '../php/update_password.php');
        editPassButton.setAttribute('aria-disabled', 'false');
        editPassButton.setAttribute('tabindex', '0');

        // Applica effetti per mostrare il pulsante "Visualizza prenotazioni" disabilitato
        viewPrenSection.style.display = "block";
        viewPrenButton.classList.add('disabled-effect');
        viewPrenButton.removeAttribute('href');
        viewPrenButton.setAttribute('aria-disabled', 'true');
        viewPrenButton.setAttribute('tabindex', '0');
    }
    else if (currentPage === "update_password.php") {
        // Applica effetti per mostrare il pulsante "Modifica password" disabilitato
        editPassSection.style.display = "block";
        editPassButton.classList.add('disabled-effect');
        editPassButton.removeAttribute('href');
        editPassButton.setAttribute('aria-disabled', 'true');
        editPassButton.setAttribute('tabindex', '0');

        // Applica effetti per mostrare il pulsante "Visualizza prenotazioni" abilitato
        viewPrenSection.style.display = "none";
        viewPrenButton.classList.remove('disabled-effect');
        viewPrenButton.setAttribute('href', '../php/cliente.php');
        viewPrenButton.setAttribute('aria-disabled', 'false');
        viewPrenButton.setAttribute('tabindex', '-1');
    }

    // Gestione dei campi degli errori
    var password_error = document.getElementById('wrong-pass');
    var new_pass_error = document.getElementById('wrong-new-pass');
    var conf_new_pass_error = document.getElementById('wrong-conf-new-pass');

    if (password_error && password_error.textContent.trim() === '') {
        password_error.style.display = 'none';
    }

    if (new_pass_error && new_pass_error.textContent.trim() === '') {
        new_pass_error.style.display = 'none';
    }

    if (conf_new_pass_error && conf_new_pass_error.textContent.trim() === '') {
        conf_new_pass_error.style.display = 'none';
    }
});

function validateFormChangePassword() {
    var password = document.getElementById('oldPassword').value.trim();
    var new_pass = document.getElementById('newPassword').value.trim();
    var conf_new_pass = document.getElementById('confirmPassword').value.trim();

    var password_error = document.getElementById('wrong-pass');
    var new_pass_error = document.getElementById('wrong-new-pass');
    var conf_new_pass_error = document.getElementById('wrong-conf-new-pass');

    // PASSWORD VECCHIA
    if (password === '') {
        password_error.textContent = 'Il campo password è vuoto.';
        password_error.style.display = 'block';
        return false;
    }
    else
        password_error.textContent = '';

    // PASSWORD NUOVA
    if (new_pass === '') {
        new_pass_error.textContent = 'Il campo della nuova password è vuoto.';
        new_pass_error.style.display = 'block';
        return false;
    }
    else if (new_pass.length < 8) {
        new_pass_error.textContent = 'La nuova password deve avere almeno 8 caratteri.';
        new_pass_error.style.display = 'block';
        return false;
    }
    else
        new_pass_error.textContent = '';

    // CONFERMA PASSWORD NUOVA
    if (conf_new_pass === '') {
        conf_new_pass_error.textContent = 'Il campo conferma password è vuoto.';
        conf_new_pass_error.style.display = 'block';
        return false;
    }
    else if (new_pass != conf_new_pass) {
        conf_new_pass_error.textContent = 'Le due password non coincidono.';
        conf_new_pass_error.style.display = 'block';
        return false;
    }
    else
        conf_new_pass_error.textContent = '';
}
