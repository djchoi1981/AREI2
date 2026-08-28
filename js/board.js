// =========================================================================
// [필수 사항] Firebase 프로젝트 연동 설정
// =========================================================================
// 1. https://console.firebase.google.com/ 에 접속하여 새 프로젝트를 만듭니다.
// 2. '프로젝트 설정(톱니바퀴 아이콘)' -> '일반(General)' -> 아래로 스크롤하여 웹 앱(</>)을 추가합니다.
// 3. 발급된 firebaseConfig 값들을 아래에 복사하여 붙여넣어 주세요.
const firebaseConfig = {
    apiKey: "AIzaSyBDBeec8ONTOyt0UHvlCcax_DVCfBYWCAI",
    authDomain: "alphaeco-62978.firebaseapp.com",
    databaseURL: "https://alphaeco-62978-default-rtdb.firebaseio.com",
    projectId: "alphaeco-62978",
    storageBucket: "alphaeco-62978.firebasestorage.app",
    messagingSenderId: "352617194729",
    appId: "1:352617194729:web:93266689e9a4427982fc78",
    measurementId: "G-8J09FTSG4C"
};

// Firebase 초기화 (설정값이 기본 상태면 초기화 생략 - 에러 방지)
let db;
// 임시 방편: apiKey가 없더라도 Realtime Database는 URL만으로 접근이 가능할 수 있지만, 정식으로 초기화하는 것이 좋습니다.
if (firebaseConfig.apiKey !== "여기에_API_KEY_입력" || firebaseConfig.databaseURL !== "") {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.database();
    } catch(e) {
        console.error("Firebase 초기화 에러:", e);
    }
}

// 상태 변수
let currentPosts = [];
let currentViewingPostId = null;

// =========================================================================
// 게시판 로직 (Realtime Database 버전)
// =========================================================================

// 실시간 데이터 가져오기 (on('value'))
if (db) {
    db.ref("board").on("value", (snapshot) => {
        currentPosts = [];
        const tbody = document.getElementById("board-tbody");
        tbody.innerHTML = "";

        if (!snapshot.exists()) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align:center;">첫 번째 게시글을 작성해 보세요!</td></tr>';
            return;
        }

        // 객체를 배열로 변환
        const data = snapshot.val();
        for (let key in data) {
            currentPosts.push({ id: key, ...data[key] });
        }

        // 최신 글이 위로 오도록 정렬 (createdAt 기준 내림차순)
        currentPosts.sort((a, b) => b.createdAt - a.createdAt);

        let index = currentPosts.length;
        currentPosts.forEach((post) => {
            const tr = document.createElement("tr");
            
            // 날짜 포맷팅
            let dateStr = "알 수 없음";
            if (post.createdAt) {
                const d = new Date(post.createdAt);
                dateStr = `${d.getFullYear()}.${String(d.getMonth()+1).padStart(2,'0')}.${String(d.getDate()).padStart(2,'0')}`;
            }

            tr.innerHTML = `
                <td>${index--}</td>
                <td>${post.title}</td>
                <td>${post.author}</td>
                <td>${dateStr}</td>
            `;
            
            tr.onclick = () => viewPost(post.id);
            tbody.appendChild(tr);
        });
    }, (error) => {
        console.error("게시글 가져오기 실패:", error);
        document.getElementById("board-tbody").innerHTML = '<tr><td colspan="4" style="text-align:center; color:red;">권한이 없거나 설정을 확인해주세요.<br>(Firebase 콘솔 -> Realtime Database -> 규칙(Rules)에서 read, write를 true로 설정해야 합니다.)</td></tr>';
    });
} else {
    document.getElementById("board-tbody").innerHTML = '<tr><td colspan="4" style="text-align:center; color:#e03131; font-weight:bold;">Firebase 연동이 필요합니다.<br>js/board.js 파일을 열고 firebaseConfig를 설정해 주세요.</td></tr>';
}

// 모달 열기/닫기
function openWriteModal() {
    if (!db) {
        alert("먼저 Firebase 설정을 완료해야 글을 작성할 수 있습니다.\njs/board.js 파일을 확인해주세요.");
        return;
    }
    document.getElementById("writeModal").style.display = "block";
}

function closeWriteModal() {
    document.getElementById("writeModal").style.display = "none";
    document.getElementById("writeForm").reset();
}

// 새 글 등록
async function submitPost(e) {
    e.preventDefault();
    
    if (!db) return;

    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    const password = document.getElementById("postPassword").value;
    const content = document.getElementById("postContent").value;
    const submitBtn = e.target.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = "등록 중...";

    try {
        await db.ref("board").push({
            title: title,
            author: author,
            password: password, // 평문 저장 (실제 서비스에서는 해싱 권장)
            content: content,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });
        closeWriteModal();
        alert("게시글이 성공적으로 등록되었습니다.");
    } catch (error) {
        console.error("등록 에러:", error);
        alert("등록에 실패했습니다. " + error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "등록하기";
    }
}

// 게시글 상세 보기
function viewPost(postId) {
    const post = currentPosts.find(p => p.id === postId);
    if (!post) return;

    currentViewingPostId = postId;

    document.getElementById("board-list-view").style.display = "none";
    const postView = document.getElementById("board-post-view");
    postView.style.display = "block";

    document.getElementById("view-title").textContent = post.title;
    document.getElementById("view-author").textContent = post.author;
    
    let dateStr = "알 수 없음";
    if (post.createdAt) {
        const d = new Date(post.createdAt);
        dateStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`;
    }
    document.getElementById("view-date").textContent = dateStr;
    document.getElementById("view-content").textContent = post.content;
}

// 목록으로 돌아가기
function closePostView() {
    currentViewingPostId = null;
    document.getElementById("board-post-view").style.display = "none";
    document.getElementById("board-list-view").style.display = "block";
}

// 게시글 삭제
async function attemptDeletePost() {
    if (!currentViewingPostId || !db) return;

    const post = currentPosts.find(p => p.id === currentViewingPostId);
    
    const inputPassword = prompt("게시글 작성 시 입력한 비밀번호를 입력하세요.");
    if (inputPassword === null) return; // 취소
    
    if (inputPassword !== post.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    if (confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
        try {
            await db.ref("board/" + currentViewingPostId).remove();
            alert("삭제되었습니다.");
            closePostView();
        } catch (error) {
            console.error("삭제 에러:", error);
            alert("삭제에 실패했습니다.");
        }
    }
}
