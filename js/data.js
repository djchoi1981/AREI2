// 웹사이트 데이터 파일 (이 파일만 수정하면 홈페이지 내용이 변경됩니다)

let siteData = {
    // 관리자 모드 설정
    admin: {
        password: "1234"
    },
    // 사이트 디자인 설정
    styles: {
        navbarBg: "", // 예: rgba(255, 255, 255, 0.9)
        footerBg: "", // 예: #0a4d68
        heroImage: "assets/hero_bg.jpg" // 기본값
    },
    // 헤더 및 메인 배너
    header: {
        logoText: "알파생태연구원",
        logoImage: "assets/logo.png", // 로고 이미지 경로 (사용하지 않을 경우 "" 로 비워두세요)
        menu: [
            { name: "연구원 소개", link: "#about" },
            { name: "연구 분야", link: "#research" },
            { name: "자료실", link: "#resources" },
            { name: "오시는 길", link: "#contact" }
        ]
    },
    hero: {
        title: "생명과 환경의 조화,\n알파생태연구원",
        subtitle: "내수면 생태계 복원과 지속가능한 어류 자원 연구를 선도합니다.",
        buttonText: "연구분야 알아보기",
        buttonLink: "#research"
    },
    about: {
        title: "About Us",
        heading: "미래 세대를 위한 맑은 물과 건강한 생태계",
        description: [
            "알파생태연구원은 대한민국 담수 생태계의 보존과 복원을 위해 설립되었습니다.",
            "수산자원의 지속가능한 이용과 멸종위기 담수어류의 증식 및 유전체 연구를 통해, 건강한 수생태계 회복에 앞장서고 있습니다.",
            "글로벌 연구기관들과의 협력을 통해 선진화된 수산 과학기술을 개발합니다."
        ],
        stats: [
            { id: "projects", number: "20+", label: "연구 프로젝트" },
            { id: "papers", number: "50+", label: "발표 논문" },
            { id: "patents", number: "10+", label: "특허 기술" }
        ]
    },
    research: {
        title: "Research & Development",
        areas: [
            {
                icon: "🐟",
                title: "담수어류 생태연구",
                description: "토종 담수어류의 서식지 환경 조사 및 생태적 특성 연구를 수행합니다."
            },
            {
                icon: "🧬",
                title: "수산 자원 보존 및 증식",
                description: "멸종위기종 복원 및 경제성 어종의 안정적인 종묘 생산 기술을 개발합니다."
            },
            {
                icon: "💧",
                title: "수질 및 서식지 분석",
                description: "첨단 장비를 활용하여 수생태계 건강성을 평가하고 수질오염 척도를 분석합니다."
            },
            {
                icon: "🌿",
                title: "지속가능한 양식 기술",
                description: "환경 친화적이고 질병에 강한 스마트 양식 시스템(RAS)을 연구합니다."
            }
        ]
    },
    resources: {
        title: "Publications & Data",
        description: "알파생태연구원의 최신 연구 성과와 생태 데이터를 확인하세요.",
        items: [
            { title: "2025년 금강 유역 담수어류 서식 실태 보고서", date: "2026.05.12", type: "Report" },
            { title: "토종 붕어의 유전적 다양성 보존 방안", date: "2026.03.28", type: "Paper" },
            { title: "기후변화에 따른 수생태계 변동 예측 모델", date: "2025.11.05", type: "Data" }
        ]
    },
    contact: {
        title: "Contact Us",
        companyName: "주식회사 알파생태연구원",
        address: "전북특별자치도 군산시 옥산면 대려2길 18-1",
        phone: "063-000-0000",
        email: "info@alphaecology.re.kr",
        mapQuery: "전북 군산시 옥산면 대려2길 18-1"
    },
    footer: {
        copyright: "© 2026 Alpha Ecology Research Institute. All rights reserved."
    },
    
    // 서브페이지 데이터 (추후 추가/수정 가능)
    subpages: {
        projects: {
            title: "연구 프로젝트",
            description: "알파생태연구원이 수행 중이거나 완료한 주요 연구 과제 목록입니다.",
            list: [
                { title: "기후변화 대응 금강 유역 고유종 서식지 복원 연구", detail: "발주처: 환경부 | 기간: 2025.01 - 2027.12" },
                { title: "스마트 양식(RAS)을 활용한 뱀장어 친환경 종묘 생산", detail: "발주처: 해양수산부 | 기간: 2024.03 - 2026.02" },
                { title: "토종 붕어 유전적 다양성 확보 및 유전자원 은행 구축", detail: "자체 연구 | 기간: 2025.06 - 진행중" },
                { title: "미세플라스틱이 담수어류 생태에 미치는 영향 분석", detail: "발주처: 한국연구재단 | 기간: 2023.05 - 2025.04" }
            ]
        },
        papers: {
            title: "발표 논문",
            description: "연구원 소속 연구진이 국내외 주요 학술지에 게재한 연구 논문입니다.",
            list: [
                { title: "Genetic diversity of endemic Cyprinidae in South Korea", detail: "Journal of Freshwater Ecology | 2026.05 | 제1저자: 김철수" },
                { title: "수생태계 복원 모델링을 통한 서식지 적합도 평가", detail: "한국생태학회지 | 2025.11 | 교신저자: 이영희" },
                { title: "Impact of temperature rise on the breeding cycle of native loaches", detail: "Aquatic Sciences | 2025.08 | 제1저자: 박지민" },
                { title: "순환여과식 양식(RAS) 시스템 내 미생물 군집 분석", detail: "한국수산과학회지 | 2024.12 | 공저자: 최민준" }
            ]
        },
        patents: {
            title: "특허 기술",
            description: "연구원이 개발하여 등록을 완료한 수산 및 생태 관련 특허 기술입니다.",
            list: [
                { title: "하천 생태계 교란 어종 자동 판별 및 포획 장치", detail: "등록번호: 10-2026-0012345 | 등록일: 2026.04.10" },
                { title: "질병 저항성 강화를 위한 친환경 담수어류 사료 조성물", detail: "등록번호: 10-2025-0098765 | 등록일: 2025.10.22" },
                { title: "휴대용 수질 모니터링 및 실시간 서식지 적합성 평가 시스템", detail: "등록번호: 10-2024-0054321 | 등록일: 2024.07.15" }
            ]
        }
    }
};
