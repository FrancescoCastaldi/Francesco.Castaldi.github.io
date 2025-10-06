document.addEventListener('DOMContentLoaded', () => {
    const navigation = [
        { label: 'Home', href: 'index.html' },
        {
            label: 'University',
            children: [
                { label: 'Bike-Tracker', href: 'bike-maintenance.html' }
            ]
        },
        {
            label: 'Strava',
            children: [
                { label: 'Strava Stats', href: 'strava.html' },
                { label: 'Giant TCR', href: 'giant-tcr.html' },
                { label: 'Maintenance Tips', href: 'giant-tcr-maintenance.html' },
                { label: 'Trek Madone', href: 'trek-madone.html' }
            ]
        },
        { label: 'Contact Me', href: 'contact.html' }
    ];

    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');

    const navElement = document.createElement('nav');
    navElement.setAttribute('aria-label', 'Main navigation');
    const list = document.createElement('ul');
    navElement.appendChild(list);

    const currentPath = (() => {
        const parts = window.location.pathname.split('/');
        const last = parts.pop() || '';
        return last === '' ? 'index.html' : last;
    })();

    const isActive = (href) => {
        if (!href) {
            return false;
        }
        if (href === 'index.html') {
            return currentPath === 'index.html' || currentPath === '';
        }
        return currentPath === href;
    };

    navigation.forEach((item) => {
        const listItem = document.createElement('li');

        if (item.children && item.children.length > 0) {
            listItem.classList.add('dropdown');

            const trigger = document.createElement('a');
            trigger.href = item.href || '#';
            trigger.classList.add('dropbtn');
            trigger.textContent = item.label;
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.addEventListener('click', (event) => event.preventDefault());
            listItem.appendChild(trigger);

            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown-content');

            item.children.forEach((child) => {
                const childLink = document.createElement('a');
                childLink.href = child.href;
                childLink.textContent = child.label;

                if (isActive(child.href)) {
                    childLink.setAttribute('aria-current', 'page');
                    childLink.classList.add('active-link');
                    listItem.classList.add('active-parent');
                }

                dropdown.appendChild(childLink);
            });

            listItem.appendChild(dropdown);
        } else {
            const link = document.createElement('a');
            link.href = item.href;
            link.textContent = item.label;

            if (isActive(item.href)) {
                link.setAttribute('aria-current', 'page');
                link.classList.add('active-link');
            }

            listItem.appendChild(link);
        }

        list.appendChild(listItem);
    });

    if (header) {
        header.innerHTML = '';
        header.appendChild(navElement);
    } else {
        document.body.prepend(navElement);
    }

    if (footer) {
        const currentYear = new Date().getFullYear();
        footer.classList.add('footer');
        footer.innerHTML = `
            <p>&copy; ${currentYear} Francesco Castaldi</p>
            <p id="visit-count">Page Views: </p>
        `;
    }

    navElement.querySelectorAll('.dropdown').forEach((dropdown) => {
        const trigger = dropdown.querySelector('.dropbtn');
        const menu = dropdown.querySelector('.dropdown-content');

        if (!trigger || !menu) {
            return;
        }

        const openMenu = () => trigger.setAttribute('aria-expanded', 'true');
        const closeMenu = () => trigger.setAttribute('aria-expanded', 'false');

        trigger.addEventListener('focus', openMenu);
        trigger.addEventListener('blur', closeMenu);
        menu.addEventListener('mouseenter', openMenu);
        menu.addEventListener('mouseleave', closeMenu);
    });
});
