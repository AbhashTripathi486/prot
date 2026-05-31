/* ===================================================
   ABHASH TRIPATHI — Portfolio JavaScript
   Scroll-driven interactions, nav highlighting, filters
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ─── NAVBAR SCROLL EFFECT ─────────────────────────
  const navbar = document.getElementById('navbar');

  const handleNavbarScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  // ─── HAMBURGER TOGGLE (MOBILE) ────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ─── ACTIVE SECTION HIGHLIGHTING ──────────────────
  const sections = document.querySelectorAll('section[id]');
  const topNavLinks = document.querySelectorAll('.nav-links a[data-section]');
  const sideNavLinks = document.querySelectorAll('.side-nav a[data-section]');

  const setActive = (sectionId) => {
    topNavLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === sectionId);
    });
    sideNavLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === sectionId);
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0,
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActive(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));

  // ─── SCROLL REVEAL ────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── PORTFOLIO FILTERS ────────────────────────────
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          // tiny stagger animation
          item.style.opacity = '0';
          item.style.transform = 'translateY(16px)';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          });
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ─── CONTACT FORM (DEMO HANDLER) ──────────────────
  const contactForm = document.getElementById('contact-form');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const sendBtn = document.getElementById('send-btn');
    const originalText = sendBtn.innerHTML;

    sendBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      Sent!
    `;
    sendBtn.style.pointerEvents = 'none';

    setTimeout(() => {
      sendBtn.innerHTML = originalText;
      sendBtn.style.pointerEvents = '';
      contactForm.reset();
    }, 2500);
  });

  // ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
