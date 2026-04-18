document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. STAGGERED SCROLL REVEAL ── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el    = entry.target;
      const delay = parseFloat(el.dataset.delay || 0);
      setTimeout(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0) scale(1)';
        el.style.clipPath  = 'inset(0% 0% 0% 0%)';
      }, delay);
      revealObserver.unobserve(el);
    });
  }, { threshold: 0.12 });

  const revealTargets = document.querySelectorAll(
    'section:not(.hero), .hero-terminal, .glass-card, .skill-card, .project-card, .info-card'
  );
  revealTargets.forEach((el, i) => {
    const groupSize = 3;
    const stagger   = (i % groupSize) * 120;
    el.dataset.delay       = stagger;
    el.style.opacity       = '0';
    el.style.transform     = 'translateY(32px) scale(0.98)';
    el.style.clipPath      = 'inset(8% 0% 0% 0%)';
    el.style.transition    = 'opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1), clip-path 0.75s cubic-bezier(0.16,1,0.3,1)';
    revealObserver.observe(el);
  });


  /* ── 2. SPOTLIGHT CARD EFFECT ── */
  document.querySelectorAll('.glass-card, .skill-card, .project-card, .info-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', x + 'px');
      card.style.setProperty('--my', y + 'px');
      card.style.backgroundImage =
        `radial-gradient(320px circle at var(--mx) var(--my), rgba(59,130,246,0.07), transparent 70%), rgba(22,22,26,0.6)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.backgroundImage = '';
    });
  });


  /* ── 3. CUSTOM CURSOR ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const dot    = document.createElement('div');
    const ring   = document.createElement('div');
    dot.id  = 'cursor-dot';
    ring.id = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = -100, my = -100, rx = -100, ry = -100;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    (function animateCursor() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      dot.style.transform  = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animateCursor);
    })();

    document.querySelectorAll('a, button, .btn-primary, .btn-ghost, .btn-secondary, .project-card, .skill-card').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });
  }


  /* ── 4. HERO TITLE GLITCH (one-shot on load) ── */
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.classList.add('glitch-once');
    setTimeout(() => heroTitle.classList.remove('glitch-once'), 800);
  }


  /* ── 5. FLOATING TECH LABELS (subtle, background) ── */
  const iconContainer = document.createElement('div');
  iconContainer.id = 'floating-icons';
  Object.assign(iconContainer.style, {
    position: 'fixed', top: '0', left: '0',
    width: '100%', height: '100%',
    zIndex: '-999', pointerEvents: 'none',
    overflow: 'hidden'
  });
  document.body.appendChild(iconContainer);

  const labels = ['[SQL]', '{JSON}', '<FHIR>', '0101', '[HL7]', 'SELECT *', 'git push', 'kubectl'];
  const lColors = ['#3b82f6', '#f97316', '#94a3b8'];
  for (let i = 0; i < 12; i++) {
    const el = document.createElement('div');
    el.textContent = labels[i % labels.length];
    Object.assign(el.style, {
      position: 'absolute',
      color: lColors[i % lColors.length],
      fontSize: (Math.random() * 12 + 9) + 'px',
      fontFamily: 'JetBrains Mono, monospace',
      opacity: '0.04',
      left: Math.random() * 95 + '%',
      top:  Math.random() * 95 + '%',
      userSelect: 'none'
    });
    iconContainer.appendChild(el);
    let px = parseFloat(el.style.left);
    let py = parseFloat(el.style.top);
    let vx = (Math.random() - 0.5) * 0.015;
    let vy = (Math.random() - 0.5) * 0.015;
    (function tick() {
      px += vx; py += vy;
      if (px < 0 || px > 95) vx *= -1;
      if (py < 0 || py > 95) vy *= -1;
      el.style.left = px + '%';
      el.style.top  = py + '%';
      requestAnimationFrame(tick);
    })();
  }
});
