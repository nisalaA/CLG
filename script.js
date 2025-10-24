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
    const header = document.querySelector('header');

    const toggleMenu = () => {
        const isOpen = mobileMenu.classList.toggle('is-open');
        header.classList.toggle('is-open', isOpen);

        // Stagger link animation
        if (isOpen) {
            const links = mobileMenu.querySelectorAll('.mobile-menu-link');
            links.forEach((link, index) => {
                link.style.transitionDelay = `${index * 100 + 150}ms`;
            });
        } else {
            const links = mobileMenu.querySelectorAll('.mobile-menu-link');
            links.forEach(link => {
                link.style.transitionDelay = '0ms';
            });
        }
    };

    if (menuBtn && mobileMenu && header) {
        menuBtn.addEventListener('click', toggleMenu);
    }

    // Lazy load hero video
    const heroVideo = document.getElementById('hero-video');
    if (heroVideo) {
        // Provide modern (WebM) and fallback (MP4) formats.
        // The browser will use the first one it supports.
        const sources = [
            { src: '0129(4).webm', type: 'video/webm' },
            { src: '0129(4).mp4', type: 'video/mp4' }
        ];

        sources.forEach(s => {
            const sourceElement = document.createElement('source');
            sourceElement.src = s.src;
            sourceElement.type = s.type;
            heroVideo.appendChild(sourceElement);
        });
        
        heroVideo.load();
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });
        backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // Testimonial Slider
    const slider = document.getElementById('testimonial-slider');
    if (slider) {
        const slides = slider.getElementsByClassName('testimonial-slide');
        const dots = document.getElementById('testimonial-dots').getElementsByClassName('testimonial-dot');
        const prevBtn = document.getElementById('prev-testimonial');
        const nextBtn = document.getElementById('next-testimonial');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(n) {
            if (n >= slides.length) { currentSlide = 0; }
            if (n < 0) { currentSlide = slides.length - 1; }

            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.add('hidden');
                dots[i].classList.remove('active');
            }

            slides[currentSlide].classList.remove('hidden');
            dots[currentSlide].classList.add('active');
        }

        const next = () => showSlide(++currentSlide);

        const startSlider = () => slideInterval = setInterval(next, 5000); // Auto-slide every 5 seconds
        const resetSlider = () => {
            clearInterval(slideInterval);
            startSlider();
        };

        prevBtn.addEventListener('click', () => { showSlide(--currentSlide); resetSlider(); });
        nextBtn.addEventListener('click', () => { next(); resetSlider(); });
        Array.from(dots).forEach((dot, i) => dot.addEventListener('click', () => { showSlide(currentSlide = i); resetSlider(); }));

        showSlide(currentSlide);
        startSlider();
    }
});
