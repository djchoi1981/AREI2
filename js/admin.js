// LocalStorage 데이터 덮어쓰기 로직
const savedData = localStorage.getItem('siteData');
if (savedData) {
    try {
        window.siteData = JSON.parse(savedData);
    } catch (e) {
        console.error('Failed to parse saved siteData', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 0. 디자인 설정 로드
    if (!siteData.styles) siteData.styles = {}; // 하위호환
    
    const navbarBg = siteData.styles.navbarBg || "";
    document.getElementById('style-navbar-bg').value = navbarBg;
    if (navbarBg.startsWith('#')) document.getElementById('style-navbar-bg-color').value = navbarBg.substring(0, 7);

    const footerBg = siteData.styles.footerBg || "";
    document.getElementById('style-footer-bg').value = footerBg;
    if (footerBg.startsWith('#')) document.getElementById('style-footer-bg-color').value = footerBg.substring(0, 7);

    document.getElementById('style-hero-image').value = siteData.styles.heroImage || "";

    // 색상표 선택 시 텍스트 필드 업데이트
    document.getElementById('style-navbar-bg-color').addEventListener('input', (e) => {
        document.getElementById('style-navbar-bg').value = e.target.value;
    });
    document.getElementById('style-footer-bg-color').addEventListener('input', (e) => {
        document.getElementById('style-footer-bg').value = e.target.value;
    });

    // 파일 선택 시 Base64로 변환하여 hidden 필드에 저장
    document.getElementById('style-hero-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                document.getElementById('style-hero-image').value = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // 1. 오시는 길 로드
    document.getElementById('contact-company').value = siteData.contact.companyName;
    document.getElementById('contact-address').value = siteData.contact.address;
    document.getElementById('contact-phone').value = siteData.contact.phone;
    document.getElementById('contact-email').value = siteData.contact.email;

    // 2. 자료실 드라이브 로드
    document.getElementById('resources-drive-link').value = siteData.resources.driveFolderId || "";
    // 기존 자료실(정적 항목) 로드
    renderList('resources-list', siteData.resources.items, 'resource');

    // 3. 서브페이지 로드
    renderList('projects-list', siteData.subpages.projects.list, 'subpage');
    renderList('papers-list', siteData.subpages.papers.list, 'subpage');
    renderList('patents-list', siteData.subpages.patents.list, 'subpage');

    // 4. 하단 푸터 로드
    document.getElementById('footer-copyright').value = siteData.footer.copyright;

    // 5. 비밀번호 로드
    document.getElementById('admin-password').value = siteData.admin.password;
});

function renderList(containerId, dataArray, type) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    dataArray.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'form-row';
        if (type === 'resource') {
            row.innerHTML = `
                <input type="text" placeholder="제목" value="${item.title}" class="i-title">
                <input type="text" placeholder="날짜 (예: 2026.05.12)" value="${item.date}" class="i-date">
                <input type="text" placeholder="타입 (Report, Paper 등)" value="${item.type}" class="i-type">
                <button class="btn btn-danger" onclick="this.parentElement.remove()">삭제</button>
            `;
        } else {
            row.innerHTML = `
                <input type="text" placeholder="제목" value="${item.title}" class="i-title">
                <input type="text" placeholder="상세 내용" value="${item.detail}" class="i-detail">
                <button class="btn btn-danger" onclick="this.parentElement.remove()">삭제</button>
            `;
        }
        container.appendChild(row);
    });
}

function addListItem(containerId, type) {
    const container = document.getElementById(containerId);
    const row = document.createElement('div');
    row.className = 'form-row';
    if (type === 'resource') {
        row.innerHTML = `
            <input type="text" placeholder="제목" value="" class="i-title">
            <input type="text" placeholder="날짜 (예: 2026.05.12)" value="" class="i-date">
            <input type="text" placeholder="타입 (Report, Paper 등)" value="" class="i-type">
            <button class="btn btn-danger" onclick="this.parentElement.remove()">삭제</button>
        `;
    } else {
        row.innerHTML = `
            <input type="text" placeholder="제목" value="" class="i-title">
            <input type="text" placeholder="상세 내용" value="" class="i-detail">
            <button class="btn btn-danger" onclick="this.parentElement.remove()">삭제</button>
        `;
    }
    container.appendChild(row);
}

function gatherListData(containerId, type) {
    const container = document.getElementById(containerId);
    const rows = container.querySelectorAll('.form-row');
    const data = [];
    rows.forEach(row => {
        if (type === 'resource') {
            data.push({
                title: row.querySelector('.i-title').value,
                date: row.querySelector('.i-date').value,
                type: row.querySelector('.i-type').value
            });
        } else {
            data.push({
                title: row.querySelector('.i-title').value,
                detail: row.querySelector('.i-detail').value
            });
        }
    });
    return data;
}

function saveToLocalStorage() {
    // Gather all updated data
    if (!siteData.styles) siteData.styles = {};
    siteData.styles.navbarBg = document.getElementById('style-navbar-bg').value;
    siteData.styles.footerBg = document.getElementById('style-footer-bg').value;
    siteData.styles.heroImage = document.getElementById('style-hero-image').value;

    siteData.contact.companyName = document.getElementById('contact-company').value;
    siteData.contact.address = document.getElementById('contact-address').value;
    siteData.contact.phone = document.getElementById('contact-phone').value;
    siteData.contact.email = document.getElementById('contact-email').value;

    let driveLink = document.getElementById('resources-drive-link').value.trim();
    let folderId = driveLink;
    if (driveLink.includes("folders/")) {
        const match = driveLink.match(/folders\/([a-zA-Z0-9-_]+)/);
        if (match && match[1]) folderId = match[1];
    } else if (driveLink.includes("id=")) {
        const match = driveLink.match(/id=([a-zA-Z0-9-_]+)/);
        if (match && match[1]) folderId = match[1];
    }
    siteData.resources.driveFolderId = folderId;
    siteData.resources.items = gatherListData('resources-list', 'resource');
    siteData.subpages.projects.list = gatherListData('projects-list', 'subpage');
    siteData.subpages.papers.list = gatherListData('papers-list', 'subpage');
    siteData.subpages.patents.list = gatherListData('patents-list', 'subpage');
    
    siteData.footer.copyright = document.getElementById('footer-copyright').value;
    siteData.admin.password = document.getElementById('admin-password').value;

    // Save to LocalStorage
    localStorage.setItem('siteData', JSON.stringify(siteData));
    alert("브라우저 임시 적용이 완료되었습니다!\n홈페이지를 열면 적용된 모습을 볼 수 있습니다.\n(영구 저장을 원하시면 data.js를 다운로드하여 덮어쓰세요.)");
}

function downloadDataJs() {
    saveToLocalStorage(); // Ensure latest data is saved

    // Create the content for data.js
    const fileContent = `// 웹사이트 데이터 파일 (이 파일만 수정하면 홈페이지 내용이 변경됩니다)\n\nlet siteData = ${JSON.stringify(siteData, null, 4)};\n`;

    // Create a Blob and trigger download
    const blob = new Blob([fileContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert("data.js 파일이 다운로드되었습니다.\n다운로드된 파일을 기존 js/ 폴더 안의 data.js 파일에 덮어쓰기(바꾸기) 하시면 수정이 완료됩니다!");
}
