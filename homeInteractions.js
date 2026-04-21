function initHomeInteractions() {
  // Terminal Typing Simulation
  const lines = document.querySelectorAll('.hero-terminal .t-line, .hero-terminal .t-output');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateX(-10px)';
    line.style.transition = 'all 0.4s ease';
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateX(0)';
    }, 500 + i * 200);
  });

  // Reveal Animations
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const targets = document.querySelectorAll('.skill-card, .project-card, .section-title, .hero-title');
  targets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', initHomeInteractions);
