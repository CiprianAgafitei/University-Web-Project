function checkWindowSize() {
    const screenWidth = window.innerWidth;
    const mobileMenu = document.querySelector('.mobile-nav');
    const desktopMenu = document.getElementById('menu');

    if (screenWidth <= 1032) {
        // Schermo piccolo o uguale a 1032px (mobile)
        mobileMenu.setAttribute('aria-hidden', 'false');
        desktopMenu.setAttribute('aria-hidden', 'true');
    } else {
        // Schermo più grande di 1032px (desktop)
        mobileMenu.setAttribute('aria-hidden', 'true');
        desktopMenu.setAttribute('aria-hidden', 'false');
    }
}


window.onload = function() {
    window.addEventListener('scroll', function(e) {
        if (window.scrollY > 100) {
            document.querySelector("header").classList.add('is-scrolling');
        }
        else {
            document.querySelector("header").classList.remove('is-scrolling');
        }
    });

    const menu_button = document.querySelector('.hamburger');
    const mobile_menu = document.querySelector('.mobile-nav');

    menu_button.addEventListener('click', function() {
        menu_button.classList.toggle('is-active');
        mobile_menu.classList.toggle('is-active');
    });
}

window.addEventListener('DOMContentLoaded', checkWindowSize);
window.addEventListener('resize', checkWindowSize);