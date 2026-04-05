/* =============================================
   IM INNEREN — Script
   ============================================= */

// --- Navbar scroll effect ---
const navbar = document.getElementById('navbar');

// --- Logo: nach oben wenn gescrollt, nach unten wenn oben ---
document.getElementById('navLogo').addEventListener('click', e => {
  e.preventDefault();
  if (window.scrollY > 80) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else {
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
  }
});

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

// --- Mobile menu toggle ---
const navToggle  = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

navToggle.addEventListener('click', () => {
  const isOpen = navOverlay.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
});

// Close on link click
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navOverlay.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// --- Dark / Light mode toggle ---
const themeToggle       = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

function syncIcons(isLight) {
  [themeToggle, themeToggleMobile].forEach(btn => {
    btn.querySelector('.icon-moon').style.display = isLight ? 'none'  : 'block';
    btn.querySelector('.icon-sun').style.display  = isLight ? 'block' : 'none';
  });
}

// Persist preference — default ist immer Dark Mode
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light');
  syncIcons(true);
} else {
  localStorage.setItem('theme', 'dark');
}

[themeToggle, themeToggleMobile].forEach(btn => {
  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    syncIcons(isLight);
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    navOverlay.classList.remove('open');
    navToggle.classList.remove('open');
  });
});

// --- Modals ---
function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('openKontakt').addEventListener('click', () => openModal('kontaktModal'));
document.getElementById('closeKontakt').addEventListener('click', () => closeModal('kontaktModal'));

document.getElementById('kontaktModal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal('kontaktModal');
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal('kontaktModal');
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
