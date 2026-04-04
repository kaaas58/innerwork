/* =============================================
   IM INNEREN — Script
   ============================================= */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Active nav link on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  const scrollPos = window.scrollY + window.innerHeight / 3;

  sections.forEach(section => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + section.id) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

// --- Mobile menu toggle (nav-right container) ---
const navToggle = document.getElementById('navToggle');
const navRight  = document.querySelector('.nav-right');

navToggle.addEventListener('click', () => {
  const isOpen = navRight.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Close menu on link click (mobile)
navRight.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navRight.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// --- Dark / Light mode toggle ---
const themeToggle = document.getElementById('themeToggle');
const iconMoon    = themeToggle.querySelector('.icon-moon');
const iconSun     = themeToggle.querySelector('.icon-sun');

// Persist preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  iconMoon.style.display = 'none';
  iconSun.style.display  = 'block';
}

themeToggle.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light');
  iconMoon.style.display = isLight ? 'none'  : 'block';
  iconSun.style.display  = isLight ? 'block' : 'none';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// --- Scroll reveal ---
const revealElements = document.querySelectorAll(
  '.section-text, .section-aside, .section-center-title, .section-center-lead, ' +
  '.identity-card, .tool-card, .affirmation, .final-content, .identity-answer, ' +
  '.compare-block, .tools-footer, .final-affirmations, .time-visual, ' +
  '.card-highlight, .aurelius-quote, .band'
);

revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal'));
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach(el => observer.observe(el));

// --- Subtle parallax on hero ---
const heroBg = document.querySelector('.hero-bg-pattern');

if (heroBg) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroBg.style.transform = `translateY(${y * 0.25}px)`;
    }
  }, { passive: true });
}

// --- Hero entrance animation ---
document.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.querySelector('.hero-content');
  const heroQuote   = document.querySelector('.hero-quote-badge');

  if (heroContent) {
    heroContent.style.opacity    = '0';
    heroContent.style.transform  = 'translateY(20px)';
    heroContent.style.transition = 'opacity 1s ease 0.2s, transform 1s ease 0.2s';

    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroContent.style.opacity   = '1';
      heroContent.style.transform = 'none';
    }));
  }

  if (heroQuote) {
    heroQuote.style.opacity    = '0';
    heroQuote.style.transition = 'opacity 1s ease 0.8s';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroQuote.style.opacity = '1';
    }));
  }
});
