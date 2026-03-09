/* 
  Tech Animations: Typewriter & Scroll Reveal
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Typewriter Effect for Hero Subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.innerText;
        subtitle.innerText = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                subtitle.innerText += text.charAt(i);
                i++;
                setTimeout(type, 30);
            }
        }
        
        // Start typewriter after a small delay
        setTimeout(type, 500);
    }

    // 2. Scroll Reveal Animation for Sections
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('section, .hero-terminal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Add a custom class for revealing
    const style = document.createElement('style');
    style.innerHTML = `
        .reveal {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});
