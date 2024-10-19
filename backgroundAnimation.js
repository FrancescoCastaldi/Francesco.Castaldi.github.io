document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        [30, 60, 114],  // #1e3c72
        [42, 82, 152],  // #2a5298
        [23, 82, 33],   // #175221
        [219, 34, 12],  // #db220c
        [0, 128, 128],  // #008080
        [255, 165, 0],  // #ffa500
        [75, 0, 130],   // #4b0082
        [0, 255, 255]   // #00ffff
    ];
    let step = 0;
    const colorIndices = [0, 1, 2, 3];

    const gradientSpeed = 0.002;

    function updateGradient() {
        const c0_0 = colors[colorIndices[0]];
        const c0_1 = colors[colorIndices[1]];
        const c1_0 = colors[colorIndices[2]];
        const c1_1 = colors[colorIndices[3]];

        const istep = 1 - step;
        const r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
        const g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
        const b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
        const color1 = `rgb(${r1},${g1},${b1})`;

        const r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
        const g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
        const b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
        const color2 = `rgb(${r2},${g2},${b2})`;

        document.body.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;

        step += gradientSpeed;
        if (step >= 1) {
            step %= 1;
            colorIndices[0] = colorIndices[1];
            colorIndices[2] = colorIndices[3];

            colorIndices[1] = (colorIndices[1] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
            colorIndices[3] = (colorIndices[3] + Math.floor(1 + Math.random() * (colors.length - 1))) % colors.length;
        }
    }

    setInterval(updateGradient, 10);

    const dropdown = document.querySelector('.dropdown');
    const dropdownContent = document.querySelector('.dropdown-content');

    dropdown.addEventListener('mouseover', function() {
        dropdownContent.style.display = 'block';
    });

    dropdown.addEventListener('mouseout', function() {
        dropdownContent.style.display = 'none';
    });

    // Slideshow functionality
    let slideIndex = 1;

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }

    window.onload = function() {
        showSlides(slideIndex); // Initialize slideshow
        setInterval(() => plusSlides(1), 15000); // Change slide every 5 seconds
    };
});