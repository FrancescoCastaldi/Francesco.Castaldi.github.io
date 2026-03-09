function initHomeInteractions() {
  // Terminal typing effect (Home Page)
  const lines = document.querySelectorAll('.hero-terminal code');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => line.style.opacity = '1', 400 + i * 300);
  });

  // Intersection Observer for reveal animations (All Pages)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.reveal-on-scroll, .content-panel, .feature-card, .glass-card, .page-hero');
  targets.forEach(el => observer.observe(el));
}

// Ensure execution even if injected after DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomeInteractions);
} else {
  initHomeInteractions();
}
