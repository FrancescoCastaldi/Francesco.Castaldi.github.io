document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let mouse = { x: -9999, y: -9999 };
  window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

  const COLORS = ['#3b82f6', '#f97316', '#94a3b8', '#10b981'];
  const COUNT  = 80;
  let particles = [];

  class Particle {
    constructor() { this.reset(true); }
    reset(randomY = false) {
      this.x      = Math.random() * canvas.width;
      this.y      = randomY ? Math.random() * canvas.height : canvas.height + 10;
      this.baseX  = this.x;
      this.baseY  = this.y;
      this.size   = Math.random() * 1.8 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.color  = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.alpha  = Math.random() * 0.45 + 0.08;
      this.parallaxFactor = Math.random() * 0.04 + 0.01;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 180) {
        const force = (180 - dist) / 180;
        this.x -= dx * force * 0.012;
        this.y -= dy * force * 0.012;
      }

      if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(148,163,184,' + (0.07 * (1 - d / 130)) + ')';
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = 1;
          ctx.stroke();
        }
      }
    }
  }

  function drawAurora() {
    const t = Date.now() * 0.0004;
    const cx1 = canvas.width  * (0.3 + Math.sin(t)       * 0.15);
    const cy1 = canvas.height * (0.25 + Math.cos(t * 0.7) * 0.1);
    const cx2 = canvas.width  * (0.7 + Math.cos(t * 0.8) * 0.12);
    const cy2 = canvas.height * (0.6  + Math.sin(t * 0.9) * 0.1);

    const g1 = ctx.createRadialGradient(cx1, cy1, 0, cx1, cy1, canvas.width * 0.45);
    g1.addColorStop(0,   'rgba(59,130,246,0.06)');
    g1.addColorStop(1,   'rgba(59,130,246,0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const g2 = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, canvas.width * 0.38);
    g2.addColorStop(0,   'rgba(249,115,22,0.045)');
    g2.addColorStop(1,   'rgba(249,115,22,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function init() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAurora();
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', init);
  init();
  animate();
});
