/**
 * main.js — Francesco Castaldi Portfolio
 * Navigation, animations, background, interactions
 * Depends on: posts.js (for BLOG_POSTS), enhancements.js, training-generator.js
 */
(function () {
  'use strict';

  // ── SITE CONFIG ──────────────────────────────────────────
  var SITE_CONFIG = {
    siteName: 'FRANCESCO.CASTALDI',
    copyrightYear: new Date().getFullYear(),
    navigation: [
      { name: '// HOME', href: 'index.html' },
      {
        name: '// PROJECTS', href: '#',
        dropdown: [
          { name: 'HOSPITAL-SYSTEM', href: 'pages/projects/hospital-sanitization-tracker.html' },
          { name: 'GPX-EDITOR', href: 'pages/fitness/gpx-editor.html' },
          { name: 'BIKE-TRACKER', href: 'pages/bikes/bike-maintenance.html' },
          { name: 'SIR-MARKOV', href: 'pages/projects/sir-markov-chain.html' },
          { name: 'CI-CERVICAL', href: 'pages/projects/ci-cervical-lbc.html' },
          { name: 'SGF2-AI', href: 'pages/projects/sgf2-ai-project.html' }
        ]
      },
      {
        name: '// FITNESS', href: '#',
        dropdown: [
          { name: 'STRAVA STATS', href: 'pages/fitness/strava.html' },
          { name: 'GIANT TCR', href: 'pages/bikes/giant-tcr.html' },
          { name: 'MAINTENANCE', href: 'pages/bikes/giant-tcr-maintenance.html' },
          { name: 'TREK MADONE', href: 'pages/bikes/trek-madone.html' }
        ]
      },
      {
        name: '// BLOG', href: '#',
        dropdown: [
          { name: 'TUTTI I POST', href: 'pages/blog/index2.html' },
          { name: '8H CICLISMO', href: 'pages/blog/allenamento-ciclismo-8-ore.html' }
        ]
      },
      { name: '// CONTACT', href: 'pages/personal/contact.html' }
    ]
  };

  // ── FLAGS ────────────────────────────────────────────────
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var webpSupport = false;
  (function () {
    var w = document.createElement('canvas');
    if (!!w.getContext && w.getContext('2d')) {
      webpSupport = w.toDataURL('image/webp').indexOf('image/webp') === 5;
    }
  })();

  // ── UTILS ────────────────────────────────────────────────
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

  // ── NAVIGATION ───────────────────────────────────────────
  function buildNavHTML() {
    return SITE_CONFIG.navigation.map(function (item) {
      if (item.dropdown && item.dropdown.length) {
        var subs = item.dropdown.map(function (sub) {
          return '<a href="' + sub.href + '" role="menuitem">' + sub.name + '</a>';
        }).join('');
        return '<li class="dropdown">' +
          '<a href="' + item.href + '" class="dropbtn" role="button" aria-haspopup="true" aria-expanded="false">' +
          item.name + '</a>' +
          '<div class="dropdown-content" role="menu">' + subs + '</div></li>';
      }
      return '<li><a href="' + item.href + '">' + item.name + '</a></li>';
    }).join('');
  }

  function highlightCurrentPage(navEl) {
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
    if (path === '' || path === '/') path = 'index.html';

    var links = navEl.querySelectorAll('a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href === '#') return;
      if (path.endsWith(href) || path === href) {
        link.classList.add('active-link');
      }
    });
  }

  function injectHeader() {
    var header = document.getElementById('site-header');
    if (!header) return;

    var path = window.location.pathname;
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
    if (path === '' || path === '/') path = 'index.html';
    var currentFile = path.split('/').pop() || 'index.html';

    // Check if this page should use the full sidebar layout
    var hasSidebar = true; // All pages get sidebar
    if (currentFile === 'love.html') hasSidebar = false; // Love page is standalone

    if (hasSidebar) {
      // Thin top bar with just brand and hamburger
      header.className = 'sidebar-mode';
      header.style.cssText = 'position:fixed;top:0;width:100%;padding:0.6rem 1rem;background:rgba(8,10,14,0.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid var(--border);z-index:4500;display:flex;align-items:center;justify-content:space-between;';
      header.innerHTML = '<div style="display:flex;align-items:center;gap:0.75rem;"><button id="sidebar-toggle" style="width:32px;height:32px;background:var(--bg-card);border:1px solid var(--border);border-radius:6px;color:var(--text-secondary);font-size:0.9rem;cursor:pointer;align-items:center;justify-content:center;" aria-label="Menu">☰</button><span style="font-size:0.7rem;font-weight:600;color:var(--text);letter-spacing:0.1em;text-transform:uppercase;font-family:var(--font-mono);">FRANCESCO CASTALDI</span></div><span style="font-size:0.65rem;color:var(--text-muted);font-family:var(--font-mono);">' + (currentFile === 'index.html' ? 'HOME' : currentFile.replace('.html','').toUpperCase()) + '</span>';
    } else {
      // Legacy header for love.html
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
        function open() {
          clearTimeout(closeTimeout);
          dd.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
        }
        function close() {
          closeTimeout = setTimeout(function () {
            dd.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          }, 250);
        }

        dd.addEventListener('mouseenter', open);
        dd.addEventListener('mouseleave', close);
        trigger.addEventListener('click', function (e) { if (window.matchMedia('(hover: none)').matches) { e.preventDefault(); dd.classList.contains('open') ? close() : open(); } });

        trigger.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            dd.classList.contains('open') ? close() : open();
          }
          if (e.key === 'Escape') {
            clearTimeout(closeTimeout);
            dd.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          }
        });

        content.querySelectorAll('a').forEach(function (link) {
          link.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
              clearTimeout(closeTimeout);
              dd.classList.remove('open');
              trigger.setAttribute('aria-expanded', 'false');
              trigger.focus();
            }
          });
        });

        document.addEventListener('click', function (e) {
          if (!dd.contains(e.target)) {
            clearTimeout(closeTimeout);
            dd.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
          }
        });
      });
    }

    document.body.classList.toggle('has-sidebar', hasSidebar);
  }

  // ── SIDEBAR ──────────────────────────────────────────────
  var SIDEBAR_ICONS = {
    'Bikes': '🚴', 'Fitness': '📊', 'Projects': '💻',
    'Blog': '📝', 'Personal': '👤'
  };

  function injectSidebar() {
    if (!document.body.classList.contains('has-sidebar')) return;

    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
    var currentFile = path.split('/').pop() || 'index.html';

    var sidebar = document.createElement('div');
    sidebar.id = 'sidebar';

    // Top glow accent bar
    var topGlow = document.createElement('div');
    topGlow.className = 'sidebar-top-glow';
    sidebar.appendChild(topGlow);

    var html = '';

    // Brand
    html += '<div class="sidebar-brand">' +
      '<div class="sidebar-brand-icon">FC</div>' +
      '<div><div class="sidebar-brand-text">Francesco Castaldi</div><div class="sidebar-brand-sub">Computer Engineer</div></div>' +
      '</div>';

    // Home link
    html += '<div class="sidebar-section">' +
      '<a href="index.html" class="sidebar-link' + (currentFile === 'index.html' ? ' active' : '') + '"><span class="sidebar-link-icon">🏠</span> Home</a>' +
      '</div>';

    // Categories from CATEGORIES data
    CATEGORIES.forEach(function (cat) {
      var icon = SIDEBAR_ICONS[cat.name] || '📁';

      html += '<div class="sidebar-section">' +
        '<div class="sidebar-section-title">' + icon + ' ' + cat.name.toUpperCase() + '</div>';

      cat.pages.forEach(function (p) {
        var linkActive = p.file === currentFile;
        // Sub-page links without dedicated icons omit the icon span for cleaner spacing
        html += '<a href="' + cat.base + p.file + '" class="sidebar-link' + (linkActive ? ' active' : '') + '">' + p.name + '</a>';
      });

      html += '</div>';
    });

    // Contact link
    html += '<div class="sidebar-divider"></div>' +
      '<div class="sidebar-section">' +
      '<a href="pages/personal/contact.html" class="sidebar-link' + (currentFile === 'contact.html' ? ' active' : '') + '"><span class="sidebar-link-icon">📬</span> Contatti</a>' +
      '</div>';

    // Status bar at bottom of sidebar
    html += '<div class="status-bar" style="margin-top:auto;">' +
      '<span class="status-bar-item" id="sidebar-clock"><span class="status-bar-dot"></span> --:--:--</span>' +
      '<span class="status-bar-item" style="margin-left:auto;"><span id="sidebar-uptime">0h 0m 0s</span></span>' +
      '</div>';

    // Wrap nav content in scrollable container
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'sidebar-scroll';
    // split html at the status bar
    var statusBarIdx = html.lastIndexOf('<div class="status-bar"');
    var navHtml = html.substring(0, statusBarIdx);
    var statusHtml = html.substring(statusBarIdx);
    scrollDiv.innerHTML = navHtml;

    sidebar.appendChild(scrollDiv);
    // Append status bar separately (outside scroll)
    var statusDiv = document.createElement('div');
    statusDiv.innerHTML = statusHtml;
    sidebar.appendChild(statusDiv.firstChild);

    document.body.appendChild(sidebar);

    // Overlay for mobile
    var overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    // Toggle button functionality
    var toggle = document.getElementById('sidebar-toggle');
    if (toggle) {
      toggle.addEventListener('click', function () {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('open');
      });
      overlay.addEventListener('click', function () {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
      });
    }

    // Highlight current page
    highlightCurrentPage(sidebar);
  }

  function injectFooter() {
    document.querySelectorAll('footer, #site-footer').forEach(function (footer) {
      footer.classList.add('footer');
      footer.innerHTML =
        '<div>' +
        '<a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" ' +
        'rel="noopener noreferrer" style="color:var(--accent-orange);text-decoration:none;letter-spacing:0.05em;">' +
        '&#x1F517; LINKEDIN // CONNECT</a>' +
        '</div>' +
        '<div>' + SITE_CONFIG.siteName + ' // SYSTEM READY</div>' +
        '<div>&copy;' + SITE_CONFIG.copyrightYear + ' ' + SITE_CONFIG.siteName + '</div>' +
        '<div>Page Views: <span id="visit-count"></span></div>';
    });
  }

  function initPageCounter() {
    var KEY = 'site_total_views';
    var count = Number(localStorage.getItem(KEY) || 0) + 1;
    localStorage.setItem(KEY, count);
    var el = document.getElementById('visit-count');
    if (el) el.textContent = count;
  }

  // ── BACKGROUND ANIMATION (Matrix rain) ───────────────────
  function initBgAnimation() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var width, height, columns, drops;
    var fontSize = 18;
    var chars = '01';
    var opacity = 0.03;
    var scrollOffset = 0;
    var intv;

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.floor(width / fontSize);
      drops = Array(columns).fill(1);
    }

    function draw() {
      ctx.fillStyle = 'rgba(3,3,4,' + opacity + ')';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#d97706'; // Dark orange accent
      ctx.font = fontSize + 'px "JetBrains Mono",monospace';
      for (var i = 0; i < drops.length; i++) {
        var text = chars.charAt(Math.floor(Math.random() * chars.length));
        var y = drops[i] * fontSize + (scrollOffset * 0.1);
        ctx.fillText(text, i * fontSize, y % height);
        if (y > height && Math.random() > 0.98) drops[i] = 0;
        drops[i] += 0.7;
      }
    }

    window.addEventListener('resize', throttle(resize, 100));
    window.addEventListener('scroll', throttle(function () { scrollOffset = window.scrollY; }, 50));
    resize();

    var animating = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !animating) {
          animating = true;
          intv = setInterval(draw, 80);
        } else if (!e.isIntersecting && animating) {
          animating = false;
          clearInterval(intv);
        }
      });
    }, { threshold: 0 });
    obs.observe(canvas);
  }

  // ── PARTICLE BACKGROUND (fallback) ───────────────────────
  function initParticles() {
    if (document.getElementById('bg-canvas')) return;
    var cvs = document.createElement('canvas');
    cvs.id = 'particles-js';
    cvs.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;';
    document.body.appendChild(cvs);
    var ctx = cvs.getContext('2d');
    var particles = [];
    var animId;

    function resize() {
      cvs.width = window.innerWidth;
      cvs.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', throttle(resize, 100));

    for (var i = 0; i < 25; i++) {
      particles.push({
        x: Math.random() * cvs.width,
        y: Math.random() * cvs.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: '#3b82f6' // Blue accent
      });
    }

    function animate() {
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      particles.forEach(function (p) {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0 || p.x > cvs.width) p.speedX *= -1;
        if (p.y < 0 || p.y > cvs.height) p.speedY *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '33';
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    }

    var animActive = false;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !animActive) {
          animActive = true;
          animate();
        } else if (!e.isIntersecting && animActive) {
          animActive = false;
          cancelAnimationFrame(animId);
        }
      });
    }, { threshold: 0 });
    obs.observe(cvs);
  }

  // ── INTERACTIONS ─────────────────────────────────────────
  function initMagneticButtons() {
    if (reduceMotion) return;
    var buttons = document.querySelectorAll(
      '.btn-primary,.btn-secondary,.btn-ghost,.project-card,.skill-card,.expertise-card'
    );
    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', throttle(function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        var maxMove = 8;
        var moveX = Math.min(maxMove, Math.max(-maxMove, x * 0.05));
        var moveY = Math.min(maxMove, Math.max(-maxMove, y * 0.05));
        btn.style.transform = 'translate(' + moveX + 'px,' + moveY + 'px)';
      }, 40));
      btn.addEventListener('mouseleave', function () {
        setTimeout(function () { btn.style.transform = ''; }, 50);
      });
    });
  }

  function initGlitchHover() {
    if (reduceMotion) return;
    var items = document.querySelectorAll(
      '.project-card,.skill-card,.expertise-card,.btn-primary'
    );
    items.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        el.classList.add('glitch-effect');
        setTimeout(function () { el.classList.remove('glitch-effect'); }, 200);
      });
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: reduceMotion ? 'auto' : 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  function initPreloader() {
    if (reduceMotion) return;
    var p = document.createElement('div');
    p.id = 'preloader';
    p.innerHTML =
      '<div class="preloader-dot"></div>' +
      '<div class="preloader-dot"></div>' +
      '<div class="preloader-dot"></div>';
    p.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;background:#050508;' +
      'display:flex;justify-content:center;align-items:center;gap:0.5rem;' +
      'z-index:10000;transition:opacity 0.5s;';
    document.body.appendChild(p);
    window.addEventListener('load', function () {
      setTimeout(function () {
        p.style.opacity = '0';
        setTimeout(function () { p.remove(); }, 500);
      }, 200);
    });
  }

  // ── SCROLL ANIMATIONS ────────────────────────────────────
  function initTechAnimations() {
    if (reduceMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseFloat(el.dataset.delay || 0);
        setTimeout(function () {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, delay);
        obs.unobserve(el);
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(
      'section:not(.hero),.hero-terminal,.glass-card,.skill-card,' +
      '.project-card,.info-card,.expertise-card'
    ).forEach(function (el, i) {
      var stagger = (i % 3) * 80;
      el.dataset.delay = stagger;
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity 0.5s cubic-bezier(0.2,0.9,0.4,1),transform 0.5s ease';
      obs.observe(el);
    });
  }

  // ── CUSTOM CURSOR ────────────────────────────────────────
  function initCustomCursor() {
    if (reduceMotion || !window.matchMedia('(pointer:fine)').matches || document.getElementById('cursor-dot')) return;

    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.id = 'cursor-dot';
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    var mx = -100, my = -100, rx = -100, ry = -100;

    document.addEventListener('mousemove', throttle(function (e) {
      mx = e.clientX;
      my = e.clientY;
    }, 16));

    function animate() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform = 'translate(' + mx + 'px,' + my + 'px)';
      ring.style.transform = 'translate(' + rx + 'px,' + ry + 'px)';
      requestAnimationFrame(animate);
    }
    animate();

    var hoverTargets = document.querySelectorAll(
      'a,button,.btn-primary,.btn-ghost,.btn-secondary,.project-card,.skill-card,.expertise-card'
    );
    hoverTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.classList.add('cursor-hover'); });
      el.addEventListener('mouseleave', function () { ring.classList.remove('cursor-hover'); });
    });
  }

  // ── HOME PAGE TERMINAL ───────────────────────────────────
  function initHomeInteractions() {
    var terminalBody = document.querySelector('.hero-terminal .terminal-body');
    if (!terminalBody) return;

    if (reduceMotion) {
      terminalBody.querySelectorAll('.t-line,.t-output').forEach(function (line) {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      });
      return;
    }

    var lines = terminalBody.querySelectorAll('.t-line,.t-output');
    lines.forEach(function (line, i) {
      line.style.opacity = '0';
      line.style.transform = 'translateX(-6px)';
      line.style.transition = 'all 0.3s ease';
      setTimeout(function () {
        line.style.opacity = '1';
        line.style.transform = 'translateX(0)';
      }, 300 + i * 150);
    });

    var inputLine = document.createElement('div');
    inputLine.className = 't-line';
    inputLine.innerHTML =
      '<span class="t-prompt">$></span> ' +
      '<span class="t-input"></span>' +
      '<span class="cursor-blink">_</span>';
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
          output = 'Healthcare IT, Data Science, Business Consulting';
          break;
        case 'clear':
          terminalBody.innerHTML = '';
          terminalBody.appendChild(inputLine);
          cmdIndex = commands.length;
          return;
        case 'contact':
          output = 'Email: info@francescocastaldi.it';
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

  // ── IMAGE GALLERY ────────────────────────────────────────
  function initGallery() {
    document.querySelectorAll('[data-slideshow]').forEach(function (container) {
      var rawImages = container.getAttribute('data-slideshow') || '';
      var imageList = rawImages.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!imageList.length) return;

      var altText = container.getAttribute('data-alt') || 'Gallery';
      var delay = Number(container.getAttribute('data-interval')) || 5000;
      var shuffle = container.getAttribute('data-shuffle') !== 'false';

      // Shuffle if needed
      if (shuffle) {
        for (var si = imageList.length - 1; si > 0; si--) {
          var sj = Math.floor(Math.random() * (si + 1));
          var tmp = imageList[si];
          imageList[si] = imageList[sj];
          imageList[sj] = tmp;
        }
      }

      var total = imageList.length;

      // Remove old .slideshow child if present
      var oldSlide = container.querySelector('.slideshow');
      if (oldSlide) oldSlide.remove();

      // Build frame
      var frame = document.createElement('div');
      frame.className = 'slideshow-frame';
      frame.setAttribute('tabindex', '-1');
      container.appendChild(frame);

      // Create all img elements stacked absolutely
      var imgs = [];
      imageList.forEach(function (src, idx) {
        var img = document.createElement('img');
        img.className = 'slide-img' + (idx === 0 ? ' active' : '');
        var finalSrc = src.trim();
        if (webpSupport) finalSrc = finalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        img.src = finalSrc;
        img.alt = altText + ' ' + (idx + 1);
        img.draggable = false;
        img.loading = 'lazy';
        frame.appendChild(img);
        imgs.push(img);
      });

      if (total < 2) return;

      // ── Controls ─────────────────────────────────────
      var prevBtn = document.createElement('button');
      prevBtn.className = 'slide-btn slide-prev';
      prevBtn.innerHTML = '\u2039';
      prevBtn.setAttribute('aria-label', 'Immagine precedente');
      frame.appendChild(prevBtn);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'slide-btn slide-next';
      nextBtn.innerHTML = '\u203A';
      nextBtn.setAttribute('aria-label', 'Immagine successiva');
      frame.appendChild(nextBtn);

      // ── Dots ──────────────────────────────────────────
      var dotsWrap = document.createElement('div');
      dotsWrap.className = 'slide-dots';
      container.appendChild(dotsWrap);

      var dots = [];
      for (var di = 0; di < total; di++) {
        var dot = document.createElement('button');
        dot.className = 'slide-dot' + (di === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Vai all\'immagine ' + (di + 1));
        dot.dataset.index = di;
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }

      // ── State ─────────────────────────────────────────
      var current = 0;
      var timer = null;
      var isPaused = false;

      function goTo(index) {
        if (index === current) return;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;

        if (reduceMotion) {
          imgs[current].classList.remove('active');
          imgs[index].classList.add('active');
        } else {
          // Preload next image before switching
          var nextImg = new Image();
          var nextSrc = imgs[index].getAttribute('src') || imgs[index].src;
          nextImg.addEventListener('load', function () {
            imgs[current].classList.remove('active');
            imgs[index].classList.add('active');
          });
          nextImg.addEventListener('error', function () {
            imgs[current].classList.remove('active');
            imgs[index].classList.add('active');
          });
          nextImg.src = nextSrc;
        }

        current = index;
        dots.forEach(function (d) { d.classList.remove('active'); });
        dots[current].classList.add('active');
      }

      function next() { goTo(current + 1); }
      function prev() { goTo(current - 1); }

      // ── Event listeners ───────────────────────────────
      prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        prev();
        resetAutoPlay();
      });

      nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        next();
        resetAutoPlay();
      });

      // Keyboard navigation
      frame.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); resetAutoPlay(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); resetAutoPlay(); }
      });

      // Dot clicks
      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var idx = parseInt(this.dataset.index, 10);
          if (!isNaN(idx)) { goTo(idx); resetAutoPlay(); }
        });
      });

      // Touch swipe
      var touchStartX = 0;
      var touchStartY = 0;
      frame.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      frame.addEventListener('touchend', function (e) {
        var dx = touchStartX - e.changedTouches[0].screenX;
        var dy = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx > 0) { next(); resetAutoPlay(); }
          else { prev(); resetAutoPlay(); }
        }
      }, { passive: true });

      // ── Auto-play with pause ──────────────────────────
      function startAutoPlay() {
        stopAutoPlay();
        if (!isPaused && !reduceMotion) {
          timer = setInterval(next, delay);
        }
      }

      function stopAutoPlay() {
        clearInterval(timer);
        timer = null;
      }

      function resetAutoPlay() {
        stopAutoPlay();
        if (!isPaused) startAutoPlay();
      }

      // Pause on hover / focus
      container.addEventListener('mouseenter', function () {
        isPaused = true;
        stopAutoPlay();
        container.classList.add('paused');
      });

      container.addEventListener('mouseleave', function () {
        isPaused = false;
        container.classList.remove('paused');
        startAutoPlay();
      });

      // IntersectionObserver — pause when out of viewport
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            startAutoPlay();
          } else {
            stopAutoPlay();
          }
        });
      }, { threshold: 0.1 });
      obs.observe(container);

      // Start
      startAutoPlay();
    });
  }

  function initProjectSlider() {
    document.querySelectorAll('.project-slider').forEach(function (container) {
      var frame = container.querySelector('.slideshow-frame');
      if (!frame) return;
      var overlays = frame.querySelectorAll(':scope > .project-slide-overlay');
      if (overlays.length < 2) return;

      var total = overlays.length;
      var current = 0;
      var timer = null;
      var isPaused = false;
      var delay = Number(container.getAttribute('data-interval')) || 5000;

      function show(index) {
        if (index === current && current >= 0) return;
        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        overlays.forEach(function (o, i) {
          o.style.display = i === index ? 'flex' : 'none';
          o.style.opacity = i === index ? '1' : '0';
        });
        current = index;
        dots.forEach(function (d) { d.classList.remove('active'); });
        if (dots[current]) dots[current].classList.add('active');
      }

      // Hide all initially, show first
      overlays.forEach(function (o, i) {
        o.style.display = i === 0 ? 'flex' : 'none';
        o.style.opacity = i === 0 ? '1' : '0';
        o.style.transition = 'opacity 0.65s cubic-bezier(0.4,0,0.2,1)';
      });

      // Arrows
      var prevBtn = document.createElement('button');
      prevBtn.className = 'slide-btn slide-prev';
      prevBtn.innerHTML = '\u2039';
      prevBtn.setAttribute('aria-label', 'Progetto precedente');
      frame.appendChild(prevBtn);

      var nextBtn = document.createElement('button');
      nextBtn.className = 'slide-btn slide-next';
      nextBtn.innerHTML = '\u203A';
      nextBtn.setAttribute('aria-label', 'Progetto successivo');
      frame.appendChild(nextBtn);

      // Dots
      var dotsWrap = container.querySelector('.slide-dots');
      if (!dotsWrap) {
        dotsWrap = document.createElement('div');
        dotsWrap.className = 'slide-dots';
        container.appendChild(dotsWrap);
      }
      var dots = [];
      for (var di = 0; di < total; di++) {
        var dot = document.createElement('button');
        dot.className = 'slide-dot' + (di === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Vai al progetto ' + (di + 1));
        dot.dataset.index = di;
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }

      function next() { show(current + 1); resetAutoPlay(); }
      function prev() { show(current - 1); resetAutoPlay(); }

      prevBtn.addEventListener('click', function (e) { e.stopPropagation(); prev(); });
      nextBtn.addEventListener('click', function (e) { e.stopPropagation(); next(); });

      frame.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      });

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          var idx = parseInt(this.dataset.index, 10);
          if (!isNaN(idx)) { show(idx); resetAutoPlay(); }
        });
      });

      // Touch swipe
      var touchStartX = 0, touchStartY = 0;
      frame.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });
      frame.addEventListener('touchend', function (e) {
        var dx = touchStartX - e.changedTouches[0].screenX;
        var dy = touchStartY - e.changedTouches[0].screenY;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          if (dx > 0) next(); else prev();
        }
      }, { passive: true });

      function startAutoPlay() { stopAutoPlay(); if (!isPaused && !reduceMotion) timer = setInterval(next, delay); }
      function stopAutoPlay() { clearInterval(timer); timer = null; }
      function resetAutoPlay() { stopAutoPlay(); if (!isPaused) startAutoPlay(); }

      container.addEventListener('mouseenter', function () { isPaused = true; stopAutoPlay(); });
      container.addEventListener('mouseleave', function () { isPaused = false; startAutoPlay(); });

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) startAutoPlay(); else stopAutoPlay();
        });
      }, { threshold: 0.1 });
      obs.observe(container);

      startAutoPlay();
    });
  }

  function initStravaLoop() {
    var video = document.getElementById('myVideo');
    if (!video) return;
    var loopCount = 0;
    var maxLoops = 3;
    video.addEventListener('ended', function () {
      if (++loopCount < maxLoops) video.play();
    });
  }

  // ── BLOG POSTS ───────────────────────────────────────────
  function formatDate(isoDate) {
    var d = new Date(isoDate + 'T00:00:00');
    return d.toLocaleDateString('it-IT', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function initBlogPosts() {
    var container = document.getElementById('blog-posts-grid');
    if (!container) return;

    if (typeof BLOG_POSTS === 'undefined' || !BLOG_POSTS.length) {
      BLOG_POSTS = [{
        title: 'Allenamento in bicicletta: 8 ore di resistenza',
        href: 'pages/blog/allenamento-ciclismo-8-ore.html',
        date: '2025-03-15',
        category: 'allenamento',
        tags: ['Ciclismo', 'Resistenza', 'Allenamento'],
        excerpt: 'Come strutturare un\'uscita di 8 ore in sella: alimentazione, idratazione, gestione dello sforzo e recupero.'
      }];
    }

    var category = container.getAttribute('data-category') || null;
    var limit = parseInt(container.getAttribute('data-limit'), 10) || 4;

    var filtered = BLOG_POSTS.filter(function (post) {
      if (!category) return true;
      return post.category === category;
    });

    filtered.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
    var posts = filtered.slice(0, limit);

    var html = posts.map(function (post) {
      var tagsHtml = post.tags.map(function (t) {
        return '<span class="project-tag">' + t + '</span>';
      }).join(' <span style="color:var(--text-muted)">&#x2022;</span> ');

      return '<a href="' + post.href + '" class="project-card">' +
        '<div class="project-header">' +
        '<span class="post-tags">' + tagsHtml + '</span>' +
        '<span class="project-arrow">&#x2192;</span>' +
        '</div>' +
        '<h4>' + post.title + '</h4>' +
        '<p>' + post.excerpt + '</p>' +
        '<time class="post-date" datetime="' + post.date + '">' + formatDate(post.date) + '</time>' +
        '</a>';
    }).join('');

    container.innerHTML = html;
  }

  // ── NAV SLIDER ───────────────────────────────────────────
  var CATEGORIES = [
    {
      name: 'Bikes', icon: '\uD83D\uDEB4', base: 'pages/bikes/',
      pages: [
        { name: 'Giant TCR', file: 'giant-tcr.html' },
        { name: 'Trek Madone', file: 'trek-madone.html' },
        { name: 'Madone Anim.', file: 'trek-madone-animazione.html' },
        { name: 'Manutenzione', file: 'bike-maintenance.html' },
        { name: 'TCR Manut.', file: 'giant-tcr-maintenance.html' }
      ]
    },
    {
      name: 'Fitness', icon: '\uD83D\uDCCA', base: 'pages/fitness/',
      pages: [
        { name: 'Strava Stats', file: 'strava.html' },
        { name: 'GPX Editor', file: 'gpx-editor.html' }
      ]
    },
    {
      name: 'Projects', icon: '\uD83D\uDCBB', base: 'pages/projects/',
      pages: [
        { name: 'Sanitization Tracker', file: 'hospital-sanitization-tracker.html' },
        { name: 'SIR Markov Chain', file: 'sir-markov-chain.html' },
        { name: 'CI Cervical LBC', file: 'ci-cervical-lbc.html' },
        { name: 'SGF2 AI Project', file: 'sgf2-ai-project.html' }
      ]
    },
    {
      name: 'Blog', icon: '\uD83D\uDCDD', base: 'pages/blog/',
      pages: [
        { name: 'Tutti i Post', file: 'index2.html' },
        { name: '8H Ciclismo', file: 'allenamento-ciclismo-8-ore.html' }
      ]
    },
    {
      name: 'Personal', icon: '\uD83D\uDC64', base: 'pages/personal/',
      pages: [
        { name: 'Contattami', file: 'contact.html' }
      ]
    }
  ];

  function injectNavSlider() {
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
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

  // ── DASHBOARD STATS ───────────────────────────────────────
  function initDashboardStats() {
    var hero = document.querySelector('.hero');
    if (!hero) return;

    // Count actual data
    var projectCount = CATEGORIES.filter(function (c) { return c.name === 'Projects'; })[0];
    var projects = projectCount ? projectCount.pages.length : 4;
    var blogCount = typeof BLOG_POSTS !== 'undefined' ? BLOG_POSTS.length : 21;
    var bikeCount = CATEGORIES.filter(function (c) { return c.name === 'Bikes'; })[0];
    var bikes = bikeCount ? bikeCount.pages.length : 5;

    var stats = [
      { value: projects, label: 'Progetti', icon: '💻', color: 'var(--accent-orange)' },
      { value: blogCount + '+', label: 'Articoli', icon: '📝', color: 'var(--accent-blue)' },
      { value: bikes, label: 'Bici', icon: '🚴', color: 'var(--accent-orange)' },
      { value: '100%', label: 'Passione', icon: '🔥', color: 'var(--accent-red-bright)' }
    ];

    var container = document.createElement('div');
    container.className = 'dashboard-stats';
    container.style.cssText = 'display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;max-width:1200px;margin:2rem auto;padding:0 5%;';

    stats.forEach(function (s) {
      var card = document.createElement('div');
      card.style.cssText = 'background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:1.25rem;text-align:center;transition:all 0.3s ease;position:relative;overflow:hidden;';
      card.innerHTML = '<div style="font-size:1.8rem;margin-bottom:0.25rem;">' + s.icon + '</div>' +
        '<div style="font-size:1.8rem;font-weight:700;color:' + s.color + ';font-family:var(--font-mono);">' + s.value + '</div>' +
        '<div style="font-size:0.7rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:0.15rem;">' + s.label + '</div>';
      // Glow effect on hover
      card.addEventListener('mouseenter', function () {
        card.style.borderColor = s.color;
        card.style.transform = 'translateY(-3px)';
        card.style.boxShadow = '0 0 30px ' + s.color.replace(')', ',0.1)');
      });
      card.addEventListener('mouseleave', function () {
        card.style.borderColor = 'var(--border)';
        card.style.transform = '';
        card.style.boxShadow = '';
      });
      container.appendChild(card);
    });

    // Insert after hero
    hero.parentNode.insertBefore(container, hero.nextSibling);
  }

  // ══════════════════════════════════════════════════════════
  //  TECH FEATURES — Finance AI Engineer Applets
  // ══════════════════════════════════════════════════════════

  // 1. Live clock in sidebar
  function initLiveClock() {
    var el = document.getElementById('sidebar-clock');
    if (!el) return;
    function tick() {
      var now = new Date();
      var time = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      var date = now.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' });
      el.innerHTML = '<span class="status-bar-dot"></span> ' + time + ' &middot; ' + date;
    }
    tick();
    setInterval(tick, 1000);
  }

  // 2. Toast notification system
  function showToast(message, type, duration) {
    type = type || 'info';
    duration = duration || 3500;
    var container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    var icons = { info: 'ℹ️', success: '✅', warning: '⚠️', error: '❌' };
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<span class="toast-icon">' + (icons[type] || 'ℹ️') + '</span>' + message;
    container.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, duration);
  }

  // 3. Scroll-to-top FAB
  function initScrollFab() {
    var fab = document.createElement('button');
    fab.className = 'fab';
    fab.innerHTML = '↑';
    fab.setAttribute('aria-label', 'Torna su');
    fab.style.display = 'none';
    document.body.appendChild(fab);

    window.addEventListener('scroll', throttle(function () {
      fab.style.display = window.scrollY > 400 ? 'flex' : 'none';
    }, 100));

    fab.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // 4. Counter-up animation (intersection observer)
  function initCounters() {
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var target = parseInt(el.dataset.count, 10);
      if (isNaN(target)) return;
      var suffix = el.dataset.suffix || '';
      var duration = parseInt(el.dataset.duration, 10) || 1500;
      var start = parseInt(el.dataset.start, 10) || 0;
      var current = start;
      var increment = Math.ceil((target - start) / 30);
      var interval;

      function animate() {
        interval = setInterval(function () {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current + suffix;
        }, duration / 30);
      }

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animate();
            obs.unobserve(el);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  }

  // 5. Breadcrumb generator from URL path
  function initBreadcrumb() {
    var container = document.getElementById('breadcrumb');
    if (!container) return;
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
    var parts = path.replace(/\.html$/, '').split('/').filter(Boolean);
    if (!parts.length) return;

    var labels = {
      'pages': 'Pages', 'bikes': 'Bici', 'blog': 'Blog',
      'fitness': 'Fitness', 'personal': 'Personal', 'projects': 'Progetti',
      'index': 'Home', 'index2': 'Blog', '404': '404'
    };

    var html = '<a href="' + (baseHref || '/') + '">HOME</a>';
    var cum = '';
    parts.forEach(function (part, i) {
      html += '<span class="breadcrumb-sep">›</span>';
      cum += '/' + part;
      var label = labels[part] || part.replace(/-/g, ' ');
      if (i === parts.length - 1) {
        html += '<span class="breadcrumb-current">' + label.toUpperCase() + '</span>';
      } else {
        html += '<a href="' + (baseHref || '') + cum + '.html">' + label.toUpperCase() + '</a>';
      }
    });
    container.innerHTML = html;
  }

  // 6. Typewriter effect for elements with data-typewriter
  function initTypewriter() {
    document.querySelectorAll('[data-typewriter]').forEach(function (el) {
      var text = el.getAttribute('data-typewriter') || el.textContent;
      var speed = parseInt(el.dataset.speed, 10) || 60;
      var delay = parseInt(el.dataset.delay, 10) || 0;
      el.textContent = '';
      el.style.visibility = 'visible';

      setTimeout(function () {
        var i = 0;
        function type() {
          if (i < text.length) {
            el.textContent += text[i];
            i++;
            setTimeout(type, speed);
          }
        }
        type();
      }, delay);
    });
  }

  // 7. Animated skill bars on scroll
  function initSkillBars() {
    document.querySelectorAll('.skill-bar-fill').forEach(function (bar) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            bar.classList.add('animate');
            obs.unobserve(bar);
          }
        });
      }, { threshold: 0.3 });
      obs.observe(bar);
    });
  }

  // 8. Spotlight mouse tracking on .card-spotlight
  function initSpotlight() {
    if (reduceMotion) return;
    document.querySelectorAll('.card-spotlight').forEach(function (card) {
      card.addEventListener('mousemove', throttle(function (e) {
        var rect = card.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      }, 30));
    });
  }

  // 9. Accordion toggle
  function initAccordion() {
    document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        var item = this.closest('.accordion-item');
        if (item) item.classList.toggle('open');
      });
    });
  }

  // 10. Active nav highlighting in sidebar
  function initSidebarActive() {
    var baseEl = document.querySelector('base');
    var baseHref = baseEl ? baseEl.getAttribute('href') : '';
    var path = window.location.pathname;
    if (baseHref && path.startsWith(baseHref)) path = path.slice(baseHref.length);
    var currentFile = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.sidebar-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.endsWith(currentFile)) {
        link.classList.add('active');
      }
    });
  }

  // 11. System uptime display
  function initUptime() {
    var el = document.getElementById('sidebar-uptime');
    if (!el) return;
    var start = Date.now();
    function formatUptime(ms) {
      var h = Math.floor(ms / 3600000);
      var m = Math.floor((ms % 3600000) / 60000);
      var s = Math.floor((ms % 60000) / 1000);
      return h + 'h ' + m + 'm ' + s + 's';
    }
    function tick() {
      el.textContent = formatUptime(Date.now() - start);
    }
    tick();
    setInterval(tick, 1000);
  }

  // 12. Gradient text animation toggle
  function initGradientText() {
    document.querySelectorAll('.text-gradient-animate').forEach(function (el) {
      var deg = 135;
      setInterval(function () {
        deg = (deg + 1) % 360;
        el.style.backgroundImage = 'linear-gradient(' + deg + 'deg, var(--accent-orange), var(--accent-blue))';
      }, 50);
    });
  }

  // 13. Keyboard shortcuts
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', function (e) {
      // Alt+H → Home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        window.location.href = (document.querySelector('base') || {}).href || '/';
      }
      // Alt+B → Blog
      if (e.altKey && e.key === 'b') {
        e.preventDefault();
        window.location.href = 'pages/blog/index2.html';
      }
      // Alt+T → Scroll to top
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 14. Quick page info in console
  function initConsoleGreeting() {
    console.log('%c🧠 Francesco Castaldi — Tech Finance AI Engineer', 'font-size:1.2rem;font-weight:bold');
    console.log('%c🔧 System: Minimal Static Portfolio', 'color:#94a3b8');
    console.log('%c📊 Pages: 38 | Applets: 29+ | Stack: HTML5/CSS3/JS', 'color:#94a3b8');
    console.log('%c🚀 Deploy: GitHub Pages', 'color:#3b82f6');
  }

  // 15. Status bar time
  function initStatusBar() {
    var el = document.getElementById('statusbar-time');
    if (!el) return;
    function tick() {
      var now = new Date();
      el.textContent = now.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
    }
    tick();
    setInterval(tick, 30000);
  }

  // 16. Intersection-based reveal counters
  function initRevealCounters() {
    document.querySelectorAll('.stat-mini-value[data-target]').forEach(function (el) {
      var target = parseInt(el.dataset.target, 10);
      if (isNaN(target)) return;
      var suffix = el.dataset.suffix || '';
      var dur = parseInt(el.dataset.dur, 10) || 1200;

      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var start = 0;
          var step = Math.ceil(target / 30);
          var interval = setInterval(function () {
            start += step;
            if (start >= target) { start = target; clearInterval(interval); }
            el.textContent = start + suffix;
          }, dur / 30);
          obs.unobserve(el);
        });
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  }

  // ══════════════════════════════════════════════════════════
  //  TRUE 3D SCROLL ENGINE — Camera-based 3D Space
  //  Il viewport è una camera che si muove in uno spazio 3D.
  //  Ogni elemento ha una posizione (X, Y, Z) nella scena.
  //  Lo scroll controlla il movimento della camera lungo Z.
  // ══════════════════════════════════════════════════════════

  // ── Utils ─────────────────────────────────────────────
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + (value - inMin) * (outMax - outMin) / (inMax - inMin);
  }

  // ── Scroll State (aggiornato via rAF) ─────────────────
  var scrollState = {
    raw: 0,
    smooth: 0,
    velocity: 0,
    progress: 0,
    prevRaw: 0,
    // Mouse 3D
    mouseX: 0,
    mouseY: 0,
    mouseSmoothX: 0,
    mouseSmoothY: 0
  };

  function initScrollTracker() {
    scrollState.smooth = window.scrollY;

    window.addEventListener('scroll', function () {
      scrollState.raw = window.scrollY;
    }, { passive: true });

    document.addEventListener('mousemove', function (e) {
      scrollState.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
  }

  // ── Central 3D update loop (rAF) ──────────────────────
  var sceneSections = [];
  var sceneCards = [];
  var sceneFloaters = [];
  var sceneBgLayers = [];
  var progressBar = null;
  var glowEl = null;
  var gridStyle = null;

  function init3DCamera() {
    if (reduceMotion) {
      // Fallback: mostra tutto normalmente
      document.querySelectorAll('.bg-layer').forEach(function (el) { el.style.display = 'none'; });
      return;
    }

    // Cache sezioni con depth
    var sections = document.querySelectorAll('.main-content > section, .main-content > .content-panel');
    sections.forEach(function (s) {
      var depthClass = null;
      s.classList.forEach(function (c) {
        if (c.indexOf('depth-') === 0) depthClass = c;
      });
      if (depthClass) {
        sceneSections.push({ el: s, depthClass: depthClass });
      }
    });

    // Cache card
    var cards = document.querySelectorAll('.project-card, .skill-card, .expertise-card, .dashboard-card, .feature-card');
    cards.forEach(function (c) { sceneCards.push(c); });

    // Cache floating elements
    document.querySelectorAll('.floating-3d').forEach(function (f) {
      sceneFloaters.push({
        el: f,
        depth: parseFloat(f.getAttribute('data-depth-3d')) || -50,
        baseX: parseFloat(f.style.left) || 50,
        baseY: parseFloat(f.style.top) || 50
      });
    });

    // Cache bg layers
    document.querySelectorAll('.bg-layer').forEach(function (b) {
      sceneBgLayers.push({
        el: b,
        speed: parseFloat(b.getAttribute('data-speed')) || 0.1
      });
    });

    progressBar = document.querySelector('#scroll-progress .progress-track');
    glowEl = document.getElementById('scroll-glow');

    // Create style for grid parallax
    gridStyle = document.createElement('style');
    gridStyle.id = 'grid-parallax-style';
    document.head.appendChild(gridStyle);

    // Start the 3D loop
    update3DLoop();
  }

  // ── 3D Scene Update (chiamato da rAF) ─────────────────
  function update3DLoop() {
    // Smooth scroll con lerp (follow più fluido)
    scrollState.smooth = lerp(scrollState.smooth, scrollState.raw, 0.08);
    scrollState.velocity = scrollState.raw - scrollState.prevRaw;
    scrollState.prevRaw = scrollState.raw;

    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollState.progress = docHeight > 0 ? clamp(scrollState.raw / docHeight, 0, 1) : 0;

    // Smooth mouse
    scrollState.mouseSmoothX = lerp(scrollState.mouseSmoothX, scrollState.mouseX, 0.06);
    scrollState.mouseSmoothY = lerp(scrollState.mouseSmoothY, scrollState.mouseY, 0.06);

    var scrollY = scrollState.smooth;
    var vh = window.innerHeight;
    var mouseX = scrollState.mouseSmoothX;
    var mouseY = scrollState.mouseSmoothY;

    // ── PROGRESS BAR ──
    if (progressBar) {
      var pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = pct + '%';
    }

    // ── SCROLL GLOW ──
    if (glowEl) {
      var glowY = scrollY + vh * 0.35;
      glowEl.style.transform = 'translate(-50%, ' + glowY + 'px)';
      glowEl.style.opacity = clamp(scrollY / 300, 0, 0.7);
    }

    // ── GRID PARALLAX (body::after) ──
    if (gridStyle) {
      gridStyle.textContent = 'body::after { background-position: ' +
        (scrollY * 0.1) + 'px ' + (scrollY * 0.1) + 'px !important; }';
    }

    // ── BG DEPTH LAYERS ──
    sceneBgLayers.forEach(function (layer) {
      var parallaxY = scrollY * layer.speed;
      layer.el.style.transform = 'translateY(' + parallaxY + 'px)';
    });

    // ── SECTIONS 3D ──
    sceneSections.forEach(function (item) {
      var el = item.el;
      var rect = el.getBoundingClientRect();
      var sectionCenter = rect.top + rect.height / 2;
      var distFromCenter = (sectionCenter - vh / 2) / (vh / 2); // -1 a 1

      // Calcola profondità dalla classe CSS
      var depth = 0;
      if (item.depthClass === 'depth-hero') depth = 60;
      else if (item.depthClass === 'depth-projects') depth = -80;
      else if (item.depthClass === 'depth-blog') depth = -200;
      else if (item.depthClass === 'depth-training') depth = -350;

      // Tilt: rotateX basato sulla distanza dal centro viewport
      // Quando la sezione è al centro -> tilt = 0
      // Quando si allontana -> tilt aumenta
      var tilt = -distFromCenter * 5; // max ±5deg

      // Depth of Field: blur basato sulla distanza dal centro
      var dofBlur = Math.abs(distFromCenter) * 2.5;
      dofBlur = clamp(dofBlur, 0, 3);

      // Opacity: più è lontano dal centro, più è opaco (fade)
      var depthFade = 1 - Math.abs(distFromCenter) * 0.2;
      depthFade = clamp(depthFade, 0.4, 1);

      // Applica transform 3D
      // NOTA: manteniamo la translateZ base + tilt + compensate per perspective
      var scaleComp = 1 + Math.abs(depth) / 3000; // compensa perspective stretch
      var zOffset = depth;

      // Incrementa Z di un piccolo offset basato su mouse per parallax sottile
      var mouseZOffset = mouseY * (depth / 300);

      el.style.transform = 'translateZ(' + (zOffset + mouseZOffset) + 'px) rotateX(' + tilt + 'deg) scale(' + scaleComp + ')';
      el.style.filter = 'blur(' + dofBlur + 'px)';
      el.style.opacity = depthFade;
    });

    // ── 3D CARD TILT ──
    sceneCards.forEach(function (card) {
      var rect = card.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) return;

      var cardCenterY = rect.top + rect.height / 2;
      var cardCenterX = rect.left + rect.width / 2;
      var distY = (cardCenterY - vh / 2) / (vh / 2);
      var distX = (cardCenterX - window.innerWidth / 2) / (window.innerWidth / 2);

      // Tilt combinato: scroll (asse X) + mouse (asse Y)
      var tiltX = clamp(-distY * 5, -7, 7);
      var tiltY = clamp(distX * 3 + mouseX * 2, -5, 5);

      // Leggero translateZ per profondità
      var cardZ = 3 - Math.abs(distY) * 2;

      card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) translateZ(' + cardZ + 'px)';
    });

    // ── FLOATING ELEMENTS ──
    sceneFloaters.forEach(function (f) {
      var depth = f.depth;
      // Più è profondo (negativo), più lento si muove
      var parallaxSpeed = 1 + (depth / 300);
      var moveY = scrollY * parallaxSpeed * 0.03;
      // Leggera parallax X col mouse
      var moveX = mouseX * (depth / 200);
      f.el.style.transform = 'translateY(' + moveY + 'px) translateX(' + moveX + 'px) translateZ(' + depth + 'px)';
    });

    // Next frame
    requestAnimationFrame(update3DLoop);
  }

  // ── DIVIDER REVEAL (IntersectionObserver, non rAF) ────
  function initDividerReveal() {
    if (reduceMotion) return;
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });
    document.querySelectorAll('.section-divider').forEach(function (el) {
      obs.observe(el);
    });
  }

  // ══════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════
  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectSidebar();
    initDashboardStats();
    injectFooter();
    injectNavSlider();
    initPageCounter();
    initBgAnimation();
    initTechAnimations();
    initLiveClock();
    initSidebarActive();
    initUptime();
    initStatusBar();

    if (!reduceMotion) {
      initCustomCursor();
      initMagneticButtons();
      initGlitchHover();
      initPreloader();
      initSpotlight();
      initGradientText();
    }

    initSmoothScroll();
    initHomeInteractions();
    initProjectSlider();
    initGallery();
    initStravaLoop();
    initBlogPosts();
    initBreadcrumb();
    initTypewriter();
    initSkillBars();
    initAccordion();
    initCounters();
    initRevealCounters();
    initScrollFab();
    initKeyboardShortcuts();
    initConsoleGreeting();

    // ── True 3D Camera Engine ──
    initScrollTracker();
    init3DCamera();
    initDividerReveal();
  });

  // Expose toast globally
  window.showToast = showToast;

})();
