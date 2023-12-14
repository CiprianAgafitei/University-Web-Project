document.addEventListener('DOMContentLoaded', function () {
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle the scroll event
    function handleScroll() {
        var homeContent = document.querySelector('.home-content');

        if (isElementInViewport(homeContent)) {
            homeContent.classList.add('is-visible');
            // Remove the event listener once the animation is triggered
            window.removeEventListener('scroll', handleScroll);
        }
    }

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Trigger the scroll event handler on page load (in case the element is already in the viewport)
    handleScroll();
});
