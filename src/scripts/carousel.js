export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');
    const leftBtn = document.querySelector('.left-arrow');
    const rightBtn = document.querySelector('.right-arrow');

    if (!track || slides.length === 0) return;

    let currentIndex = 0; // On garde en mémoire la carte actuelle

    // 1. Fonction magique pour scroller vers une carte précise
    const scrollToIndex = (index) => {
        const slide = slides[index];
        // Calcul pour centrer parfaitement la carte dans l'écran
        const scrollPos = slide.offsetLeft - (track.offsetWidth - slide.offsetWidth) / 2;
        track.scrollTo({ left: scrollPos, behavior: 'smooth' });
    };

    // 2. Observer (Détecte quand une carte arrive au centre en scrollant à la main)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-active');

                // Mettre à jour l'index et les petits points
                currentIndex = Array.from(slides).indexOf(entry.target);
                dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
            } else {
                entry.target.classList.remove('is-active');
                entry.target.classList.remove('is-expanded'); // On replie la carte si elle quitte le centre
            }
        });
    }, {
        root: track,
        threshold: 0.6 // S'active quand 60% de la carte est au centre
    });

    slides.forEach(slide => observer.observe(slide));

    // 3. Clic sur une carte
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (!slide.classList.contains('is-active')) {
                scrollToIndex(index); // Centrer si elle est sur le côté
            } else {
                slide.classList.toggle('is-expanded'); // Déplier si elle est au centre
            }
        });
    });

    // 4. Gestion des flèches avec BOUCLE INFINIE
    if (leftBtn && rightBtn) {
        leftBtn.addEventListener('click', () => {
            let nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = slides.length - 1; // Si on est au début, on saute à la fin
            scrollToIndex(nextIndex);
        });

        rightBtn.addEventListener('click', () => {
            let nextIndex = currentIndex + 1;
            if (nextIndex >= slides.length) nextIndex = 0; // Si on est à la fin, on saute au début
            scrollToIndex(nextIndex);
        });
    }

    // 5. Clic sur les points de navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => scrollToIndex(index));
    });
}