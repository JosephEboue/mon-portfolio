const navbar = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const menuIcon = document.getElementById('menuIcon');
const mobileMenu = document.getElementById('mobileMenu');
const uptimeEl = document.getElementById('uptime');

function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScroll);
onScroll();

menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuIcon.textContent = open ? '×' : '☰';
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('[data-scroll]').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.getAttribute('data-scroll');
    const target = document.getElementById(id);
    mobileMenu.classList.remove('open');
    menuIcon.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function pad(number) {
  return String(number).padStart(2, '0');
}

function updateUptime() {
  const start = new Date('2025-12-15T00:00:00').getTime();
  const diff = Math.max(0, Date.now() - start);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  uptimeEl.textContent = `${days}j ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
updateUptime();
setInterval(updateUptime, 1000);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 40, 320)}ms`;
  observer.observe(element);
});
