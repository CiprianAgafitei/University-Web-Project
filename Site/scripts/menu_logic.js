function checkWindowSize() {
    const screenWidth = window.innerWidth;
    const desktopMenu = document.getElementById('menu');

    var menuLinks = document.querySelectorAll(".mobile-nav a");

    if (screenWidth <= 1032) {
        // Schermo piccolo o uguale a 1032px (mobile)
        menuLinks.forEach(function (link) {
            link.setAttribute('aria-hidden', 'false');
            link.setAttribute('tabindex', '0');
        });
        desktopMenu.setAttribute('aria-hidden', 'true');
        desktopMenu.setAttribute('tabindex', '-1');
    } else {
        // Schermo più grande di 1032px (desktop)
        menuLinks.forEach(function (link) {
            link.setAttribute('aria-hidden', 'true');
            link.setAttribute('tabindex', '-1');
        });
        desktopMenu.setAttribute('aria-hidden', 'false');
        desktopMenu.setAttribute('tabindex', '0');
    }
}

window.onload = function () {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            document.querySelector("header").classList.add('is-scrolling');
        }
        else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_button = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_button.addEventListener('click', function () {
        menu_button.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });

    const currentPath = window.location.pathname.replace(/\/[^\/]+$/, '');
    let pathToAuthPhp = "";
    if (currentPath.includes('/php'))
        pathToAuthPhp = window.location.origin + currentPath + '/auth.php';
    else
        pathToAuthPhp = window.location.origin + currentPath + '/php/auth.php';
 
    // Verifica se l'utente è loggato e aggiorna il testo del menu
    const accessButtonDesktop = document.getElementById('login-link-desk');
    const accessButtonMobile = document.getElementById('login-link-mob');
    if (accessButtonDesktop !== null && accessButtonMobile !== null) 
    {
        fetch(pathToAuthPhp)
        .then(response => response.text())
        .then(data => {
            const parsedData = JSON.parse(data);
            accessButtonDesktop.textContent = parsedData.logged_in ? 'Area riservata' : 'Accedi';
            accessButtonMobile.textContent = parsedData.logged_in ? 'Area riservata' : 'Accedi';
        });
    }
}

window.addEventListener('DOMContentLoaded', checkWindowSize);
window.addEventListener('resize', checkWindowSize);
