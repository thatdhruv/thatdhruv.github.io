const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
});

mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-hidden', 'true');
    });
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
    }
});

const navAnchors = document.querySelectorAll('.nav-links a');

const secObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting)
            navAnchors.forEach(a =>
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
            );
    });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));

const revObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revObs.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

function fixBrandWidth() {
    document.querySelectorAll('.brand-text').forEach(block => {
        const nameEl = block.querySelector('.name span');
        const designedByEl = block.querySelector('.designed-by span');
        if (!nameEl || !designedByEl)
            return;

        const naturalWidth = nameEl.getBoundingClientRect().width;

        const text = designedByEl.textContent;
        const charCount = text.length;
        const currentW = designedByEl.getBoundingClientRect().width;
        const diff = naturalWidth - currentW;
        const spacing = diff / (charCount - 1);

        designedByEl.style.letterSpacing = spacing + 'px';
    });
}

if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fixBrandWidth);
} else {
    window.addEventListener('load', fixBrandWidth);
}
window.addEventListener('resize', fixBrandWidth);
