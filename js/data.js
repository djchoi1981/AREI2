// 웹사이트 데이터 파일 (이 파일만 수정하면 홈페이지 내용이 변경됩니다)

const siteData = {
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
            { number: "20+", label: "연구 프로젝트" },
            { number: "50+", label: "발표 논문" },
            { number: "10+", label: "특허 기술" }
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
        companyName: "(주)알파생태연구원",
        address: "전북특별자치도 군산시 미룡동 440번지 109호",
        phone: "063-000-0000",
        email: "info@alphaecology.re.kr",
        mapQuery: "전북 군산시 미룡동 440"
    },
    footer: {
        copyright: "© 2026 Alpha Ecology Research Institute. All rights reserved."
    }
};
