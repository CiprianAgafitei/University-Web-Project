document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login-access');
    const registerSection = document.getElementById('register-access');

    var currentPage = window.location.pathname.split("/").pop();

    if (currentPage === "login.php") {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
    }
    else if (currentPage === "register.php") {
        loginSection.style.display = "none";
        registerSection.style.display = "block";
    }

    // Gestione della visualizzazione degli errori
    var email_error_login = document.getElementById('errore_email');
    var pass_error_login = document.getElementById('errore_password');

    if (email_error_login && email_error_login.textContent.trim() === '') {
        email_error_login.style.display = 'none';
    }

    if (pass_error_login && pass_error_login.textContent.trim() === '') {
        pass_error_login.style.display = 'none';
    }

    var nome_error_reg = document.getElementById('errore_nome');
    var cognome_error_reg = document.getElementById('errore_cognome');
    var email_error_reg = document.getElementById('errore_emailReg');
    var password_error_reg = document.getElementById('errore_passwordReg');
    var conf_pass_error_reg = document.getElementById('errore_conf_password');

    if (nome_error_reg && nome_error_reg.textContent.trim() === '') {
        nome_error_reg.style.display = 'none';
    }

    if (cognome_error_reg && cognome_error_reg.textContent.trim() === '') {
        cognome_error_reg.style.display = 'none';
    }

    if (email_error_reg && email_error_reg.textContent.trim() === '') {
        email_error_reg.style.display = 'none';
    }

    if (password_error_reg && password_error_reg.textContent.trim() === '') {
        password_error_reg.style.display = 'none';
    }

    if (conf_pass_error_reg && conf_pass_error_reg.textContent.trim() === '') {
        conf_pass_error_reg.style.display = 'none';
    }
});

function validateFormLogin() {
    var email = document.getElementById('email').value.trim();
    var passowrd = document.getElementById('password').value.trim();

    var email_error_login = document.getElementById('errore_email');
    var pass_error_login = document.getElementById('errore_password');

    // EMAIL
    if (email === '') {
        email_error_login.textContent = 'Il campo email è vuoto.';
        email_error_login.style.display = 'block';
        return false;
    }
    else 
    email_error_login.textContent = '';

    // PASSWORD
    if (passowrd === '') {
        pass_error_login.textContent = 'Il campo password è vuoto.';
        pass_error_login.style.display = 'block';
        return false;
    }
    else
        pass_error_login.textContent = '';

    return true;
}

function validateFormRegistrazione() {
    var strutturaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var nome = document.getElementById('nome').value.trim();
    var cognome = document.getElementById('cognome').value.trim();
    var email = document.getElementById('email_new_client').value.trim();
    var password = document.getElementById('pass_new_client').value.trim();
    var conf_password = document.getElementById('conf_pass_new_client').value.trim();

    var nome_error_reg = document.getElementById('errore_nome');
    var cognome_error_reg = document.getElementById('errore_cognome');
    var email_error_reg = document.getElementById('errore_emailReg');
    var password_error_reg = document.getElementById('errore_passwordReg');
    var conf_pass_error_reg = document.getElementById('errore_conf_password');

    // NOME
    if (nome === '' || nome.length < 3) {
        nome_error_reg.textContent = 'Il campo nome deve esserci ed avere una lunghezza maggiore di 2 caratteri.';
        nome_error_reg.style.display = 'block';
        return false;
    }
    else 
        nome_error_reg.textContent = '';
    
    // COGNOME
    if (cognome === '' || cognome.length < 3) {
        cognome_error_reg.textContent = 'Il campo cognome deve esserci ed avere una lunghezza maggiore di 2 caratteri.';
        cognome_error_reg.style.display = 'block';
        return false;
    }
    else 
        cognome_error_reg.textContent = '';

    // EMAIL
    if (email === '') {
        email_error_reg.textContent = 'Il campo email non può essere vuoto.';
        email_error_reg.style.display = 'block';
        return false;
    }
    else if(!strutturaEmail.test(email)) {
        email_error_reg.textContent = 'Il formato dell\'email non è corretto.';
        email_error_reg.style.display = 'block';
        return false;
    }
    else
        email_error_reg.textContent = '';

    // PASSWORD
    if (password.length < 8) {
        password_error_reg.textContent = 'La password deve essere almeno di 8 caratteri.';
        password_error_reg.style.display = 'block';
        return false;
    }
    else 
        password_error_reg.textContent = '';

    // CONFERMA PASSWORD
    if (conf_password === '') {
        conf_pass_error_reg.textContent = 'Il campo conferma password non deve essere vuoto.';
        conf_pass_error_reg.style.display = 'block';
        return false;
    }
    else if (conf_password != password) {
        conf_pass_error_reg.textContent = 'Le due password non coincidono.';
        conf_pass_error_reg.style.display = 'block';
        return false;
    }
    else
        conf_pass_error_reg.textContent = '';

    return true;
}
