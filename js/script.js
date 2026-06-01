const header = document.querySelector('.site-header');
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = [...document.querySelectorAll('.main-nav a, .mobile-menu a')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const closeMenu = () => {
  mobileMenu?.classList.remove('open');
  burger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('menu-open');
};

window.addEventListener('scroll', () => header?.classList.toggle('compact', window.scrollY > 24));

burger?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  mobileMenu?.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('menu-open', Boolean(open));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

navLinks.forEach((link) => link.addEventListener('click', closeMenu));

const here = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a, .mobile-menu a').forEach((a) => {
  const href = a.getAttribute('href') || '';
  if ((here === 'spectacles.html' && href === 'spectacles.html') || (here === 'ateliers.html' && href === 'ateliers.html')) a.classList.add('active');
});

if (here === 'index.html' || here === '') {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const id = entry.target.id;
        document.querySelectorAll('.main-nav a, .mobile-menu a').forEach((a) => {
          const href = a.getAttribute('href');
          a.classList.toggle('active', href === `index.html#${id}` || href === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  if (!reducedMotion) document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  else document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
} else {
  document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
}

const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.querySelector('#name')?.value?.trim() || '';
  const email = document.querySelector('#email')?.value?.trim() || '';
  const message = document.querySelector('#message')?.value?.trim() || '';
  const subject = encodeURIComponent(`Contact Bruit Parasite — ${name || 'Nouveau message'}`);
  const body = encodeURIComponent(`Nom : ${name}\nEmail : ${email}\n\nMessage :\n${message}`);
  window.location.href = `mailto:contact@bruitparasite.fr?subject=${subject}&body=${body}`;
  if (feedback) feedback.textContent = 'Le bouton ouvre votre client email ; aucun envoi n’est simulé sur le site.';
});


// Make spectacle and atelier cards clickable on the whole surface
const linkedCards = document.querySelectorAll('.spectacle-card--link[data-href], .atelier-card--link[data-href]');
linkedCards.forEach((card) => {
  const href = card.getAttribute('data-href');
  if (!href) return;

  const destination = new URL(href, window.location.href).toString();
  const isAtelierCard = card.classList.contains('atelier-card--link');
  const linkClass = isAtelierCard ? 'atelier-card__direct-link' : 'spectacle-card__direct-link';
  const linkText = isAtelierCard ? 'Voir la fiche détaillée de l’atelier' : 'Voir la fiche détaillée du spectacle';

  card.style.cursor = 'pointer';

  if (!card.querySelector(`.${linkClass}`)) {
    const directLink = document.createElement('a');
    directLink.className = linkClass;
    directLink.href = destination;
    directLink.textContent = linkText;
    card.append(directLink);
  }

  const openCard = () => window.location.assign(destination);

  card.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest('a, button')) return;
    openCard();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCard();
    }
  });
});
