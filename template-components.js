const SITE_CONFIG = {
  siteName: 'CASTALDI.SYS',
  copyrightYear: new Date().getFullYear(),
  navigation: [
    { name: '// HOME', href: 'index.html' },
    { name: '// UNIVERSITY', href: '#', dropdown: [
      { name: 'BIKE-TRACKER', href: 'bike-maintenance.html' },
      { name: 'HOSPITAL-SYSTEM', href: 'hospital-sanitization-tracker.html' }
    ]},
    { name: '// STRAVA', href: 'strava.html' },
    { name: '// CONTACT', href: 'contact.html' }
  ]
};

function getHeaderHTML() {
  const nav = SITE_CONFIG.navigation.map(item => {
    if (item.dropdown) {
      const dropdownItems = item.dropdown.map(sub => `<a href="${sub.href}">[ ${sub.name} ]</a>`).join('');
      return `<li class="dropdown"><a href="${item.href}">${item.name}</a><div class="dropdown-content">${dropdownItems}</div></li>`;
    }
    return `<li><a href="${item.href}">${item.name}</a></li>`;
  }).join('');
  return `<nav class="main-nav"><ul>${nav}</ul></nav>`;
}

function getFooterHTML() {
  return `<div>SYSTEM.STATUS: OPERATIONAL</div><div>© ${SITE_CONFIG.copyrightYear} ${SITE_CONFIG.siteName} // PORT 2026</div>`;
}

function injectComponents() {
  const headerElement = document.getElementById('site-header');
  if (headerElement) headerElement.innerHTML = getHeaderHTML();

  const footerElements = document.querySelectorAll('footer, #site-footer');
  footerElements.forEach(footer => { footer.innerHTML = getFooterHTML(); });

  highlightCurrentPage();
}

function highlightCurrentPage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });
}

document.addEventListener('DOMContentLoaded', injectComponents);
