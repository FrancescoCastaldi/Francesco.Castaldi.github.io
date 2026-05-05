/**
 * main.js — unico file JS per Francesco.Castaldi.github.io
 *
 * Sostituisce: backgroundAnimation.js, menu.js, tech-animations.js,
 *              particles.js, homeInteractions.js, pageCounter.js,
 *              template-components.js, gallery.js
 *
 * Tutto il codice è racchiuso in un IIFE per evitare
 * inquinamento dello scope globale e conflitti tra moduli.
 */
(function () {
  'use strict';

  /* ================================================================
   * 1. SITE CONFIG — unica fonte di verità per navigazione e footer
   * ================================================================ */
  var SITE_CONFIG = {
    siteName: 'CASTALDI.SYS',
    copyrightYear: new Date().getFullYear(),
    navigation: [
      { name: '// HOME', href: 'index.html' },
      {
        name: '// UNIVERSITY',
        href: '#',
        dropdown: [
          { name: 'BIKE-TRACKER',      href: 'bike-maintenance.html' },
          { name: 'HOSPITAL-SYSTEM',   href: 'hospital-sanitization-tracker.html' }
        ]
      },
      {
        name: '// STRAVA',
        href: '#',
        dropdown: [
          { name: 'STRAVA STATS',      href: 'strava.html' },
          { name: 'GIANT TCR',         href: 'giant-tcr.html' },
          { name: 'MAINTENANCE TIPS',  href: 'giant-tcr-maintenance.html' },
          { name: 'TREK MADONE',       href: 'trek-madone.html' }
        ]
      },
      { name: '// CONTACT', href: 'contact.html' }
    ]
  };

  /* ================================================================
   * 2. HEADER & FOOTER INJECTION (ex template-components.js + menu.js)
   * ================================================================ */
  function buildNavHTML() {
    return SITE_CONFIG.navigation.map(function (item) {
      if (item.dropdown && item.dropdown.length) {
        var subs = item.dropdown.map(function (sub) {
          return '<a href="' + sub.href + '">' + sub.name + '</a>';
        }).join('');
        return '<li class="dropdown"><a href="' + item.href +
               '" class="dropbtn" role="button" aria-haspopup="true" aria-expanded="false">' +
               item.name + '</a><div class="dropdown-content">' + subs + '</div></li>';
      }
      return '<li><a href="' + item.href + '">' + item.name + '</a></li>';
    }).join('');
  }

  function highlightCurrentPage(navEl) {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navEl.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var isHome = (href === 'index.html' && (currentPage === 'index.html' || currentPage === ''));
      if (isHome || href === currentPage) {
        link.classList.add('active-link');
        link.setAttribute('aria-current', 'page');
        var parent = link.closest('.dropdown');
        if (parent) parent.classList.add('active-parent');
      }
    });
  }

  function injectHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;
    var nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = '<ul class="main-nav">' + buildNavHTML() + '</ul>';
    header.innerHTML = '';
    header.appendChild(nav);
    highlightCurrentPage(nav);

    // Dropdown keyboard + hover accessibility
    nav.querySelectorAll('.dropdown').forEach(function (dd) {
      var trigger = dd.querySelector('.dropbtn');
      var menu    = dd.querySelector('.dropdown-content');
      if (!trigger || !menu) return;
      trigger.addEventListener('click',      function (e) { e.preventDefault(); });
      trigger.addEventListener('focus',      function () { trigger.setAttribute('aria-expanded', 'true'); });
      trigger.addEventListener('blur',       function () { trigger.setAttribute('aria-expanded', 'false'); });
      menu.addEventListener('mouseenter',    function () { trigger.setAttribute('aria-expanded', 'true'); });
      menu.addEventListener('mouseleave',    function () { trigger.setAttribute('aria-expanded', 'false'); });
    });
  }

  function injectFooter() {
    document.querySelectorAll('footer, #site-footer').forEach(function (footer) {
      footer.classList.add('footer');
      footer.innerHTML =
        '<div>SYSTEM.STATUS: OPERATIONAL</div>' +
        '<div>&copy; ' + SITE_CONFIG.copyrightYear + ' ' + SITE_CONFIG.siteName + ' // PORT 2026</div>' +
        '<div>Page Views: <span id="visit-count"></span></div>';
    });
  }

  /* ================================================================
   * 3. PAGE VISIT COUNTER (ex pageCounter.js)
   * ================================================================ */
  function initPageCounter() {
    var KEY = 'site_total_views';
    var count = Number(localStorage.getItem(KEY) || 0) + 1;
    localStorage.setItem(KEY, count);
    var el = document.getElementById('visit-count');
    if (el) el.textContent = count;
  }

  /* ================================================================
   * 4. BACKGROUND MATRIX ANIMATION (ex backgroundAnimation.js)
   *    Solo su pagine con #bg-canvas
   * ================================================================ */
  function initBgAnimation() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var width, height, columns, drops;
    var fontSize = 16;
    var chars = '01';

    function init() {
      width   = canvas.width  = window.innerWidth;
      height  = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops   = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(3, 3, 4, 0.05)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00f2ff';
      ctx.font = fontSize + 'px JetBrains Mono';
      for (var i = 0; i < drops.length; i++) {
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    window.addEventListener('resize', init);
    init();
    setInterval(draw, 50);
  }

  /* ================================================================
   * 5. PARTICLES BACKGROUND (ex particles.js)
   *    Crea canvas solo se non esiste già un #bg-canvas
   * ================================================================ */
  function initParticles() {
    // Evita di creare particelle se la pagina usa già il canvas matrix
    if (document.getElementById('bg-canvas')) return;
    var cvs = document.createElement('canvas');
    cvs.id = 'particles-js';
    Object.assign(cvs.style, {
      position: 'fixed', top: '0', left: '0',
      width: '100%', height: '100%',
      zIndex: '-1', pointerEvents: 'none'
    });
    document.body.appendChild(cvs);
    var ctx2 = cvs.getContext('2d');
    var particles = [];

    function resize() { cvs.width = window.innerWidth; cvs.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);

    for (var i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: Math.random() > 0.5 ? '#3b82f6' : '#f97316'
      });
    }

    (function animate() {
      ctx2.clearRect(0, 0, cvs.width, cvs.height);
      particles.forEach(function (p) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > cvs.width)  p.speedX *= -1;
        if (p.y < 0 || p.y > cvs.height) p.speedY *= -1;
        ctx2.beginPath();
        ctx2.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx2.fillStyle = p.color + '22';
        ctx2.fill();
      });
      requestAnimationFrame(animate);
    })();
  }

  /* ================================================================
   * 6. TECH ANIMATIONS (ex tech-animations.js)
   *    Staggered reveal, spotlight, custom cursor, glitch, floating labels
   * ================================================================ */
  function initTechAnimations() {
    /* 6a. Staggered scroll reveal */
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el    = entry.target;
        var delay = parseFloat(el.dataset.delay || 0);
        setTimeout(function () {
          el.style.opacity   = '1';
          el.style.transform = 'translateY(0) scale(1)';
          el.style.clipPath  = 'inset(0% 0% 0% 0%)';
        }, delay);
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      'section:not(.hero), .hero-terminal, .glass-card, .skill-card, .project-card, .info-card'
    ).forEach(function (el, i) {
      var stagger = (i % 3) * 120;
      el.dataset.delay    = stagger;
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(32px) scale(0.98)';
      el.style.clipPath   = 'inset(8% 0% 0% 0%)';
      el.style.transition =
        'opacity 0.75s cubic-bezier(0.16,1,0.3,1), ' +
        'transform 0.75s cubic-bezier(0.16,1,0.3,1), ' +
        'clip-path 0.75s cubic-bezier(0.16,1,0.3,1)';
      revealObserver.observe(el);
    });

    /* 6b. Spotlight card effect */
    document.querySelectorAll('.glass-card, .skill-card, .project-card, .info-card')
      .forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
          var rect = card.getBoundingClientRect();
          card.style.setProperty('--mx', (e.clientX - rect.left) + 'px');
          card.style.setProperty('--my', (e.clientY - rect.top)  + 'px');
          card.style.backgroundImage =
            'radial-gradient(320px circle at var(--mx) var(--my), rgba(59,130,246,0.07), transparent 70%), rgba(22,22,26,0.6)';
        });
        card.addEventListener('mouseleave', function () {
          card.style.backgroundImage = '';
        });
      });

    /* 6c. Custom cursor (solo dispositivi con puntatore preciso) */
    if (window.matchMedia('(pointer: fine)').matches) {
      var dot  = document.createElement('div');
      var ring = document.createElement('div');
      dot.id   = 'cursor-dot';
      ring.id  = 'cursor-ring';
      document.body.appendChild(dot);
      document.body.appendChild(ring);
      var mx = -100, my = -100, rx = -100, ry = -100;
      document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
      (function animateCursor() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        dot.style.transform  = 'translate(' + mx + 'px,' + my + 'px)';
        ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
        requestAnimationFrame(animateCursor);
      })();
      document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .btn-secondary, .project-card, .skill-card')
        .forEach(function (el) {
          el.addEventListener('mouseenter', function () { ring.classList.add('cursor-hover'); });
          el.addEventListener('mouseleave', function () { ring.classList.remove('cursor-hover'); });
        });
    }

    /* 6d. Hero title glitch (one-shot) */
    var heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
      heroTitle.classList.add('glitch-once');
      setTimeout(function () { heroTitle.classList.remove('glitch-once'); }, 800);
    }

    /* 6e. Floating tech labels (background) */
    var iconContainer = document.createElement('div');
    iconContainer.id = 'floating-icons';
    Object.assign(iconContainer.style, {
      position: 'fixed', top: '0', left: '0',
      width: '100%', height: '100%',
      zIndex: '-999', pointerEvents: 'none', overflow: 'hidden'
    });
    document.body.appendChild(iconContainer);
    var labels  = ['[SQL]', '{JSON}', '', '0101', '[HL7]', 'SELECT *', 'git push', 'kubectl'];
    var lColors = ['#3b82f6', '#f97316', '#94a3b8'];
    for (var j = 0; j < 12; j++) {
      (function (idx) {
        var lbl = document.createElement('div');
        lbl.textContent = labels[idx % labels.length];
        Object.assign(lbl.style, {
          position:   'absolute',
          color:      lColors[idx % lColors.length],
          fontSize:   (Math.random() * 12 + 9) + 'px',
          fontFamily: 'JetBrains Mono, monospace',
          opacity:    '0.04',
          left:       Math.random() * 95 + '%',
          top:        Math.random() * 95 + '%',
          userSelect: 'none'
        });
        iconContainer.appendChild(lbl);
        var px = parseFloat(lbl.style.left);
        var py = parseFloat(lbl.style.top);
        var vx = (Math.random() - 0.5) * 0.015;
        var vy = (Math.random() - 0.5) * 0.015;
        (function tick() {
          px += vx; py += vy;
          if (px < 0 || px > 95) vx *= -1;
          if (py < 0 || py > 95) vy *= -1;
          lbl.style.left = px + '%';
          lbl.style.top  = py + '%';
          requestAnimationFrame(tick);
        })();
      })(j);
    }
  }

  /* ================================================================
   * 7. HOME INTERACTIONS (ex homeInteractions.js)
   *    Terminal typing + reveal — attivo solo su pagine con .hero-terminal
   * ================================================================ */
  function initHomeInteractions() {
    /* Terminal typing simulation */
    var lines = document.querySelectorAll('.hero-terminal .t-line, .hero-terminal .t-output');
    if (lines.length) {
      lines.forEach(function (line, i) {
        line.style.opacity    = '0';
        line.style.transform  = 'translateX(-10px)';
        line.style.transition = 'all 0.4s ease';
        setTimeout(function () {
          line.style.opacity   = '1';
          line.style.transform = 'translateX(0)';
        }, 500 + i * 200);
      });
    }
  }

  /* ================================================================
   * 8. GALLERY / SLIDESHOW (ex gallery.js)
   *    Attivo solo su elementi con [data-slideshow]
   * ================================================================ */
  function initGallery() {
    function shuffleArray(arr) {
      for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
      }
      return arr;
    }

    document.querySelectorAll('[data-slideshow]').forEach(function (wrapper) {
      var slideshow = wrapper.querySelector('.slideshow');
      if (!slideshow) return;
      var rawImages = wrapper.getAttribute('data-slideshow') || '';
      var imageList = rawImages.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!imageList.length) return;
      var shouldShuffle = wrapper.getAttribute('data-shuffle') !== 'false';
      var delay   = Number(wrapper.getAttribute('data-interval')) || 5000;
      var altText = wrapper.getAttribute('data-alt') || 'Photo';
      var images  = shouldShuffle ? shuffleArray(imageList.slice()) : imageList;
      var current = 0;

      function renderImage() {
        slideshow.innerHTML = '';
        var img = document.createElement('img');
        img.src = images[current];
        img.alt = altText;
        img.classList.add('slideshow-image');
        slideshow.appendChild(img);
      }

      renderImage();
      if (images.length > 1) {
        setInterval(function () {
          current = (current + 1) % images.length;
          renderImage();
        }, delay);
      }
    });
  }

  /* ================================================================
   * BOOTSTRAP — un solo DOMContentLoaded
   * ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    initPageCounter();
    initBgAnimation();
    initParticles();
    initTechAnimations();
    initHomeInteractions();
    initGallery();
  });

})();
