document.addEventListener('DOMContentLoaded', function () {
    // Controllo se webp è supportato
    Modernizr.addTest('webp', function() {
        return (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
    });

    var supportedClass = Modernizr.webp ? 'webp-supported' : 'no-webp';

    var sportsElements = document.querySelectorAll('.sport');
    sportsElements.forEach(function(element) {
        element.classList.add(supportedClass);
    });

    var mainBackgroundElement = document.querySelector('.main-background');
    if (mainBackgroundElement) {
        mainBackgroundElement.classList.add(supportedClass);
    }
});