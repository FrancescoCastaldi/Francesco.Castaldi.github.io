document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. Terminal Typing Effect (homepage only)
  // =============================================
  const terminalLines = document.querySelectorAll('.hero-terminal code');
  terminalLines.forEach((line, index) => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
      line.style.opacity = '1';
    }, 300 + index * 350);
  });

  // =============================================
  // 2. Universal Scroll-Reveal Animation
  //    Works on ALL pages, not just homepage
  // =============================================
  const revealSelectors = [
    '.content-panel',
    '.glass-card',
    '.project-card',
    '.info-card',
    '.embed-card',
    '.tech-card',
    '.stat-card',
    '.feature-card',
    '.slideshow-wrapper',
    '.cta-section',
  ];

  const revealElements = document.querySelectorAll(revealSelectors.join(','));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings by index inside their parent
        const siblings = Array.from(
          entry.target.parentElement
            ? entry.target.parentElement.querySelectorAll(revealSelectors.join(','))
            : [entry.target]
        );
        const delay = siblings.indexOf(entry.target) * 80;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(el);
  });

  // Reveal elements already in viewport on load
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, 100);

  // =============================================
  // 3. Subtle 3D Card Hover Tilt
  // =============================================
  const tiltTargets = document.querySelectorAll(
    '.glass-card, .project-card, .info-card, .feature-card, .tech-card'
  );

  tiltTargets.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rx = ((y - cy) / cy) * 4;
      const ry = ((cx - x) / cx) * 4;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px) scale(1.01)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =============================================
  // 4. Photo Lightbox — auto-init on .photo-grid
  // =============================================
  const photoGridImgs = document.querySelectorAll('.photo-grid img, .gallery-grid img');

  if (photoGridImgs.length > 0) {
    // Create lightbox element
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="Full size photo">';
    document.body.appendChild(lb);

    const lbImg = lb.querySelector('img');
    const lbClose = lb.querySelector('.lightbox-close');

    const openLightbox = (src, alt) => {
      lbImg.src = src;
      lbImg.alt = alt || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => { lbImg.src = ''; }, 300);
    };

    photoGridImgs.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openLightbox(img.src, img.alt));
    });

    lbClose.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
    lb.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // =============================================
  // 5. Slideshow images — lightbox on click
  // =============================================
  const initSlideshowLightbox = () => {
    const wrappers = document.querySelectorAll('.slideshow-wrapper');
    wrappers.forEach(wrapper => {
      wrapper.style.cursor = 'pointer';
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('.slideshow-image');
        if (!img) return;
        // Reuse or create lightbox
        let lb = document.querySelector('.lightbox');
        if (!lb) {
          lb = document.createElement('div');
          lb.className = 'lightbox';
          lb.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button><img src="" alt="Photo">';
          document.body.appendChild(lb);
          lb.querySelector('.lightbox-close').addEventListener('click', (e) => {
            e.stopPropagation();
            lb.classList.remove('open');
            document.body.style.overflow = '';
          });
          lb.addEventListener('click', () => {
            lb.classList.remove('open');
            document.body.style.overflow = '';
          });
        }
        const lbImg = lb.querySelector('img');
        lbImg.src = img.src;
        lbImg.alt = img.alt;
        lb.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  };

  // Init immediately and re-check after gallery.js loads images
  initSlideshowLightbox();
  setTimeout(initSlideshowLightbox, 800);

  // =============================================
  // 6. Smooth nav scroll-shadow on scroll
  // =============================================
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
        header.style.background = 'rgba(10, 10, 12, 0.97)';
      } else {
        header.style.boxShadow = '';
        header.style.background = 'rgba(10, 10, 12, 0.9)';
      }
    }, { passive: true });
  }

  // =============================================
  // 7. Active nav link highlight based on page
  // =============================================
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('#site-header nav a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === currentFile || (currentFile === '' && href === 'index.html')) {
      a.classList.add('active-link');
    }
  });

});
