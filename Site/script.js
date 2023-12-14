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

