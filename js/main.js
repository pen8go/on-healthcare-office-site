/* ============================================
   ON HEALTHCARE OFFICE - Main JavaScript
   Navigation, Smooth Scroll, FAQ, Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Mobile Menu ----------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const body = document.body;

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.contains('mobile-open');
      mainNav.classList.toggle('mobile-open');
      mobileMenuBtn.classList.toggle('active');
      body.classList.toggle('menu-open');
      mobileMenuBtn.setAttribute('aria-label', isOpen ? 'メニューを開く' : 'メニューを閉じる');
    });

    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
  }


  // ---------- Header Scroll Effect ----------
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 10);
    }
  }

  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();


  // ---------- Active Nav Link by Current Page ----------
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop().split('#')[0];
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });


  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ---------- Intersection Observer: Fade-in Animation ----------
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableSelectors = [
    '.challenge-card',
    '.service-card',
    '.content-card',
    '.flow-step',
    '.faq-item',
    '.philosophy-item',
    '.sub-cta-card',
    '.member-card',
    '.section-header'
  ];

  animatableSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('fade-in-up');
      el.style.transitionDelay = `${index * 0.06}s`;
      observer.observe(el);
    });
  });


  // ---------- Contact Form (Google Forms via hidden iframe) ----------
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const hiddenIframe = document.querySelector('iframe[name="hidden-iframe"]');

  if (contactForm && formSuccess && hiddenIframe) {
    let submitted = false;

    contactForm.addEventListener('submit', (e) => {
      // HTML5 バリデーション
      if (!contactForm.checkValidity()) {
        e.preventDefault();
        contactForm.reportValidity();
        return;
      }
      submitted = true;

      const btn = document.getElementById('submitBtn');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
      }
    });

    hiddenIframe.addEventListener('load', () => {
      if (submitted) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        const top = formSuccess.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
        submitted = false;
      }
    });
  }


  // ---------- Smooth scroll for in-page anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 76;
        const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

});
