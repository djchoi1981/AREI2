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
    const aboutDescContainer = document.getElementById('about-desc');
    aboutDescContainer.innerHTML = ''; // clear
    siteData.about.description.forEach(pText => {
        const p = document.createElement('p');
        p.textContent = pText;
        aboutDescContainer.appendChild(p);
    });

    const aboutStatsContainer = document.getElementById('about-stats');
    aboutStatsContainer.innerHTML = '';
    siteData.about.stats.forEach(stat => {
        const div = document.createElement('div');
        div.className = 'stat-card';
        div.innerHTML = `
            <div class="stat-icon">📄</div>
            <span class="stat-num">${stat.number}</span>
            <span class="stat-label">${stat.label}</span>
        `;
        aboutStatsContainer.appendChild(div);
    });

    // Research
    document.getElementById('research-title').textContent = siteData.research.title;
    const researchGrid = document.getElementById('research-grid');
    researchGrid.innerHTML = '';
    siteData.research.areas.forEach((area, index) => {
        const div = document.createElement('div');
        div.className = `research-card fade-up delay-${(index % 3) + 1}`;
        div.innerHTML = `
            <div class="research-image" style="background-image: url('${area.image}');"></div>
            <div class="research-icon">${area.icon}</div>
            <h3>${area.title}</h3>
            <p>${area.description}</p>
        `;
        researchGrid.appendChild(div);
    });

    // National Projects
    document.getElementById('projects-title').textContent = siteData.nationalProjects.title;
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = `
        <div class="projects-main fade-up">
            <h3>${siteData.nationalProjects.mainProject.title}</h3>
            <div class="projects-meta">
                <span class="meta-label">사업기간</span> ${siteData.nationalProjects.mainProject.period}<br>
                <span class="meta-label">사업비</span> ${siteData.nationalProjects.mainProject.budget}
            </div>
            <div class="projects-progress">
                <div class="progress-header">
                    <span>진행공정</span>
                    <span>${siteData.nationalProjects.mainProject.progress}%</span>
                </div>
                <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${siteData.nationalProjects.mainProject.progress}%;"></div>
                </div>
            </div>
            <div class="projects-tasks">
                <h4>주요 목표</h4>
                <ul>
                    ${siteData.nationalProjects.mainProject.tasks.map(task => `<li><i class="icon-check">✔️</i> ${task}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="projects-map fade-up delay-1">
            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop" alt="지도 데이터" class="map-image">
        </div>
        <div class="projects-related fade-up delay-2">
            <h4>관련 과제</h4>
            <div class="related-list">
                ${siteData.nationalProjects.relatedProjects.map(proj => `
                    <div class="related-card" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${proj.image}');">
                        <div class="related-content">
                            <h5>${proj.title}</h5>
                            <span>${proj.period}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Research Process
    document.getElementById('process-title').textContent = siteData.researchProcess.title;
    const processContainer = document.getElementById('process-container');
    processContainer.innerHTML = '';
    siteData.researchProcess.steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = `process-step fade-up delay-${index}`;
        stepDiv.innerHTML = `
            <div class="process-icon-circle">
                <span class="process-icon">${step.icon}</span>
            </div>
            <div class="process-id">${step.id}</div>
            <h4>${step.title}</h4>
            <p>${step.desc}</p>
        `;
        processContainer.appendChild(stepDiv);
        
        if (index < siteData.researchProcess.steps.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'process-arrow fade-up delay-1';
            arrow.innerHTML = '❯';
            processContainer.appendChild(arrow);
        }
    });

    // Outcomes
    document.getElementById('outcomes-title').textContent = siteData.resources.title;
    const outcomesFilters = document.getElementById('outcomes-filters');
    outcomesFilters.innerHTML = siteData.resources.categories.map((cat, i) => 
        `<button class="filter-btn ${i === 0 ? 'active' : ''}" onclick="filterOutcomes('${cat}')">${cat}</button>`
    ).join('');

    const achievementsGrid = document.getElementById('achievements-grid');
    achievementsGrid.innerHTML = siteData.resources.achievements.map((item, index) => `
        <div class="achievement-card fade-up delay-${index % 3}" data-category="${item.category}">
            <div class="achievement-image" style="background-image: url('${item.image}');"></div>
            <div class="achievement-content">
                <span class="achievement-tag">${item.category}</span>
                <h4>${item.title}</h4>
                <span class="achievement-date">${item.date}</span>
            </div>
        </div>
    `).join('');

    const reportsGrid = document.getElementById('reports-grid');
    reportsGrid.innerHTML = siteData.resources.reports.map((item, index) => `
        <div class="report-card fade-up delay-${index % 3}">
            <div class="report-cover" style="background-image: url('${item.cover}');"></div>
            <div class="report-content">
                <h4>${item.title}</h4>
                <div class="report-meta">
                    <span class="report-format">${item.format}</span>
                    <span class="report-size">${item.size}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Gallery & News
    document.getElementById('gallery-image').src = siteData.gallery.image;
    const newsList = document.getElementById('news-list');
    newsList.innerHTML = siteData.news.items.map(news => `
        <div class="news-item">
            <div class="news-thumb" style="background-image: url('${news.image}');"></div>
            <div class="news-content">
                <h4>${news.title}</h4>
                <p>${news.desc}</p>
                <span class="news-date">${news.date}</span>
            </div>
        </div>
    `).join('');

    // Contact & Footer
    document.getElementById('contact-title').innerHTML = siteData.contact.title.replace(/\n/g, '<br>');
    document.getElementById('contact-subtitle').textContent = siteData.contact.subtitle;
    document.getElementById('contact-email').textContent = siteData.contact.email;
    document.getElementById('contact-phone').textContent = siteData.contact.phone;
    document.getElementById('contact-address').textContent = siteData.contact.address;
    document.getElementById('footer-company-info').innerHTML = `
        ${siteData.contact.companyName} | ${siteData.contact.address}<br>
        T. ${siteData.contact.phone} | E. ${siteData.contact.email}
    `;
    
    // Footer Logo
    if (siteData.header.logoImage && siteData.header.logoImage !== "") {
        document.getElementById('footer-logo-img').src = siteData.header.logoImage;
        document.getElementById('footer-logo-img').style.display = 'block';
        document.getElementById('footer-logo-text').style.display = 'none';
    } else {
        document.getElementById('footer-logo-text').textContent = siteData.header.logoText;
    }
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

function filterOutcomes(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        if (btn.textContent === category) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    const cards = document.querySelectorAll('.achievement-card');
    cards.forEach(card => {
        if (category === '전체' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

