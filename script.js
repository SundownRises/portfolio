/* ═══════════════════════════════════════════════
   ANIKAIT SEHWAG — PORTFOLIO
   Interactive Behaviors
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initScrollReveal();
  initTypewriter();
  initCursorGlow();
  initParticles();
  initCountUp();
  initContactForm();
});

/* ── NAVIGATION ── */
function initNavigation() {
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll effect
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }

        // Active section highlighting
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          const id = section.getAttribute('id');

          if (scrollPos >= top && scrollPos < top + height) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
              }
            });
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ── MOBILE MENU ── */
function initMobileMenu() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so staggered children animate properly
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px',
  });

  reveals.forEach(el => observer.observe(el));
}

/* ── TYPEWRITER ── */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'Software Engineer Intern',
    'GSoC \'25 Contributor',
    'Full-Stack Developer',
    'Open Source Enthusiast',
    'Machine Learning Explorer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    timeout = setTimeout(type, delay);
  }

  type();
}

/* ── CURSOR GLOW ── */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.innerWidth < 768) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }

  animate();
}

/* ── PARTICLES ── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const particleCount = 40;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 20;
    const x = Math.random() * 100;
    const y = Math.random() * 100;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: ${Math.random() > 0.5 ? 'rgba(0, 212, 255, 0.3)' : 'rgba(124, 58, 237, 0.3)'};
      border-radius: 50%;
      left: ${x}%;
      top: ${y}%;
      animation: particle-float ${duration}s ${delay}s ease-in-out infinite;
      pointer-events: none;
    `;
    container.appendChild(particle);
  }

  // Inject particle animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particle-float {
      0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.4; }
      25% { transform: translate(${rand(-30, 30)}px, ${rand(-40, 40)}px) scale(1.2); opacity: 0.8; }
      50% { transform: translate(${rand(-20, 20)}px, ${rand(-50, 50)}px) scale(0.8); opacity: 0.3; }
      75% { transform: translate(${rand(-35, 35)}px, ${rand(-30, 30)}px) scale(1.1); opacity: 0.6; }
    }
  `;
  document.head.appendChild(style);
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* ── COUNT UP ── */
function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        animateCount(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCount(el, target) {
  const duration = 1500;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(eased * target);
    el.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/* ── CONTACT FORM ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = document.getElementById('contactSubmit');
    const originalHTML = btn.innerHTML;

    // Show loading state
    btn.innerHTML = '<i class="ph ph-spinner-gap" style="animation: spin 1s linear infinite;"></i> Sending...';
    btn.disabled = true;

    // Add spin animation if not already added
    if (!document.getElementById('spinAnimation')) {
      const style = document.createElement('style');
      style.id = 'spinAnimation';
      style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
      document.head.appendChild(style);
    }

    const formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        btn.innerHTML = '<i class="ph ph-check-circle"></i> Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        form.reset();
      } else {
        btn.innerHTML = '<i class="ph ph-x-circle"></i> Error Occurred';
        btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
        console.error('Submission error:', data);
      }
    })
    .catch(error => {
      btn.innerHTML = '<i class="ph ph-x-circle"></i> Error Occurred';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
      console.error('Fetch error:', error);
    })
    .finally(() => {
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        btn.style.background = '';
      }, 3000);
    });
  });
}

/* ── SMOOTH SCROLL for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
