/* 
   Tech Animations: Typewriter, Scroll Reveal & Floating Icons
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect for Hero Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
      const lines = ['Ingegnere Informatico & Business Consultant.', 'Trasformo dati in valore per il settore healthcare digitale.'];
      let lineIndex = 0;
      let charIndex = 0;
      subtitle.textContent = '';

      function type() {
        if (lineIndex < lines.length) {
          if (charIndex < lines[lineIndex].length) {
            subtitle.textContent += lines[lineIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 30);
          } else {
            subtitle.textContent += ' ';
            lineIndex++;
            charIndex = 0;
            setTimeout(type, 200);
          }
        }
      }

      setTimeout(type, 500);
    }

    // 2. Scroll Reveal Animation for Sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section:not(.hero), .hero-terminal, .glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });

    // 3. Floating Graphical Elements (Tech Icons)
    const iconContainer = document.createElement('div');
    iconContainer.id = 'floating-icons';
    Object.assign(iconContainer.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: '0.4'
    });
    document.body.appendChild(iconContainer);

    const icons = ['[SQL]', '{JSON}', '<DIV>', '0101', '[DB]', '[CMD]'];
    const colors = ['#3b82f6', '#f97316', '#94a3b8'];

    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.textContent = icons[Math.floor(Math.random() * icons.length)];
        icon.style.position = 'absolute';
        icon.style.color = colors[Math.floor(Math.random() * colors.length)];
        icon.style.fontSize = Math.random() * 20 + 10 + 'px';
        icon.style.fontFamily = 'monospace';
        icon.style.opacity = '0.1';
        icon.style.left = Math.random() * 100 + '%';
        icon.style.top = Math.random() * 100 + '%';
        
        iconContainer.appendChild(icon);

        let posX = parseFloat(icon.style.left);
        let posY = parseFloat(icon.style.top);
        let velX = (Math.random() - 0.5) * 0.02;
        let velY = (Math.random() - 0.5) * 0.02;

        function animateIcon() {
            posX += velX;
            posY += velY;
            if (posX < 0 || posX > 100) velX *= -1;
            if (posY < 0 || posY > 100) velY *= -1;
            icon.style.left = posX + '%';
            icon.style.top = posY + '%';
            requestAnimationFrame(animateIcon);
        }
        animateIcon();
    }
});
