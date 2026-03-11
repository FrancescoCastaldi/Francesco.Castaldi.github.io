// ========================================
// TEMPLATE COMPONENTS SYSTEM
// Automatizza header e footer su tutte le pagine
// ========================================

// Configurazione globale
const SITE_CONFIG = {
    siteName: 'Francesco Castaldi',
    copyrightYear: new Date().getFullYear(),
    navigation: [
        { name: 'HOME', href: 'index.html' },
        { 
            name: 'UNIVERSITY', 
            href: '#',
            dropdown: [
                { name: 'BIKE-TRACKER', href: 'bike-maintenance.html' },
                { name: 'HOSPITAL SANITIZATION TRACKER', href: 'hospital-sanitization-tracker.html' }
            ]
        },
        { name: 'STRAVA', href: 'strava.html' },
        { name: 'CONTACT ME', href: 'contact.html' }
    ]
};

// Template dell'header
function getHeaderHTML() {
    const nav = SITE_CONFIG.navigation.map(item => {
        if (item.dropdown) {
            const dropdownItems = item.dropdown.map(sub => 
                `<a href="${sub.href}">${sub.name}</a>`
            ).join('');
            return `
                <div class="nav-item dropdown">
                    <a href="${item.href}">${item.name}</a>
                    <div class="dropdown-content">
                        ${dropdownItems}
                    </div>
                </div>
            `;
        }
        return `<a href="${item.href}" class="nav-item">${item.name}</a>`;
    }).join('');

    return `
        <nav class="main-nav">
            ${nav}
        </nav>
    `;
}

// Template del footer
function getFooterHTML() {
    return `
        <p>&copy; ${SITE_CONFIG.copyrightYear} ${SITE_CONFIG.siteName}</p>
    `;
}

// Inietta i componenti nel DOM
function injectComponents() {
    // Inietta header
    const headerElement = document.getElementById('site-header');
    if (headerElement) {
        headerElement.innerHTML = getHeaderHTML();
    }

    // Inietta footer se esiste un elemento footer
    const footerElements = document.querySelectorAll('footer');
    footerElements.forEach(footer => {
        if (!footer.innerHTML.trim()) {
            footer.innerHTML = getFooterHTML();
        }
    });

    // Evidenzia la pagina corrente nel menu
    highlightCurrentPage();
}

// Evidenzia la pagina corrente nel menu
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Esegui quando il DOM è pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectComponents);
} else {
    injectComponents();
}

// Esporta per uso eventuale in altri script
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SITE_CONFIG, injectComponents };
}
