const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -40px 0px' }
  );
  elements.forEach(el => observer.observe(el));
}

function initActiveNav() {
  const navLinks = document.querySelectorAll('[data-nav] a');
  if (!navLinks.length) return;
  const current = location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
  navLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const normalizedHref = href.replace(/index\.html$/, '').replace(/\/+$/, '') || '/';
    if (current === normalizedHref || (normalizedHref !== '/' && current.startsWith(normalizedHref))) {
      link.classList.add('active');
    }
  });
}

function initToast() {
  window.showToast = (message, isError = false) => {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'toast' + (isError ? ' error' : '');
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(window.__toastTimer);
    window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initReveal();
  initActiveNav();
  initToast();
});
