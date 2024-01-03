document.addEventListener('DOMContentLoaded', (event) => {
    const textarea = document.getElementById('messaggio');
    textarea.addEventListener('input', autoResize, false);

    function autoResize() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    }
});
