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
    window.open('https://google.com', '_blank');
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
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const scrollAmount = 320;

  function updateScrollIndicators() {
    const maxScrollLeft = projectRow.scrollWidth - projectRow.clientWidth;
    scrollLeftBtn.classList.toggle('hidden', projectRow.scrollLeft <= 5);
    scrollRightBtn.classList.toggle('hidden', projectRow.scrollLeft >= maxScrollLeft - 5);
  }

  scrollLeftBtn.addEventListener('click', () => {
    projectRow.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });

  scrollRightBtn.addEventListener('click', () => {
    projectRow.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  projectRow.addEventListener('scroll', updateScrollIndicators);
  window.addEventListener('resize', updateScrollIndicators);

  updateScrollIndicators();
});