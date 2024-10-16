document.addEventListener('DOMContentLoaded', function() {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
        menuElement.style.display = 'block';
    } else {
        console.error('Menu element not found');
    }
});