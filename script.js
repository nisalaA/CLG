document.addEventListener('DOMContentLoaded', () => {
    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800, // Animation duration
            once: true, // Whether animation should happen only once - while scrolling down
            offset: 50, // Offset (in px) from the original trigger point
        });
    }

    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});
