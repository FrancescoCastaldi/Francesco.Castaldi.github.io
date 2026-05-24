/**
 * main.js — SUPER TECH MINIMAL 2026
 * Ingegnere informatico ciclistico — versione futuristico essenziale
 */
(function () {
  'use strict';

  /* ================================================================
   * 1. SITE CONFIG
   * ================================================================ */
  var SITE_CONFIG = {
    siteName: 'CYCLOTECH.SYS',
    copyrightYear: new Date().getFullYear(),
    navigation: [
      { name: '// HOME', href: 'index.html' },
      {
        name: '// UNIVERSITY',
        href: '#',
        dropdown: [
          { name: 'BIKE-TRACKER',      href: 'bike-maintenance.html' },
          { name: 'HOSPITAL-SYSTEM',   href: 'hospital-sanitization-tracker.html' },
          { name: 'GPX-EDITOR',        href: 'gpx-editor.html' }
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
      {
        name: '// BLOG',
        href: '#',
        dropdown: [
          { name: '8H',      href: 'allenamento-ciclismo-8-ore.html' }
        ]
      },
      { name: '// NEWSLETTER', href: 'newsletter.html' },
      { name: '// CONTACT', href: 'contact.html' }
    ]
  };

  /* ================================================================
   * 2. UTILITIES (throttle, debounce, prefers-reduced-motion)
   * ================================================================ */
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function throttle(fn, delay) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= delay) {
        fn.apply(this, arguments);
        last = now;
      }
    };
  }

  function debounce(fn, delay) {
    var timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn.bind(this), delay);
    };
  }

  /* ================================================================
   * 3. HEADER & FOOTER (identico ma più pulito)
   * ================================================================ */
  function buildNavHTML() {
    return SITE_CONFIG.navigation.map(function (item) {
      if (item.dropdown && item.dropdown.length) {
        var subs = item.dropdown.map(function (sub) {
          return '<a href="' + sub.href + '">' + sub.name + '</a>';
        }).join('');
        return '<li class="dropdown"><a href="' + item.href +
               '" class="dropbtn" role="button">' +
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
    nav.querySelectorAll('.dropdown').forEach(function (dd) {
      var trigger = dd.querySelector('.dropbtn');
      if (trigger) trigger.addEventListener('click', function (e) { e.preventDefault(); });
    });
  }

  function injectFooter() {
    document.querySelectorAll('footer, #site-footer').forEach(function (footer) {
      footer.classList.add('footer');
      footer.innerHTML =
        '<div><a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:none;letter-spacing:0.05em;">&#x1F517; LINKEDIN // CONNECT</a></div>' +
        '<div>⚡ SYS.READY // CYCLING MODE</div>' +
        '<div>&copy; ' + SITE_CONFIG.copyrightYear + ' ' + SITE_CONFIG.siteName + ' // PORT 2026</div>' +
        '<div>Page Views: <span id="visit-count"></span></div>';
    });
  }

  /* ================================================================
   * 4. PAGE VISIT COUNTER
   * ================================================================ */
  function initPageCounter() {
    var KEY = 'site_total_views';
    var count = Number(localStorage.getItem(KEY) || 0) + 1;
    localStorage.setItem(KEY, count);
    var el = document.getElementById('visit-count');
    if (el) el.textContent = count;
  }

  /* ================================================================
   * 5. BACKGROUND: MATRIX (parallax leggero)
   * ================================================================ */
  function initBgAnimation() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var width, height, columns, drops;
    var fontSize = 18;
    var chars = '01';
    var opacity = 0.03;
    var scrollOffset = 0;

    function init() {
      width   = canvas.width  = window.innerWidth;
      height  = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops   = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(3, 3, 4, ' + opacity + ')';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#2a9d8f';
      ctx.font = fontSize + 'px "JetBrains Mono", monospace';
      for (var i = 0; i < drops.length; i++) {
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        var y = drops[i] * fontSize + (scrollOffset * 0.1);
        ctx.fillText(text, i * fontSize, y % height);
        if (y > height && Math.random() > 0.98) drops[i] = 0;
        drops[i] += 0.7;
      }
    }

    window.addEventListener('resize', throttle(init, 100));
    window.addEventListener('scroll', throttle(function () {
      scrollOffset = window.scrollY;
    }, 50));
    init();
    setInterval(draw, 80);
  }

  /* ================================================================
   * 6. PARTICLES (solo se nessun canvas matrix)
   * ================================================================ */
  function initParticles() {
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
    window.addEventListener('resize', throttle(resize, 100));

    for (var i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: '#3b82f6'
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
        ctx2.fillStyle = p.color + '33';
        ctx2.fill();
      });
      requestAnimationFrame(animate);
    })();
  }

  /* ================================================================
   * 7. MAGNETIC BUTTONS & GLITCH HOVER
   * ================================================================ */
  function initMagneticButtons() {
    var buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-ghost, .project-card, .skill-card');
    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        if (reduceMotion) return;
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var maxMove = 8;
        var moveX = x * 0.05;
        var moveY = y * 0.05;
        moveX = Math.min(maxMove, Math.max(-maxMove, moveX));
        moveY = Math.min(maxMove, Math.max(-maxMove, moveY));
        btn.style.transform = 'translate(' + moveX + 'px, ' + moveY + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = '';
      });
    });
  }

  function initGlitchHover() {
    var items = document.querySelectorAll('.project-card, .skill-card, .btn-primary');
    items.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        if (reduceMotion) return;
        el.classList.add('glitch-effect');
        setTimeout(function () { el.classList.remove('glitch-effect'); }, 200);
      });
    });
  }

  /* ================================================================
   * 8. SMOOTH SCROLL (custom easing)
   * ================================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ================================================================
   * 9. PRELOADER MINIMALE (scompare dopo load)
   * ================================================================ */
  function initPreloader() {
    var preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = '<div class="preloader-dot"></div><div class="preloader-dot"></div><div class="preloader-dot"></div>';
    preloader.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:#0a0a0c; display:flex; justify-content:center; align-items:center; gap:0.5rem; z-index:10000; transition:opacity 0.5s;';
    document.body.appendChild(preloader);
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.style.opacity = '0';
        setTimeout(function () { preloader.remove(); }, 500);
      }, 300);
    });
  }

  /* ================================================================
   * 10. TECH ANIMATIONS — reveal + performance
   * ================================================================ */
  function initTechAnimations() {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseFloat(el.dataset.delay || 0);
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      'section:not(.hero), .hero-terminal, .glass-card, .skill-card, .project-card, .info-card'
    ).forEach(function (el, i) {
      var stagger = (i % 3) * 80;
      el.dataset.delay = stagger;
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.2, 0.9, 0.4, 1), transform 0.5s ease';
      revealObserver.observe(el);
    });
  }

  /* ================================================================
   * 11. CUSTOM CURSOR (opzionale, ultra minimal)
   * ================================================================ */
  function initCustomCursor() {
    if (window.matchMedia('(pointer: fine)').matches && !document.getElementById('cursor-dot')) {
      var dot = document.createElement('div');
      var ring = document.createElement('div');
      dot.id = 'cursor-dot';
      ring.id = 'cursor-ring';
      document.body.appendChild(dot);
      document.body.appendChild(ring);
      var mx = -100, my = -100, rx = -100, ry = -100;
      document.addEventListener('mousemove', throttle(function (e) { mx = e.clientX; my = e.clientY; }, 10));
      (function animate() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        dot.style.transform = 'translate(' + mx + 'px, ' + my + 'px)';
        ring.style.transform = 'translate(' + rx + 'px, ' + ry + 'px)';
        requestAnimationFrame(animate);
      })();
      document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .btn-secondary, .project-card, .skill-card')
        .forEach(function (el) {
          el.addEventListener('mouseenter', function () { ring.classList.add('cursor-hover'); });
          el.addEventListener('mouseleave', function () { ring.classList.remove('cursor-hover'); });
        });
    }
  }

  /* ================================================================
   * 12. HOME INTERACTIONS — terminal typing + comandi finti
   * ================================================================ */
  function initHomeInteractions() {
    var terminalBody = document.querySelector('.hero-terminal .terminal-body');
    if (!terminalBody) return;
    var lines = terminalBody.querySelectorAll('.t-line, .t-output');
    lines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-6px)';
      line.style.transition = 'all 0.3s ease';
      setTimeout(function () {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 300 + i * 150);
    });

    // Terminal interattivo (simula comandi base)
    var inputLine = document.createElement('div');
    inputLine.className = 't-line';
    inputLine.innerHTML = '<span class="t-prompt">$></span> <span class="t-input"></span><span class="cursor-blink">_</span>';
    terminalBody.appendChild(inputLine);
    var inputSpan = inputLine.querySelector('.t-input');
    var commands = ['help', 'skills', 'clear', 'contact'];
    var cmdIndex = 0;

    function typeCommand() {
      if (cmdIndex >= commands.length) return;
      var cmd = commands[cmdIndex];
      var i = 0;
      inputSpan.textContent = '';
      function typeChar() {
        if (i < cmd.length) {
          inputSpan.textContent += cmd[i];
          i++;
          setTimeout(typeChar, 100);
        } else {
          setTimeout(executeCommand, 500);
        }
      }
      typeChar();
    }

    function executeCommand() {
      var cmd = inputSpan.textContent;
      var output = '';
      switch (cmd) {
        case 'help':
          output = 'Comandi disponibili: skills, clear, contact';
          break;
        case 'skills':
          output = 'Clinical IT, Data Science, Cloud Architecture';
          break;
        case 'clear':
          terminalBody.innerHTML = '';
          terminalBody.appendChild(inputLine);
          cmdIndex = commands.length;
          return;
        case 'contact':
          output = 'Email: francesco@castaldi.dev';
          break;
        default:
          output = 'Comando non riconosciuto. Digita help.';
      }
      var outputLine = document.createElement('div');
      outputLine.className = 't-output';
      outputLine.textContent = '> ' + output;
      terminalBody.insertBefore(outputLine, inputLine);
      cmdIndex++;
      inputSpan.textContent = '';
      if (cmdIndex < commands.length) setTimeout(typeCommand, 800);
    }

    setTimeout(typeCommand, 2500);
  }

  /* ================================================================
   * 13. GALLERY / SLIDESHOW (ottimizzato)
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
      var delay = Number(wrapper.getAttribute('data-interval')) || 5000;
      var altText = wrapper.getAttribute('data-alt') || 'Photo';
      var images = shouldShuffle ? shuffleArray(imageList.slice()) : imageList;
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
        setInterval(function () { current = (current + 1) % images.length; renderImage(); }, delay);
      }
    });
  }

  /* ================================================================
   * 14. STRAVA VIDEO LOOP
   * ================================================================ */
  function initStravaLoop() {
    var video = document.getElementById('myVideo');
    if (!video) return;
    var loopCount = 0;
    var maxLoops = 3;
    video.addEventListener('ended', function () { if (++loopCount < maxLoops) video.play(); });
  }

  /* ================================================================
   * BOOTSTRAP
   * ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    initPageCounter();
    //initBgAnimation();
    initParticles();
    initTechAnimations();
    initCustomCursor();
    initMagneticButtons();
    initGlitchHover();
    initSmoothScroll();
    initPreloader();
    initHomeInteractions();
    initGallery();
    initStravaLoop();
  });
})();
