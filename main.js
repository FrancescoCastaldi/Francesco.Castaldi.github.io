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
          { name: 'HOSPITAL-SYSTEM', href: 'projects/hospital-sanitization-tracker.html' },
          { name: 'GPX-EDITOR', href: 'fitness/gpx-editor.html' },
          { name: 'BIKE-TRACKER', href: 'bikes/bike-maintenance.html' },
          { name: 'SIR-MARKOV', href: 'projects/sir-markov-chain.html' },
          { name: 'CI-CERVICAL', href: 'projects/ci-cervical-lbc.html' },
          { name: 'SGF2-AI', href: 'projects/sgf2-ai-project.html' }
        ]
      },
      {
        name: '// FITNESS', href: '#',
        dropdown: [
          { name: 'STRAVA STATS', href: 'fitness/strava.html' },
          { name: 'GIANT TCR', href: 'bikes/giant-tcr.html' },
          { name: 'MAINTENANCE', href: 'bikes/giant-tcr-maintenance.html' },
          { name: 'TREK MADONE', href: 'bikes/trek-madone.html' }
        ]
      },
      {
        name: '// BLOG', href: '#',
        dropdown: [
          { name: 'TUTTI I POST', href: 'blog/index2.html' },
          { name: '8H CICLISMO', href: 'blog/allenamento-ciclismo-8-ore.html' }
        ]
      },
      { name: '// CONTACT', href: 'personal/contact.html' }
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

    var nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'Main navigation');
    nav.innerHTML = '<ul class="main-nav">' + buildNavHTML() + '</ul>';
    header.innerHTML = '';
    header.appendChild(nav);
    highlightCurrentPage(nav);

    // Dropdowns
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

  function injectFooter() {
    document.querySelectorAll('footer, #site-footer').forEach(function (footer) {
      footer.classList.add('footer');
      footer.innerHTML =
        '<div>' +
        '<a href="https://www.linkedin.com/in/francescocastaldi" target="_blank" ' +
        'rel="noopener noreferrer" style="color:var(--accent);text-decoration:none;letter-spacing:0.05em;">' +
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
        href: 'blog/allenamento-ciclismo-8-ore.html',
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

  // ── INIT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    injectHeader();
    injectFooter();
    initPageCounter();
    initBgAnimation();
    initTechAnimations();

    if (!reduceMotion) {
      initCustomCursor();
      initMagneticButtons();
      initGlitchHover();
      initPreloader();
    }

    initSmoothScroll();
    initHomeInteractions();
    initProjectSlider();
    initGallery();
    initStravaLoop();
    initBlogPosts();
  });

})();
