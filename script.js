document.addEventListener('DOMContentLoaded', () => {
    // Load JSON data
    fetch('content.json')
        .then(response => response.json())
        .then(data => {
            populateContent(data);
            initializeEventListeners();
        })
        .catch(error => console.error('Error loading content:', error));
});

function populateContent(data) {
    // Set page title
    document.title = data.siteName;
    document.getElementById('page-title').textContent = data.siteName;

    // Populate header
    const navItems = document.getElementById('nav-items');
    data.header.navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.name;
        li.appendChild(a);
        navItems.appendChild(li);
    });
    document.getElementById('header-cta').textContent = data.header.ctaButton;

    // Populate hero section
    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-description').textContent = data.hero.description;
    document.getElementById('hero-cta').textContent = data.hero.ctaButton;

    // Populate about section
    document.getElementById('about-description').textContent = data.about.description;

    // Populate services section
    document.getElementById('services-title').textContent = data.services.title;
    const servicesGrid = document.getElementById('services-grid');
    data.services.items.forEach(item => {
        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;
        servicesGrid.appendChild(serviceItem);
    });

    // Populate contact section
    document.getElementById('contact-title').textContent = data.contact.title;
    const contactForm = document.getElementById('contact-form');
    contactForm.innerHTML = `
        <input type="text" placeholder="${data.contact.formPlaceholders.name}" required>
        <input type="email" placeholder="${data.contact.formPlaceholders.email}" required>
        <textarea placeholder="${data.contact.formPlaceholders.message}" required></textarea>
        <button type="submit" class="cta-button">${data.contact.submitButton}</button>
    `;

    // Populate footer
    document.getElementById('footer-copyright').textContent = data.footer.copyright;
}

function initializeEventListeners() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 60;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    const animateSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effect to CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.transform = 'scale(1.05)';
            button.style.transition = 'transform 0.3s ease';
        });
        button.addEventListener('mouseout', () => {
            button.style.transform = 'scale(1)';
        });
    });
}