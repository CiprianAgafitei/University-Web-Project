document.addEventListener("DOMContentLoaded", function() {
    const resetPasswordForm = document.getElementById("resetPasswordForm");
    const oldPassword = document.getElementById("oldPassword");
    const newPassword = document.getElementById("newPassword");
    const confirmPassword = document.getElementById("confirmPassword");
    const submitButton = document.getElementById("submit-button");
    const errorMessage = document.getElementById("error-message");

    function validateForm() {
        let valid = true;
        errorMessage.textContent = "";

        // Controlla se la nuova password è diversa dalla vecchia
        if (oldPassword.value === newPassword.value) {
            valid = false;
            errorMessage.textContent += "La nuova password deve essere diversa dalla vecchia.\n";
        }

        // Controlla se la nuova password e la conferma coincidono
        if (newPassword.value !== confirmPassword.value) {
            valid = false;
            errorMessage.textContent += "La nuova password e la conferma non corrispondono.\n";
        }

        // Aggiungi qui eventuali altri controlli di validità...

        submitButton.disabled = !valid;
    }

    resetPasswordForm.addEventListener("submit", function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Impedisce l'invio del form
        }
    });

    // Aggiungi listener per la validazione al cambio di ogni campo
    oldPassword.addEventListener("input", validateForm);
    newPassword.addEventListener("input", validateForm);
    confirmPassword.addEventListener("input", validateForm);
});
