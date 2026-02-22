const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
const open = hamburger.classList.toggle('open');
menu.classList.toggle('open', open);
});

function closeMenu() {
hamburger.classList.remove('open');
menu.classList.remove('open');
}

document.addEventListener('click', e => {
if (!hamburger.contains(e.target) && !menu.contains(e.target))
    closeMenu();
});

const revealObserver = new IntersectionObserver(entries => {
entries.forEach(e => {
    if (e.isIntersecting) {
    e.target.classList.add('visible');
    revealObserver.unobserve(e.target);
    }
});
}, { threshold: 0.06 });

document.querySelectorAll('.reveal').forEach(e => revealObserver.observe(e));

function copyBlock(copyButton) {
const preTag = copyButton.closest('.code-block').querySelector('pre');
navigator.clipboard.writeText(pre.innerText.trim()).then(() => {
    const originalText = copyButton.textContent;
    copyButton.textContent = 'Copied!'
    setTimeout(() => copyButton.textContent = originalText, 1800);
});
}
