document.addEventListener('DOMContentLoaded', () => {
  const lines = document.querySelectorAll('.hero-terminal code');
  lines.forEach((line, i) => {
    line.style.opacity = '0';
    setTimeout(() => line.style.opacity = '1', 400 + i * 300);
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal-on-scroll, .content-panel, .feature-card, .glass-card').forEach(el => {
    observer.observe(el);
  });
});
