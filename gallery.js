document.addEventListener('DOMContentLoaded', () => {
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const createImageElement = (src, alt) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || '';
        img.classList.add('slideshow-image');
        return img;
    };

    document.querySelectorAll('[data-slideshow]').forEach((wrapper) => {
        const slideshow = wrapper.querySelector('.slideshow');
        if (!slideshow) {
            return;
        }

        const rawImages = wrapper.getAttribute('data-slideshow') || '';
        const imageList = rawImages.split(',').map((item) => item.trim()).filter(Boolean);

        if (imageList.length === 0) {
            return;
        }

        const shouldShuffle = wrapper.getAttribute('data-shuffle') !== 'false';
        const delay = Number(wrapper.getAttribute('data-interval')) || 5000;
        const altText = wrapper.getAttribute('data-alt') || 'Cycling highlight photo';

        const images = shouldShuffle ? shuffleArray([...imageList]) : imageList;
        let currentIndex = 0;

        const renderImage = () => {
            slideshow.innerHTML = '';
            slideshow.appendChild(createImageElement(images[currentIndex], altText));
        };

        renderImage();

        if (images.length > 1) {
            setInterval(() => {
                currentIndex = (currentIndex + 1) % images.length;
                renderImage();
            }, delay);
        }
    });
});
