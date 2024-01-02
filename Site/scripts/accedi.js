document.addEventListener('DOMContentLoaded', function () {
    const loginSection = document.getElementById('login-access');
    const registerSection = document.getElementById('register-access');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    
    // Nasconde la parte di registrazione e mostra quella per login
    loginSection.style.display = "block";
    registerSection.style.display = "none";

    // dalla registrazione si passa al login
    loginLink.addEventListener('click', () => {
        loginSection.style.display = "block";
        registerSection.style.display = "none";
    });

    // dal login si passa alla registrazione
    registerLink.addEventListener('click', () => {
        loginSection.style.display = "none";
        registerSection.style.display = "block";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    
});