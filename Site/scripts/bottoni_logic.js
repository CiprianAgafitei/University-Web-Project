
document.addEventListener('DOMContentLoaded', function() {
    var bottoni = document.querySelectorAll('.bottoni_mod');

    bottoni.forEach(function(bottone) {
        bottone.addEventListener('click', function() {
            var url = this.getAttribute('data-url');
            window.location.href = url;
        });
    });
});
