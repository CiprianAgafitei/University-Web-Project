document.addEventListener('DOMContentLoaded', function () {
    var modificaPassword = document.getElementById('modify-password');
    var visualizzaPrenotazioni = document.getElementById('visualizza-prenotazioni');

    modificaPassword.addEventListener('click', function () {
        var form = document.getElementById('resetPasswordForm');
        if(form.style.display == 'none'){
            form.style.display='block';
        }
        else{
            form.style.display='none';
        }
    });

    visualizzaPrenotazioni.addEventListener('click', function () {
        var container = document.getElementById('storico-prenotazioni-cliente');
        if(container.style.display == 'none'){
            container.style.display='block';
        }
        else{
            container.style.display='none';
        }
    });
});

