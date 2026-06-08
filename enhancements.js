(function () {
  'use strict';

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
      var ctx = this, args = arguments;
      timer = setTimeout(function () { fn.apply(ctx, args); }, delay);
    };
  }

  function injectCSS(css) {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ══════════════════════════════════════════════════════════
  //  INJECT ALL CSS
  // ══════════════════════════════════════════════════════════
  injectCSS(
    '.enh-back-top{position:fixed;bottom:2rem;right:2rem;width:44px;height:44px;border-radius:50%;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);font-size:1.2rem;cursor:pointer;z-index:9999;display:flex;align-items:center;justify-content:center;opacity:0;transform:translateY(20px);transition:opacity 0.3s,transform 0.3s,border-color 0.25s;pointer-events:none;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}' +
    '.enh-back-top.visible{opacity:1;transform:translateY(0);pointer-events:auto}' +
    '.enh-back-top:hover{border-color:var(--accent);color:var(--accent)}' +
    '.enh-lightbox{position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.88);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.25s;cursor:pointer;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}' +
    '.enh-lightbox.open{opacity:1}' +
    '.enh-lightbox img{max-width:92vw;max-height:92vh;border-radius:8px;box-shadow:0 20px 60px rgba(0,0,0,0.6);transform:scale(0.92);transition:transform 0.3s;cursor:default}' +
    '.enh-lightbox.open img{transform:scale(1)}' +
    '.enh-lightbox-close{position:absolute;top:1.5rem;right:1.5rem;width:40px;height:40px;border-radius:50%;border:none;background:rgba(255,255,255,0.08);color:#fff;font-size:1.4rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s}' +
    '.enh-lightbox-close:hover{background:rgba(255,255,255,0.15)}' +
    '.enh-share-wrap{display:flex;gap:0.75rem;flex-wrap:wrap;margin:2rem 0;padding-top:1.5rem;border-top:1px solid var(--border)}' +
    '.enh-share-btn{display:inline-flex;align-items:center;gap:0.5rem;padding:0.55rem 1.1rem;border-radius:var(--radius-sm);font-size:0.75rem;font-weight:500;border:1px solid var(--border);background:var(--bg-card);color:var(--text-secondary);cursor:pointer;transition:var(--transition-base);text-decoration:none}' +
    '.enh-share-btn:hover{border-color:var(--accent);color:var(--accent)}' +
    '.enh-toc{margin:1.5rem 0;padding:1.25rem;border:1px solid var(--border);border-left:3px solid var(--accent);border-radius:var(--radius-sm);background:var(--bg-card)}' +
    '.enh-toc-title{font-size:0.65rem;font-weight:600;color:var(--accent);text-transform:uppercase;letter-spacing:0.12em;margin-bottom:0.75rem}' +
    '.enh-toc-list{list-style:none;padding:0;margin:0}' +
    '.enh-toc-list li{margin:0.3rem 0}' +
    '.enh-toc-list a{font-size:0.85rem;color:var(--text-secondary);text-decoration:none;transition:color 0.2s;display:block;padding:0.2rem 0}' +
    '.enh-toc-list a:hover{color:var(--accent)}' +
    '.enh-toc-h3{padding-left:1.25rem}' +
    '.enh-toc-h3 a{font-size:0.8rem}' +
    '.enh-toc-current a{color:var(--accent);font-weight:500}' +
    '.enh-code{background:var(--bg);padding:0.2rem 0.5rem;border-radius:4px;font-family:"JetBrains Mono",monospace;font-size:0.825rem;border:1px solid var(--border)}' +
    '.enh-code .kw{color:#c678dd}.enh-code .str{color:#98c379}.enh-code .num{color:#d19a66}.enh-code .cm{color:#5c6370;font-style:italic}.enh-code .fn{color:#61afef}.enh-code .tp{color:#e5c07b}.enh-code .op{color:#abb2bf}.enh-code .com{color:#5c6370}' +
    '.enh-related{margin-top:3rem;padding-top:2rem;border-top:1px solid var(--border)}' +
    '.enh-related-title{font-size:1.1rem;font-weight:600;margin-bottom:1.25rem;color:var(--text)}' +
    '.enh-related-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1rem}' +
    '.enh-related-card{display:block;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);padding:1rem;transition:var(--transition-base);text-decoration:none}' +
    '.enh-related-card:hover{border-color:var(--accent);transform:translateY(-2px)}' +
    '.enh-related-card h5{font-size:0.85rem;color:var(--text);margin-bottom:0.35rem}' +
    '.enh-related-card p{font-size:0.7rem;color:var(--text-muted);margin:0}' +
    '.enh-highlight-box{border-left:3px solid var(--accent);padding:0.75rem 1rem;margin:1.25rem 0;background:var(--bg-card);border-radius:0 var(--radius-sm) var(--radius-sm) 0}'
  );

  // ══════════════════════════════════════════════════════════
  //  1. READING PROGRESS BAR
  // ══════════════════════════════════════════════════════════
  function initProgressBar() {
    var existing = document.querySelector('.progress-bar');
    var fill;
    if (existing) {
      fill = existing.querySelector('.progress-fill');
      if (!fill) {
        fill = document.createElement('div');
        fill.className = 'progress-fill';
        existing.appendChild(fill);
      }
    } else {
      var bar = document.createElement('div');
      bar.className = 'progress-bar';
      fill = document.createElement('div');
      fill.className = 'progress-fill';
      bar.appendChild(fill);
      document.body.insertBefore(bar, document.body.firstChild);
    }
    function update() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      fill.style.width = (docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0) + '%';
    }
    window.addEventListener('scroll', throttle(update, 50));
    window.addEventListener('resize', update);
    update();
  }

  // ══════════════════════════════════════════════════════════
  //  2. BACK-TO-TOP
  // ══════════════════════════════════════════════════════════
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'enh-back-top';
    btn.setAttribute('aria-label', 'Torna su');
    btn.innerHTML = '\u2191';
    document.body.appendChild(btn);
    function toggle() {
      btn.classList.toggle('visible', window.scrollY > 300);
    }
    window.addEventListener('scroll', throttle(toggle, 100));
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
    toggle();
  }

  // ══════════════════════════════════════════════════════════
  //  3. READING TIME
  // ══════════════════════════════════════════════════════════
  function initReadingTime() {
    var content = document.querySelector('.article-content');
    var meta = document.querySelector('.article-meta');
    if (!content || !meta) return;
    var text = content.textContent.trim();
    var words = text ? text.split(/\s+/).length : 0;
    var min = Math.max(1, Math.ceil(words / 200));
    var badge = document.createElement('span');
    badge.textContent = min + ' min di lettura';
    badge.style.cssText = 'color:var(--text-muted);font-size:0.75rem';
    meta.appendChild(badge);
  }

  // ══════════════════════════════════════════════════════════
  //  4. TABLE OF CONTENTS
  // ══════════════════════════════════════════════════════════
  function initTOC() {
    var content = document.querySelector('.article-content');
    if (!content) return;
    var headings = content.querySelectorAll('h2, h3');
    if (headings.length < 2) return;
    var toc = document.createElement('div');
    toc.className = 'enh-toc';
    var title = document.createElement('div');
    title.className = 'enh-toc-title';
    title.textContent = 'Indice dei contenuti';
    toc.appendChild(title);
    var list = document.createElement('ul');
    list.className = 'enh-toc-list';
    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'enh-toc-' + i;
      var li = document.createElement('li');
      if (h.tagName === 'H3') li.className = 'enh-toc-h3';
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(list);
    content.parentNode.insertBefore(toc, content);
    if (!reduceMotion) {
      var links = list.querySelectorAll('a');
      links.forEach(function (a) {
        a.addEventListener('click', function (e) {
          e.preventDefault();
          var target = document.getElementById(this.getAttribute('href').slice(1));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          list.querySelectorAll('a').forEach(function (a) { a.parentNode.classList.remove('enh-toc-current'); });
          var id = entry.target.id;
          var a = list.querySelector('a[href="#' + id + '"]');
          if (a) a.parentNode.classList.add('enh-toc-current');
        });
      }, { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' });
      headings.forEach(function (h) { obs.observe(h); });
    }
  }

  // ══════════════════════════════════════════════════════════
  //  5. IMAGE LIGHTBOX
  // ══════════════════════════════════════════════════════════
  function initLightbox() {
    var containers = document.querySelectorAll('.article-content, .content-panel');
    if (!containers.length) return;
    var imgs = [];
    containers.forEach(function (c) { imgs = imgs.concat(Array.from(c.querySelectorAll('img:not(.slideshow-image):not(.slide-img)'))); });
    if (!imgs.length) return;
    var overlay = document.createElement('div');
    overlay.className = 'enh-lightbox';
    var imgEl = document.createElement('img');
    var closeBtn = document.createElement('button');
    closeBtn.className = 'enh-lightbox-close';
    closeBtn.innerHTML = '\u2715';
    closeBtn.setAttribute('aria-label', 'Chiudi');
    overlay.appendChild(imgEl);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    function open(src) {
      imgEl.src = src;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
    imgs.forEach(function (img) {
      if (img.closest('a')) return;
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () { open(img.src); });
    });
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target === closeBtn) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    });
  }

  // ══════════════════════════════════════════════════════════
  //  6. AUTO-FORMAT CONTENT
  // ══════════════════════════════════════════════════════════
  function initAutoFormat() {
    var content = document.querySelector('.article-content');
    if (!content) return;
    content.querySelectorAll('p:empty').forEach(function (p) { p.remove(); });
    content.querySelectorAll('p + p').forEach(function (p) {
      p.style.marginTop = '0';
    });
    content.querySelectorAll('p').forEach(function (p) {
      if (!p.innerHTML.trim()) p.remove();
    });
    content.querySelectorAll('ul, ol').forEach(function (list) {
      list.style.margin = '1rem 0';
    });
  }

  // ══════════════════════════════════════════════════════════
  //  7. SYNTAX HIGHLIGHTING
  // ══════════════════════════════════════════════════════════
  function initSyntaxHighlight() {
    var codes = document.querySelectorAll('.article-content code, .content-panel code');
    if (!codes.length) return;
    var patterns = {
      kw: /\b(?:function|var|let|const|if|else|return|for|while|do|switch|case|break|continue|new|delete|typeof|instanceof|class|extends|import|export|from|async|await|yield|throw|try|catch|finally|this|super|def|lambda|with|as|pass|raise|import|from|class|def|return|if|elif|else|for|while|break|continue|try|except|finally|in|is|not|and|or|None|True|False|SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|CREATE|TABLE|ALTER|DROP|INDEX|JOIN|LEFT|RIGHT|INNER|OUTER|ON|GROUP|BY|ORDER|HAVING|LIMIT|OFFSET|SET|VALUES|INTO|PRIMARY|KEY|FOREIGN|REFERENCES|CASCADE|UNIQUE|NOT|NULL|DEFAULT|CHECK|CONSTRAINT|int|string|bool|float|void|public|private|protected|static|readonly|enum|interface|type|namespace|module|declare|using|struct)\b/gi,
      str: /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,
      num: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g,
      cm: /\/\/.*$|\/\*[\s\S]*?\*\//gm,
      fn: /\b([a-zA-Z_$][\w$]*)\s*\(/g
    };
    codes.forEach(function (code) {
      if (code.querySelector('span')) return;
      var html = code.textContent;
      var tokens = [];
      var lastIdx = 0;
      var matches = [];
      Object.keys(patterns).forEach(function (type) {
        var p = patterns[type];
        var m;
        while ((m = p.exec(html)) !== null) {
          if (type === 'fn') m = [m[0], m[1]];
          matches.push({ index: m.index, len: m[0].length, text: m[0], type: type });
        }
      });
      matches.sort(function (a, b) { return a.index - b.index || b.len - a.len; });
      matches = matches.filter(function (m, i) {
        for (var j = 0; j < i; j++) {
          if (m.index >= matches[j].index && m.index < matches[j].index + matches[j].len) return false;
        }
        return true;
      });
      var result = '';
      var pos = 0;
      matches.forEach(function (m) {
        if (m.type === 'cm') { result += html.slice(pos, m.index); result += '<span class="cm">' + html.slice(m.index, m.index + m.len) + '</span>'; pos = m.index + m.len; return; }
        result += html.slice(pos, m.index);
        var tag;
        if (m.type === 'kw') tag = 'kw';
        else if (m.type === 'str') tag = 'str';
        else if (m.type === 'num') tag = 'num';
        else if (m.type === 'fn') tag = 'fn';
        else tag = 'kw';
        result += '<span class="' + tag + '">' + m.text + '</span>';
        pos = m.index + m.len;
      });
      result += html.slice(pos);
      if (result !== html) {
        code.className = (code.className || '') + ' enh-code';
        code.innerHTML = result;
      }
    });
  }

  // ══════════════════════════════════════════════════════════
  //  8. SHARE BUTTONS
  // ══════════════════════════════════════════════════════════
  function initShareButtons() {
    var article = document.querySelector('.article-content, .content-panel');
    if (!article) return;
    var shareWrap = document.createElement('div');
    shareWrap.className = 'enh-share-wrap';
    var url = encodeURIComponent(window.location.href);
    var title = encodeURIComponent(document.title);
    if (navigator.share) {
      var nativeBtn = document.createElement('button');
      nativeBtn.className = 'enh-share-btn';
      nativeBtn.textContent = 'Condividi';
      nativeBtn.addEventListener('click', function () {
        navigator.share({ title: document.title, url: window.location.href }).catch(function () {});
      });
      shareWrap.appendChild(nativeBtn);
    }
    var liBtn = document.createElement('a');
    liBtn.className = 'enh-share-btn';
    liBtn.href = 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    liBtn.target = '_blank';
    liBtn.rel = 'noopener';
    liBtn.textContent = 'LinkedIn';
    shareWrap.appendChild(liBtn);
    var container = article.closest('.article-container');
    if (container) {
      container.insertBefore(shareWrap, article.nextSibling);
    } else {
      article.appendChild(shareWrap);
    }
  }

  // ══════════════════════════════════════════════════════════
  //  9. RELATED POSTS
  // ══════════════════════════════════════════════════════════
  function initRelatedPosts() {
    if (document.querySelector('.related-posts')) return;
    var article = document.querySelector('.article-container');
    if (!article) return;
    if (typeof BLOG_POSTS === 'undefined' || !BLOG_POSTS.length) return;
    var currentHref = window.location.pathname.split('/').pop();
    var currentCat = null;
    for (var i = 0; i < BLOG_POSTS.length; i++) {
      var p = BLOG_POSTS[i];
      if (p.href === currentHref || p.href.indexOf(currentHref) !== -1) {
        currentCat = p.category;
        break;
      }
    }
    var candidates = [];
    for (var j = 0; j < BLOG_POSTS.length; j++) {
      var pp = BLOG_POSTS[j];
      if (pp.href.indexOf(currentHref) !== -1) continue;
      if (currentCat && pp.category === currentCat) candidates.push(pp);
    }
    if (!candidates.length) candidates = BLOG_POSTS.slice();
    var shuffled = candidates.sort(function () { return 0.5 - Math.random(); });
    var selected = shuffled.slice(0, 3);
    var wrap = document.createElement('div');
    wrap.className = 'enh-related';
    var title = document.createElement('h3');
    title.className = 'enh-related-title';
    title.textContent = 'Articoli correlati';
    wrap.appendChild(title);
    var grid = document.createElement('div');
    grid.className = 'enh-related-grid';
    selected.forEach(function (post) {
      var card = document.createElement('a');
      card.className = 'enh-related-card';
      card.href = post.href;
      var h5 = document.createElement('h5');
      h5.textContent = post.title;
      card.appendChild(h5);
      if (post.excerpt) {
        var p = document.createElement('p');
        p.textContent = post.excerpt.length > 100 ? post.excerpt.slice(0, 100) + '...' : post.excerpt;
        card.appendChild(p);
      }
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    article.appendChild(wrap);
  }

  // ══════════════════════════════════════════════════════════
  //  INIT
  // ══════════════════════════════════════════════════════════
  function init() {
    initProgressBar();
    initBackToTop();
    initReadingTime();
    initTOC();
    initLightbox();
    initAutoFormat();
    initSyntaxHighlight();
    initShareButtons();
    initRelatedPosts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
