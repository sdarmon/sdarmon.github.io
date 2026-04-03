// src/scripts/atelier.js

export function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    const closeBtn = document.querySelector('.close-lightbox');

    // Sécurité : on vérifie que les éléments existent sur la page
    if (!lightbox || !lightboxImg) return;

    const openLightbox = (img) => {
        const src = img.getAttribute('src');
        lightboxImg.setAttribute('src', src);
        lightbox.style.display = 'flex';
        // Petit délai pour permettre à l'animation CSS de se déclencher
        setTimeout(() => lightbox.classList.add('active'), 10);
        // On empêche le scroll de la page derrière quand l'image est ouverte
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // On réactive le scroll
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    };

    // Attacher les événements de clic sur les images de la galerie
    galleryImages.forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    // Fermeture au clic sur le bouton "X"
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeLightbox();
        });
    }

    // Fermeture au clic sur le fond noir (mais pas sur l'image elle-même)
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

// Dans initLightbox()
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('src');
            const credit = img.getAttribute('data-credit'); // On récupère l'attribut

            const lightboxImg = document.getElementById('lightbox-img');
            const lightboxCaption = document.getElementById('lightbox-caption');

            lightboxImg.setAttribute('src', src);

            // On écrit le texte. Si "credit" existe, on met un petit copyright devant.
            if (credit) {
                lightboxCaption.innerText = `© ${credit}`;
            } else {
                lightboxCaption.innerText = "";
            }

            const lightbox = document.getElementById('lightbox');
            lightbox.style.display = 'flex';
            setTimeout(() => lightbox.classList.add('active'), 10);
        });
    });
}

// Dans ton fichier src/scripts/atelier.js

export function initQuizIA() {
    const btn = document.getElementById('reveal-btn');
    const text = document.getElementById('solution-text');
    const realCatCard = document.querySelector('.real-cat');

    if (btn && text) {
        btn.addEventListener('click', () => {
            // Affiche le texte
            text.classList.toggle('show');

            // Encadre la vraie Hécate en vert
            if (realCatCard) {
                realCatCard.classList.toggle('revealed-real');
            }

            // Change le texte du bouton
            btn.textContent = text.classList.contains('show') ? 'Cacher la solution' : 'Voir la solution';
        });
    }
}