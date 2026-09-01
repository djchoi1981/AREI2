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
            { name: "연구원 소개", link: "index.html#about" },
            { name: "연구 분야", link: "index.html#research" },
            { name: "자료실", link: "resources.html" },
            { name: "게시판", link: "board.html" },
            { name: "오시는 길", link: "index.html#contact" }
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
        title: "연구분야",
        areas: [
            {
                icon: "🐟",
                title: "민물고기 생태조사",
                description: "어류상 및 개체군 조사로 하천 생태계 진단평가를 진행합니다.",
                image: "https://images.unsplash.com/photo-1544377193-33dce4ea0ba1?q=80&w=400&auto=format&fit=crop"
            },
            {
                icon: "🏞️",
                title: "서식지·수생태계 평가",
                description: "하천 서식처 구조 등 수생태계를 종합적으로 평가합니다.",
                image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=400&auto=format&fit=crop"
            },
            {
                icon: "🧬",
                title: "환경DNA·수질 분석",
                description: "eDNA 및 수질 분석으로 생물다양성과 수질 상태를 정밀 진단합니다.",
                image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop"
            },
            {
                icon: "💻",
                title: "GIS·생태모델링",
                description: "GIS 기반 공간분석과 모델링으로 과학적 의사결정을 지원합니다.",
                image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=400&auto=format&fit=crop"
            }
        ]
    },
    resources: {
        title: "연구성과",
        description: "",
        driveFolderId: "", // 여기에 구글 드라이브 폴더 ID를 입력하세요
        categories: ["전체", "어류", "서식지", "eDNA", "수질"],
        achievements: [
            { category: "어류", title: "멸종위기종(퉁사리) 서식지 신규 확인", date: "2024", image: "https://images.unsplash.com/photo-1544377193-33dce4ea0ba1?q=80&w=400&auto=format&fit=crop" },
            { category: "서식지", title: "하천 건강성 평가 지수 개발 및 적용", date: "2023", image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=400&auto=format&fit=crop" },
            { category: "eDNA", title: "eDNA 기반 어류 모니터링 표준 프로토콜 확립", date: "2024", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=400&auto=format&fit=crop" }
        ],
        reports: [
            { title: "낙동강 수계 권역 수생태계 조사보고서 (2024)", size: "8.2MB", format: "PDF", cover: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=300&auto=format&fit=crop" },
            { title: "금강 중·상류 생태계 서식지 평가보고서 (2023)", size: "6.7MB", format: "PDF", cover: "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=300&auto=format&fit=crop" },
            { title: "환경과 지역 맞춤 생태복원 명세서 (eDNA)", size: "5.3MB", format: "PDF", cover: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=300&auto=format&fit=crop" }
        ]
    },
    contact: {
        title: "함께 만드는 건강한 하천, 연구협력을 기다립니다",
        subtitle: "연구·조사·정책 수립 등 다양한 분야에서 협력 파트너십을 환영합니다.",
        companyName: "주식회사 알파생태연구원",
        address: "전북특별자치도 군산시 옥산면 대려2길 18-1",
        phone: "070-4099-1400",
        email: "manager@alpha-eco.com",
        mapQuery: "전북 군산시 옥산면 대려2길 18-1"
    },
    
    // 신규 추가 섹션 (국가과제, 연구 프로세스, 갤러리, 소식)
    nationalProjects: {
        title: "국가과제",
        mainProject: {
            title: "금강 상류권역 수생태계 건강성 평가 및 보전방안 연구",
            period: "2023.01 ~ 2026.12 (4년)",
            budget: "18.5억원",
            progress: 68,
            tasks: [
                "어류·저서동물·부착규조류 등 생물다양성 평가",
                "하천 서식지 및 수질 통합 평가",
                "주요 훼손 원인 진단 및 보전·복원 우선순위 도출",
                "유역 맞춤형 보전·관리 정책 제안"
            ]
        },
        relatedProjects: [
            {
                title: "섬진강 수계 어류생태 모니터링",
                period: "2022.04 ~ 2025.03",
                image: "https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?q=80&w=600&auto=format&fit=crop"
            },
            {
                title: "금강 중·상류 서식지 복원 효과평가",
                period: "2021.07 ~ 2024.06",
                image: "https://images.unsplash.com/photo-1455218873509-8097305ee378?q=80&w=600&auto=format&fit=crop"
            }
        ]
    },
    researchProcess: {
        title: "연구 프로세스",
        steps: [
            { id: "01", title: "현장조사", desc: "하천 현장답사 및 어류·서식지 조사", icon: "👨‍🔬" },
            { id: "02", title: "시료·자료 수집", desc: "어류, 수질, 시료 등 표준화된 재료 수집", icon: "🧪" },
            { id: "03", title: "실험실 분석", desc: "eDNA, 수질, 생물지표 등 정밀 분석 수행", icon: "🔬" },
            { id: "04", title: "GIS·모델링", desc: "공간분석 및 생태모델링으로 평가·예측 수행", icon: "💻" },
            { id: "05", title: "정책·보고", desc: "과학적 근거 기반 정책·보고서 작성", icon: "📄" }
        ]
    },
    gallery: {
        title: "현장 갤러리",
        image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop"
    },
    news: {
        title: "소식",
        items: [
            {
                title: "알파생태연구원, 금강 상류권역 현장 워크숍 개최",
                date: "2025.05.13",
                desc: "지역 전문가 및 유관기관과 함께 수생태 보전 협력 방안을 논의했습니다.",
                image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=200&auto=format&fit=crop"
            },
            {
                title: "eDNA 분석 장비 고도화로 정밀 진단 역량 강화",
                date: "2025.04.12",
                desc: "차세대 시퀀싱 장비 도입으로 eDNA 분석 정확도와 처리량을 향상했습니다.",
                image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=200&auto=format&fit=crop"
            },
            {
                title: "연구성과, 멸종위기어류 복원을 위한 자문회의 참여",
                date: "2025.03.15",
                desc: "과학적 연구결과가 실효성 있는 정책으로 이어지도록 전문가 자문에 참여했습니다.",
                image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=200&auto=format&fit=crop"
            }
        ]
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
