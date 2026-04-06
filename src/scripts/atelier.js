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
    const quizContainer = document.querySelector('.ia-quiz-container');
    const items = document.querySelectorAll('.ia-item');
    const solutionText = document.getElementById('solution-text');
    const revealBtn = document.getElementById('reveal-btn');

    if (!quizContainer || items.length === 0) return;

    items.forEach(item => {
        item.addEventListener('click', () => {
            // Si on a déjà répondu, on ne fait rien
            if (quizContainer.classList.contains('answered')) return;

            // On marque le quiz comme "répondu"
            quizContainer.classList.add('answered');

            const isReal = item.classList.contains('real-cat');

            if (isReal) {
                // GAGNÉ
                item.classList.add('revealed-correct');
            } else {
                // PERDU
                item.classList.add('revealed-wrong');
                // On montre quand même où était la bonne réponse
                document.querySelector('.real-cat').classList.add('revealed-correct');
            }

            // On affiche le texte de solution
            solutionText.classList.add('show');

            // On change le texte du bouton pour proposer de recommencer
            if (revealBtn) revealBtn.textContent = "Recommencer le test";
        });
    });

    // Gestion du bouton de solution / Reset
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            if (quizContainer.classList.contains('answered')) {
                // RESET : On remet tout à zéro pour rejouer
                quizContainer.classList.remove('answered');
                items.forEach(i => i.classList.remove('revealed-correct', 'revealed-wrong'));
                solutionText.classList.remove('show');
                revealBtn.textContent = "Voir la solution";
            } else {
                // REVELATION MANUELLE : Si l'utilisateur clique sur le bouton sans avoir choisi d'image
                quizContainer.classList.add('answered');
                document.querySelector('.real-cat').classList.add('revealed-correct');
                solutionText.classList.add('show');
                revealBtn.textContent = "Recommencer le test";
            }
        });
    }
}