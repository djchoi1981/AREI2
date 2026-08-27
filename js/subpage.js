document.addEventListener('DOMContentLoaded', () => {
    initSubpageNavbar();
    loadSubpageData();
});

function initSubpageNavbar() {
    // 1. Setup Logo from data.js
    if (siteData.header.logoImage && siteData.header.logoImage !== "") {
        const logoImg = document.getElementById('logo-img');
        logoImg.src = siteData.header.logoImage;
        logoImg.style.display = 'block';
        document.getElementById('logo-text').style.display = 'none';
    } else {
        document.getElementById('logo-text').textContent = siteData.header.logoText;
    }
    document.querySelector('.footer-logo').textContent = siteData.header.logoText;
    document.getElementById('footer-copyright').textContent = siteData.footer.copyright;

    // 2. Navbar interactions
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.getElementById('nav-links');

    // Make navbar always look solid on subpages (unless at top where gradient is, but subpage header is dark so it's fine)
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

function loadSubpageData() {
    // URL에서 ?page=... 파라미터 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page');

    const listContainer = document.getElementById('list-container');
    const titleEl = document.getElementById('page-title');
    const descEl = document.getElementById('page-desc');

    if (!pageId || !siteData.subpages[pageId]) {
        titleEl.textContent = "페이지를 찾을 수 없습니다.";
        descEl.textContent = "잘못된 접근이거나 데이터가 없습니다.";
        return;
    }

    const pageData = siteData.subpages[pageId];

    // 제목 및 설명 세팅
    titleEl.textContent = pageData.title;
    descEl.textContent = pageData.description;
    document.title = `${pageData.title} - ${siteData.header.logoText}`;

    // 리스트 렌더링
    pageData.list.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `list-item fade-up delay-${(index % 3) + 1}`;
        div.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
        `;
        listContainer.appendChild(div);
    });

    // 애니메이션 초기화 (스크롤)
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target);
            }
        });
    });

    const animatedElements = document.querySelectorAll('.fade-up:not(.visible)');
    animatedElements.forEach(el => observer.observe(el));
}
