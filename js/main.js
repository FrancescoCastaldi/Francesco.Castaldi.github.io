/**
 * main.js — SUPER TECH MINIMAL 2026
 * Ingegnere informatico ciclistico — versione futuristico essenziale
 * [MODIFICA] Dropdown: apertura/ chiusura con hover + delay (no click)
 * [FIX] Blog: post "allenamento-ciclismo-8-ore" sempre visibile e link corretto
 * [FIX] Navigazione: tutti i link assoluti, evidenziazione pagina attiva sistemata
 * [FIX] Link TUTTI I POST ora punta a /blog/index2.html (come da tua struttura)
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
          { name: 'BIKE-TRACKER', href: 'bikes/bike-maintenance.html' },
          { name: 'HOSPITAL-SYSTEM', href: 'projects/hospital-sanitization-tracker.html' },
          { name: 'GPX-EDITOR', href: 'fitness/gpx-editor.html' }
        ]
      },
      {
        name: '// STRAVA',
        href: '#',
        dropdown: [
          { name: 'STRAVA STATS', href: 'fitness/strava.html' },
          { name: 'GIANT TCR', href: 'bikes/giant-tcr.html' },
          { name: 'MAINTENANCE TIPS', href: 'bikes/giant-tcr-maintenance.html' },
          { name: 'TREK MADONE', href: 'bikes/trek-madone.html' }
        ]
      },
      {
        name: '// BLOG',
        href: '#',
        dropdown: [
          { name: 'TUTTI I POST', href: 'blog/index2.html' },
          { name: '8H CICLISMO', href: 'blog/allenamento-ciclismo-8-ore.html' }
        ]
      },
      { name: '// CONTACT', href: 'personal/contact.html' }
    ]
  };

  /* ================================================================
   * 2. UTILITIES
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
   * 3. HEADER & FOOTER
   * ================================================================ */
  function buildNavHTML() {
    return SITE_CONFIG.navigation.map(function (item) {
      if (item.dropdown && item.dropdown.length) {
        var subs = item.dropdown.map(function (sub) {
          return '<a href="' + sub.href + '">' + sub.name + '</a>'; }).join('');
        return '<li class="dropdown"><a href="' + item.href + '" class="dropbtn" role="button" aria-haspopup="true" aria-expanded="false">' + item.name + '</a><div class="dropdown-content" role="menu">' + subs + '</div></li>';
      }
      return '<li><a href="' + item.href + '">' + item.name + '</a></li>';
    }).join('');
  }

  function highlightCurrentPage(navEl) {
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) {
      path = path.slice(baseHref.length);
    }
    if (path === '' || path === '/') path = 'index.html';
    var segments = path.split('/').filter(Boolean);
    var currentFile = segments.pop() || 'index.html';
    var currentDir = segments.join('/');
    navEl.querySelectorAll('a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      var hrefSegments = href.split('/').filter(Boolean);
      var hrefFile = hrefSegments.pop() || '';
      var hrefDir = hrefSegments.join('/');
      var isActive = (hrefFile === currentFile && hrefDir === currentDir) || (hrefFile === 'index.html' && currentDir === '' && (currentFile === 'index.html' || currentFile === ''));
      if (isActive) {
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
      var content = dd.querySelector('.dropdown-content');
      if (!trigger || !content) return;
      var closeTimeout;
      function openDropdown() {
        clearTimeout(closeTimeout);
        dd.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
      function scheduleClose() {
        closeTimeout = setTimeout(function () { dd.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }, 250);
      }
      dd.addEventListener('mouseenter', openDropdown);
      dd.addEventListener('mouseleave', scheduleClose);
      trigger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dd.classList.contains('open') ? dd.classList.remove('open') : openDropdown(); }
        if (e.key === 'Escape') { clearTimeout(closeTimeout); dd.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }
      });
      document.addEventListener('click', function (e) { if (!dd.contains(e.target)) { clearTimeout(closeTimeout); dd.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); } });
    });
  }

  function injectFooter() {
    document.querySelectorAll('footer, #site-footer').forEach(function (footer) {
      footer.classList.add('footer');
      footer.innerHTML = '<div><a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" rel="noopener noreferrer" style="color:var(--accent);text-decoration:none;letter-spacing:0.05em;">&#x1F517; LINKEDIN // CONNECT</a></div><div>⚡ SYS.READY // CYCLING MODE</div><div>&copy; ' + SITE_CONFIG.copyrightYear + ' ' + SITE_CONFIG.siteName + ' // PORT 2026</div><div>Page Views: <span id="visit-count"></span></div>';
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
   * 5. BLOG POSTS – minimal version (fallback if BLOG_POSTS missing)
   * ================================================================ */
  function formatDate(isoDate) {
    var d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  function initBlogPosts() {
    var container = document.getElementById('blog-posts-grid');
    if (!container) return;
    if (typeof BLOG_POSTS === 'undefined' || !BLOG_POSTS.length) {
      BLOG_POSTS = [{ title: 'Allenamento in bicicletta: 8 ore di resistenza', href: 'blog/allenamento-ciclismo-8-ore.html', date: '2025-03-15', category: 'allenamento', tags: ['Ciclismo','Resistenza','Allenamento'], excerpt: 'Come strutturare un’uscita di 8 ore in sella...' }];
    }
    var category = container.getAttribute('data-category') || null;
    var limit = parseInt(container.getAttribute('data-limit'), 10) || 4;
    var filtered = BLOG_POSTS.filter(function (post) { return !category || post.category === category; });
    filtered.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var posts = filtered.slice(0, limit);
    container.innerHTML = posts.map(function (post) {
      var tagsHtml = post.tags.map(function (t) { return '<span class="project-tag">' + t + '</span>'; }).join(' <span style="color:var(--text-muted)">&#x2022;</span> ');
      return '<a href="' + post.href + '" class="project-card"><div class="project-header"><span class="post-tags">' + tagsHtml + '</span><span class="project-arrow">&#x2192;</span></div><h4>' + post.title + '</h4><p>' + post.excerpt + '</p><time class="post-date" datetime="' + post.date + '">' + formatDate(post.date) + '</time></a>';
    }).join('');
  }

  /* ================================================================
   * NAV SLIDER
   * ================================================================ */
  var CATEGORIES = [
    { name: 'Bikes', icon: '🚴', base: 'bikes/', pages: [
      { name: 'Giant TCR', file: 'giant-tcr.html' },
      { name: 'Trek Madone', file: 'trek-madone.html' },
      { name: 'Madone Anim.', file: 'trek-madone-animazione.html' },
      { name: 'Manutenzione', file: 'bike-maintenance.html' },
      { name: 'TCR Manut.', file: 'giant-tcr-maintenance.html' },
    ]},
    { name: 'Fitness', icon: '📊', base: 'fitness/', pages: [
      { name: 'Strava Stats', file: 'strava.html' },
      { name: 'GPX Editor', file: 'gpx-editor.html' },
    ]},
    { name: 'Projects', icon: '💻', base: 'projects/', pages: [
      { name: 'Sanitization Tracker', file: 'hospital-sanitization-tracker.html' },
    ]},
    { name: 'Blog', icon: '📝', base: 'blog/', pages: [
      { name: 'Tutti i Post', file: 'index2.html' },
      { name: 'Sport', file: 'sport.html' },
    ]},
    { name: 'Personal', icon: '👤', base: 'personal/', pages: [
      { name: 'Contattami', file: 'contact.html' },
    ]},
  ];

  function injectNavSlider() {
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) {
      path = path.slice(baseHref.length);
    }
    var currentFile = path.split('/').pop() || 'index.html';
    var slider = document.createElement('section');
    slider.className = 'nav-slider';
    slider.innerHTML = '<div class="nav-slider-inner">' +
      CATEGORIES.map(function (cat) {
        var isActive = currentFile && cat.pages.some(function (p) { return p.file === currentFile; });
        return '<div class="nav-slider-item' + (isActive ? ' active' : '') + '">' +
          '<h4>' + cat.icon + ' ' + cat.name + '</h4>' +
          '<div class="nav-slider-links">' +
          cat.pages.map(function (p) {
            return '<a href="' + cat.base + p.file + '">' + p.name + '</a>';
          }).join('') +
          '</div></div>';
      }).join('') +
      '</div>';
    var footer = document.querySelector('footer, #site-footer, .footer');
    if (footer) {
      footer.parentNode.insertBefore(slider, footer);
    } else {
      document.body.appendChild(slider);
    }
  }

  /* ================================================================
   * BOOTSTRAP
   * ================================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    injectNavSlider();
    initPageCounter();
    initBlogPosts();
  });
})();