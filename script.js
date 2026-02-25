const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = hamburger.classList.toggle('open');
    menu.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
});

menu.querySelectorAll('a').forEach(e => {
    e.addEventListener('click', () => {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-hidden', 'true');
    });
});

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('open');
        menu.classList.remove('open');
    }
});

const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting)
            navAnchors.forEach(a =>
                a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)
        );
    });
}, {
    rootMargin: '-40% 0px -55% 0px'
});

document.querySelectorAll('section[id]').forEach(e => sectionObserver.observe(e));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, {
    threshold: 0.12
});

document.querySelectorAll('.reveal').forEach(e => revealObserver.observe(e));