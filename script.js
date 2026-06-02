/* 244 Club — script.js */
(function () {
  'use strict';

  /* ── NAV SCROLL ─────────────────────────────── */
  var nav = document.getElementById('nav');
  function onScroll() {
    nav && nav.classList.toggle('scrolled', window.scrollY > 16);
    updateOrbitTarget();
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── HAMBURGER / MOBILE DRAWER ──────────────── */
  var ham    = document.getElementById('hamburger');
  var drawer = document.getElementById('mobileDrawer');
  if (ham && drawer) {
    ham.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      ham.classList.toggle('open', open);
      ham.setAttribute('aria-expanded', open);
      drawer.setAttribute('aria-hidden', !open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('open');
        ham.classList.remove('open');
        ham.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  /* ── ORBITAL SCROLL ANIMATION ───────────────── */
  var ring       = document.getElementById('orbsRing');
  var orbContents = ring ? ring.querySelectorAll('.orb-content') : [];
  var hero       = document.getElementById('hero');
  var currentRot = 0;
  var targetRot  = 0;

  function updateOrbitTarget() {
    if (!hero || !ring) return;
    var heroH    = hero.offsetHeight || window.innerHeight;
    var progress = Math.min(Math.max(window.scrollY / heroH, 0), 1);
    targetRot = progress * 90;
  }

  function animateRing() {
    if (!ring) return;
    var diff = targetRot - currentRot;
    if (Math.abs(diff) > 0.02) {
      currentRot += diff * 0.09;
      ring.style.transform = 'rotate(' + currentRot.toFixed(2) + 'deg)';
      orbContents.forEach(function (c) {
        c.style.transform = 'rotate(' + (-currentRot).toFixed(2) + 'deg)';
      });
    }
    requestAnimationFrame(animateRing);
  }

  if (ring) {
    updateOrbitTarget();
    animateRing();
  }

  /* ── SCROLL REVEAL ──────────────────────────── */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, i) {
        if (e.isIntersecting) {
          setTimeout(function () { e.target.classList.add('visible'); }, i * 60);
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── GALLERY LIGHTBOX ───────────────────────── */
  var lb      = document.getElementById('lightbox');
  var lbImg   = lb ? lb.querySelector('img') : null;
  var lbClose = document.getElementById('lightbox-close');

  function openLightbox(src) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { if (lbImg) lbImg.src = ''; }, 300);
  }

  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLightbox();
    });
  }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    var img = item.querySelector('img');
    if (!img) return;
    item.style.cursor = 'zoom-in';
    item.addEventListener('click', function () { openLightbox(img.src); });
  });

  /* ── FORM SUBMISSION (placeholder) ─────────── */
  var form    = document.getElementById('joinForm');
  var success = document.getElementById('formSuccess');
  if (form && success) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll('[required]').forEach(function (f) {
        if (!f.value.trim()) {
          ok = false;
          f.style.borderColor = '#c0392b';
          f.addEventListener('input', function () { f.style.borderColor = ''; }, { once: true });
        }
      });
      var emailF = form.querySelector('[type="email"]');
      if (emailF && emailF.value && !/\S+@\S+\.\S+/.test(emailF.value)) {
        ok = false;
        emailF.style.borderColor = '#c0392b';
      }
      if (!ok) return;
      var btn = form.querySelector('[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Submitting…';
      setTimeout(function () {
        form.style.display = 'none';
        success.classList.add('visible');
      }, 700);
    });
  }

  /* ── SMOOTH ANCHORS ─────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

})();
