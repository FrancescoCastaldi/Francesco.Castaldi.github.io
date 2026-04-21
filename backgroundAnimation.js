/** FUTURISTIC DATA STREAM 2026 **/
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height, columns;
  const fontSize = 16;
  const chars = '01';
  let drops = [];

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = Array(columns).fill(1);
  }

  function draw() {
    ctx.fillStyle = 'rgba(3, 3, 4, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00f2ff';
    ctx.font = `${fontSize}px JetBrains Mono`;

    for (let i = 0; i < drops.length; i++) {
      const text = chars.charAt(Math.floor(Math.random() * chars.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  window.addEventListener('resize', init);
  init();
  setInterval(draw, 50);
}
