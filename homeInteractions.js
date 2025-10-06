const ready = (callback) => {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
};

ready(() => {
    const typewriterEl = document.querySelector('[data-typewriter]');
    if (typewriterEl) {
        let phrases = [];
        try {
            phrases = JSON.parse(typewriterEl.getAttribute('data-typewriter'));
        } catch (error) {
            phrases = [];
        }

        let typeIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeSpeed = () => (isDeleting ? 45 : 85);
        const pauseBetween = 1600;

        const type = () => {
            if (!phrases.length) return;
            const phrase = phrases[typeIndex % phrases.length];
            typewriterEl.textContent = phrase.slice(0, charIndex);

            if (!isDeleting && charIndex <= phrase.length) {
                charIndex++;
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
            }

            if (!isDeleting && charIndex === phrase.length + 1) {
                isDeleting = true;
                setTimeout(type, pauseBetween);
                return;
            }

            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                typeIndex++;
            }

            setTimeout(type, typeSpeed());
        };

        type();
    }

    const highlightCards = Array.from(document.querySelectorAll('.hero-highlight-card'));
    const progressBar = document.querySelector('.hero-highlight-progress .progress-bar');
    if (highlightCards.length) {
        let activeIndex = highlightCards.findIndex(card => card.classList.contains('is-active'));
        if (activeIndex < 0) activeIndex = 0;
        const progressWidth = 100 / highlightCards.length;
        if (progressBar) {
            progressBar.style.width = `${progressWidth}%`;
        }

        const setActiveHighlight = (index) => {
            highlightCards.forEach(card => card.classList.remove('is-active'));
            const nextCard = highlightCards[index];
            if (nextCard) {
                nextCard.classList.add('is-active');
            }
            activeIndex = index;
            if (progressBar) {
                progressBar.style.transform = `translateX(${progressWidth * index}%)`;
            }
        };

        let rotationTimer = null;
        const startRotation = () => {
            rotationTimer = setInterval(() => {
                const nextIndex = (activeIndex + 1) % highlightCards.length;
                setActiveHighlight(nextIndex);
            }, 5000);
        };

        const stopRotation = () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
                rotationTimer = null;
            }
        };

        highlightCards.forEach((card, index) => {
            card.addEventListener('mouseenter', stopRotation);
            card.addEventListener('focusin', stopRotation);
            card.addEventListener('mouseleave', startRotation);
            card.addEventListener('focusout', startRotation);
            card.addEventListener('click', () => {
                stopRotation();
                setActiveHighlight(index);
                startRotation();
            });
        });

        setActiveHighlight(activeIndex);
        startRotation();
    }

    const terminal = document.querySelector('[data-terminal]');
    if (terminal) {
        const linesAttribute = terminal.getAttribute('data-lines');
        let terminalLines = [];
        try {
            terminalLines = JSON.parse(linesAttribute);
        } catch (error) {
            terminalLines = [];
        }
        const output = terminal.querySelector('.terminal-output');
        let lineIndex = 0;

        const typeLine = () => {
            if (!output || !terminalLines.length) return;
            if (lineIndex >= terminalLines.length) {
                setTimeout(() => {
                    output.textContent = '';
                    lineIndex = 0;
                    typeLine();
                }, 1400);
                return;
            }

            const line = terminalLines[lineIndex];
            let charIndex = 0;
            const lineElement = document.createElement('span');
            lineElement.className = 'terminal-line';
            const typeChar = () => {
                if (charIndex <= line.length) {
                    lineElement.textContent = line.slice(0, charIndex);
                    charIndex++;
                    setTimeout(typeChar, 28);
                } else {
                    output.appendChild(lineElement);
                    output.appendChild(document.createTextNode('\n'));
                    lineIndex++;
                    setTimeout(typeLine, 240);
                }
            };
            output.appendChild(lineElement);
            typeChar();
        };

        typeLine();
    }

    const timelineButtons = document.querySelectorAll('.timeline-item');
    const timelineYear = document.querySelector('.timeline-year');
    const timelineDescription = document.querySelector('.timeline-description');
    if (timelineButtons.length) {
        timelineButtons.forEach((button) => {
            button.addEventListener('click', () => {
                timelineButtons.forEach(btn => btn.classList.remove('is-active'));
                button.classList.add('is-active');
                if (timelineYear) {
                    timelineYear.textContent = button.dataset.year || '';
                }
                if (timelineDescription) {
                    timelineDescription.textContent = button.dataset.description || '';
                }
            });
        });
    }

    const counters = document.querySelectorAll('[data-counter]');
    if (counters.length) {
        const animateCounter = (element) => {
            const target = Number(element.getAttribute('data-counter')) || 0;
            let current = 0;
            const duration = 1400;
            const start = performance.now();

            const update = (timestamp) => {
                const elapsed = timestamp - start;
                const progress = Math.min(elapsed / duration, 1);
                current = Math.floor(progress * target);
                element.textContent = current.toLocaleString();
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    element.textContent = target.toLocaleString();
                }
            };

            requestAnimationFrame(update);
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    const labs = document.querySelectorAll('[data-lab]');
    labs.forEach((lab) => {
        const toggle = lab.querySelector('.lab-toggle');
        const body = lab.querySelector('.lab-body');
        if (!toggle || !body) return;
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            const nextState = !isExpanded;
            toggle.setAttribute('aria-expanded', String(nextState));
            body.hidden = !nextState;
            toggle.textContent = nextState ? 'Collapse' : 'Expand';
        });
    });

    const slideshow = () => {
        const slides = document.getElementsByClassName('mySlides');
        if (!slides.length) return;
        let slideIndex = 1;
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');

        const showSlides = (n) => {
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            Array.from(slides).forEach((slide) => {
                slide.style.display = 'none';
            });
            slides[slideIndex - 1].style.display = 'block';
        };

        const changeSlide = (delta) => {
            showSlides(slideIndex += delta);
        };

        showSlides(slideIndex);
        setInterval(() => changeSlide(1), 7500);

        if (prevButton) {
            prevButton.addEventListener('click', () => changeSlide(-1));
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => changeSlide(1));
        }
    };

    slideshow();
});
