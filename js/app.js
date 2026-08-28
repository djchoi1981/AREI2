document.addEventListener('DOMContentLoaded', () => {
    // 1. Load Data from data.js
    const savedData = localStorage.getItem('siteData');
    if (savedData) {
        try {
            window.siteData = JSON.parse(savedData);
        } catch (e) {
            console.error('Failed to parse saved siteData', e);
        }
    }
    if (window.siteData && window.siteData.styles) {
        if (window.siteData.styles.navbarBg) {
            document.documentElement.style.setProperty('--glass-bg', window.siteData.styles.navbarBg);
        }
        if (window.siteData.styles.footerBg) {
            const footer = document.querySelector('.footer');
            if (footer) footer.style.background = window.siteData.styles.footerBg;
        }
        if (window.siteData.styles.heroImage) {
            const hero = document.querySelector('.hero');
            if (hero) hero.style.backgroundImage = `url('${window.siteData.styles.heroImage}')`;
        }
    }
    
    loadSiteData();
    
    // 2. Initialize UI Interactions
    initNavbar();
    initScrollAnimations();
});

function loadSiteData() {
    if (typeof siteData === 'undefined') {
        console.error("data.js is not loaded properly.");
        return;
    }

    // Header / Nav
    if (siteData.header.logoImage && siteData.header.logoImage !== "") {
        const logoImg = document.getElementById('logo-img');
        logoImg.src = siteData.header.logoImage;
        logoImg.style.display = 'block';
        document.getElementById('logo-text').style.display = 'none';

        const footerLogoImg = document.getElementById('footer-logo-img');
        if(footerLogoImg) {
            footerLogoImg.src = siteData.header.logoImage;
            footerLogoImg.style.display = 'block';
            document.getElementById('footer-logo-text').style.display = 'none';
        }
    } else {
        document.getElementById('logo-text').textContent = siteData.header.logoText;
        document.getElementById('footer-logo-text').textContent = siteData.header.logoText;
    }
    
    const navLinksContainer = document.getElementById('nav-links');
    siteData.header.menu.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);
        navLinksContainer.appendChild(li);
    });
    
    // Add Webmail Link
    const webmailLi = document.createElement('li');
    webmailLi.innerHTML = `<a href="http://webmail.alphaeco.cafe24.com/intro.php" target="_blank" title="사내 웹메일 로그인" style="font-size: 1.2rem;">👤</a>`;
    navLinksContainer.appendChild(webmailLi);
    
    // Add Admin Icon
    const adminLi = document.createElement('li');
    adminLi.innerHTML = `<a href="#" onclick="openAdmin(event)" title="관리자 모드">⚙️</a>`;
    navLinksContainer.appendChild(adminLi);

    // Hero
    document.getElementById('hero-title').innerHTML = siteData.hero.title.replace(/\n/g, '<br>');
    document.getElementById('hero-subtitle').textContent = siteData.hero.subtitle;
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.textContent = siteData.hero.buttonText;
    heroBtn.href = siteData.hero.buttonLink;

    // About
    document.getElementById('about-title').textContent = siteData.about.title;
    document.getElementById('about-heading').textContent = siteData.about.heading;
    
    const aboutDescContainer = document.getElementById('about-desc');
    siteData.about.description.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        aboutDescContainer.appendChild(p);
    });

    const aboutStatsContainer = document.getElementById('about-stats');
    siteData.about.stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-card';
        if (stat.id) {
            div.style.cursor = 'pointer';
            div.onclick = () => window.location.href = `subpage.html?page=${stat.id}`;
        }
        div.innerHTML = `
            <span class="stat-num">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        aboutStatsContainer.appendChild(div);
    });

    // Research
    document.getElementById('research-title').textContent = siteData.research.title;
    const researchGrid = document.getElementById('research-grid');
    
    siteData.research.areas.forEach((area, index) => {
        const div = document.createElement('div');
        div.className = `research-card fade-up delay-${(index % 3) + 1}`;
        div.innerHTML = `
            <div class="research-icon">${area.icon}</div>
            <h3>${area.title}</h3>
            <p>${area.description}</p>
        `;
        researchGrid.appendChild(div);
    });

    // Resources
    document.getElementById('resources-title').textContent = siteData.resources.title;
    document.getElementById('resources-desc').textContent = siteData.resources.description;
    
    const resourceList = document.getElementById('resource-list');
    if (resourceList && siteData.resources.items) {
        resourceList.innerHTML = '';
        siteData.resources.items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'resource-card fade-up visible';
            card.innerHTML = `
                <div class="resource-type">${item.type}</div>
                <h3>${item.title}</h3>
                <div class="resource-meta">
                    <span>📅 ${item.date}</span>
                </div>
            `;
            resourceList.appendChild(card);
        });
    }

    // Contact
    document.getElementById('contact-title').textContent = siteData.contact.title;
    
    if (siteData.header.logoImage && siteData.header.logoImage !== "") {
        const contactLogo = document.getElementById('contact-logo');
        contactLogo.src = siteData.header.logoImage;
        contactLogo.style.display = 'block';
        document.getElementById('contact-company').style.display = 'none';
    } else {
        document.getElementById('contact-company').textContent = siteData.contact.companyName;
    }
    
    document.getElementById('contact-address').textContent = siteData.contact.address;
    document.getElementById('contact-phone').textContent = siteData.contact.phone;
    document.getElementById('contact-email').textContent = siteData.contact.email;

    // Google Maps Iframe (Using generic embed for the address)
    const encodedAddress = encodeURIComponent(siteData.contact.mapQuery);
    const mapIframe = `<iframe 
        src="https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed" 
        width="100%" height="100%" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0">
    </iframe>`;
    document.getElementById('map-container').innerHTML = mapIframe;

    // Footer
    document.getElementById('footer-copyright').textContent = siteData.footer.copyright;
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('active');
        }
    });
}

function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up');
    animatedElements.forEach(el => observer.observe(el));
    
    // Trigger immediately for elements already in viewport on load
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-up');
        heroElements.forEach(el => el.classList.add('visible'));
    }, 100);
}
