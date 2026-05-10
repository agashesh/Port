/* ============================================================
   HANGGARA PORTFOLIO — main.js
   ============================================================ */

/* --- Custom Cursor --- */
const cursorDot  = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function animateRing() {
  rx += (mx - rx) * 0.11;
  ry += (my - ry) * 0.11;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(animateRing);
})();

// Expand cursor on interactive elements
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width    = '12px';
    cursorDot.style.height   = '12px';
    cursorRing.style.width   = '56px';
    cursorRing.style.height  = '56px';
    cursorRing.style.opacity = '0.6';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width    = '7px';
    cursorDot.style.height   = '7px';
    cursorRing.style.width   = '34px';
    cursorRing.style.height  = '34px';
    cursorRing.style.opacity = '1';
  });
});

/* --- Mobile Menu --- */
const menuBtn    = document.getElementById('menu-btn');
const menuClose  = document.getElementById('menu-close');
const mobileMenu = document.getElementById('mobile-menu');

function openMenu() {
  mobileMenu.classList.remove('translate-x-full');
  mobileMenu.classList.add('translate-x-0');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobileMenu.classList.add('translate-x-full');
  mobileMenu.classList.remove('translate-x-0');
  document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);

// Close when a mobile link is tapped
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* --- Scroll Reveal --- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* --- Skill bar animate-in on scroll --- */
const skillBarObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        // bar width is set inline in HTML; just triggering reflow animates it
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => { bar.style.width = targetWidth; });
        });
      }
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-card').forEach(el => skillBarObserver.observe(el));

/* --- Active nav highlight on scroll --- */
const sections  = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.opacity = link.getAttribute('href') === '#' + entry.target.id ? '1' : '0.65';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => sectionObserver.observe(sec));
