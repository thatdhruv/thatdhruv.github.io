const buttonResume = document.getElementById('button-resume');
const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('dropdown');
const navLinks = document.querySelectorAll('.nav-link');
const projectRow = document.getElementById('project-row');

const sectionToButton = {};
navLinks.forEach(link => {
    sectionToButton[link.dataset.target] = link;
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;

                navLinks.forEach(link => {
                    if (link.dataset.target === id) {
                        link.classList.add('aqua-button-focused');
                    } else {
                        link.classList.remove('aqua-button-focused');
                    }
                });
            }
        });
    },
    {
        root: null,
        rootMargin: '0px',
        threshold: 0.6
    }
);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

function closeMenu() {
    hamburger.classList.remove('open');
    dropdown.classList.remove('show');
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        closeMenu();
    }
}

function updateScrollIndicators() {
  const maxScrollLeft = projectRow.scrollWidth - projectRow.clientWidth;
  scrollLeftButton.classList.toggle('hidden', projectRow.scrollLeft <= 10);
  scrollRightButton.classList.toggle('hidden', projectRow.scrollLeft >= maxScrollLeft - 10);
}

buttonResume.addEventListener('click', () => {
    window.open('https://drive.google.com/file/d/1ONXRaQgtWCpae-vwBHUYJYxF4vPdDLcT/view?usp=drive_link', '_blank');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buttonResume.click();
    } else if (e.key === 'Escape') {
        closeMenu();
    }
});

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('open');
    dropdown.classList.toggle('show');
});

document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.dataset.target;
        scrollToSection(targetId);
    });
});

document.querySelectorAll('.scroll-indicator').forEach(indicator => {
    indicator.addEventListener('click', () => {
        const targetId = indicator.dataset.target;
        scrollToSection(targetId);
    });
});

document.getElementById('scrollup').addEventListener('click', () => {
    const home = document.getElementById('home');
    if (home) {
        home.scrollIntoView({ behavior: 'smooth' });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const projectRow = document.getElementById('project-row');
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');
    const cards = [...projectRow.querySelectorAll('.project-card')];
    let currentCardIndex = 0;

    function scrollToCard(index) {
        if (index < 0 || index >= cards.length) return;
        currentCardIndex = index;
        cards[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        updateScrollIndicators();
    }

    function updateScrollIndicators() {
        const maxScrollLeft = projectRow.scrollWidth - projectRow.clientWidth;

        const isScrollable = maxScrollLeft > 5;

        scrollLeftButton.classList.toggle('hidden', !isScrollable || currentCardIndex <= 0);
        scrollRightButton.classList.toggle('hidden', !isScrollable || currentCardIndex >= cards.length - 1);
    }

    scrollLeftButton.addEventListener('click', () => {
        if (currentCardIndex > 0) {
        scrollToCard(currentCardIndex - 1);
        }
    });

    scrollRightButton.addEventListener('click', () => {
        if (currentCardIndex < cards.length - 1) {
        scrollToCard(currentCardIndex + 1);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
        scrollToCard(currentCardIndex - 1);
        } else if (e.key === 'ArrowRight') {
        scrollToCard(currentCardIndex + 1);
        }
    });

    window.addEventListener('resize', () => {
        if (cards.length > 0) {
        cards[currentCardIndex].scrollIntoView({ behavior: 'auto', inline: 'center', block: 'nearest' });
        }
        updateScrollIndicators();
    });

    projectRow.addEventListener('scroll', () => {
        const scrollLeft = projectRow.scrollLeft;
        const cardWidths = cards.map(card => card.offsetLeft);
        const middle = scrollLeft + projectRow.offsetWidth / 2;

        const closest = cardWidths.reduce((closestIdx, left, idx) => {
        return Math.abs(left + cards[idx].offsetWidth / 2 - middle) <
                Math.abs(cardWidths[closestIdx] + cards[closestIdx].offsetWidth / 2 - middle)
            ? idx
            : closestIdx;
        }, 0);

        currentCardIndex = closest;
        updateScrollIndicators();
    });

    updateScrollIndicators();
});