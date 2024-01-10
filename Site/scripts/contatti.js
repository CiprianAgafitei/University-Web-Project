document.addEventListener('DOMContentLoaded', function () {
    var nome_error_mess = document.getElementById('errore_nome');
    var email_error_mess = document.getElementById('errore_email');
    var titolo_error_mess = document.getElementById('errore_titolo');
    var messaggio_error_mess = document.getElementById('errore_messaggio');

    if (nome_error_mess && nome_error_mess.textContent.trim() === '') {
        nome_error_mess.style.display = 'none';
    }

    if (email_error_mess && email_error_mess.textContent.trim() === '') {
        email_error_mess.style.display = 'none';
    }

    if (titolo_error_mess && titolo_error_mess.textContent.trim() === '') {
        titolo_error_mess.style.display = 'none';
    }

    if (messaggio_error_mess && messaggio_error_mess.textContent.trim() === '') {
        messaggio_error_mess.style.display = 'none';
    }
});

function validateFormContatti() {
    var strutturaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    var nome = document.getElementById('nome').value.trim();
    var email = document.getElementById('email').value.trim();
    var titolo = document.getElementById('titolo').value.trim();
    var messaggio = document.getElementById('messaggio').value.trim();

    var nome_error_mess = document.getElementById('errore_nome');
    var email_error_mess = document.getElementById('errore_email');
    var titolo_error_mess = document.getElementById('errore_titolo');
    var messaggio_error_mess = document.getElementById('errore_messaggio');

    // NOME
    if (nome === '' || nome.length < 3) {
        nome_error_mess.textContent = 'Il campo nome deve esserci ed avere una lunghezza maggiore di 2 caratteri.';
        nome_error_mess.style.display = 'block';
        return false;
    }
    else 
        nome_error_mess.textContent = '';

    // EMAIL
    if (email === '') {
        email_error_mess.textContent = 'Il campo email non può essere vuoto.';
        email_error_mess.style.display = 'block';
        return false;
    }
    else if (!strutturaEmail.test(email)) {
        email_error_mess.textContent = 'Il formato dell\'email non è corretto.';
        email_error_mess.style.display = 'block';
        return false;
    }
    else
        email_error_mess.textContent = '';
    
    // TITOLO
    if (titolo.length > 50) {
        titolo_error_mess.textContent = 'Il titolo deve avere una lunghezza inferiore ai 50 caratteri.';
        titolo_error_mess.style.display = 'block';
        return false;
    }
    else 
        titolo_error_mess.textContent = '';

    // MESSAGGIO
    if (messaggio === '' || messaggio.length > 500) {
        messaggio_error_mess.textContent = 'Il messaggio deve esserci ed avere una lunghezza non superiore ai 500 caratteri.';
        messaggio_error_mess.style.display = 'block';
        return false;
    }
    else
        messaggio_error_mess.textContent = '';

    return true;
}
