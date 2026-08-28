// =========================================================================
// Firebase 프로젝트 연동 설정 (board.js와 동일)
// =========================================================================
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

// Firebase 초기화
let db;
let storage;
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
    } catch(e) {
        console.error("Firebase 초기화 에러:", e);
    }
}
db = firebase.database();
storage = firebase.storage();

// 상태 변수
let currentPosts = [];
let currentViewingPostId = null;

// =========================================================================
// 자료실 로직 (Realtime Database + Storage)
// =========================================================================

// 실시간 데이터 가져오기 (on('value'))
if (db) {
    db.ref("resources").on("value", (snapshot) => {
        currentPosts = [];
        const tbody = document.getElementById("board-tbody");
        tbody.innerHTML = "";

        if (!snapshot.exists()) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;">첫 번째 자료를 올려주세요!</td></tr>';
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

            const hasFile = post.fileUrl ? "💾" : "-";

            tr.innerHTML = `
                <td>${index--}</td>
                <td>${post.title}</td>
                <td style="text-align:center;">${hasFile}</td>
                <td>${post.author}</td>
                <td>${dateStr}</td>
            `;
            
            tr.onclick = () => viewPost(post.id);
            tbody.appendChild(tr);
        });
    }, (error) => {
        console.error("자료 가져오기 실패:", error);
        document.getElementById("board-tbody").innerHTML = '<tr><td colspan="5" style="text-align:center; color:red;">권한이 없거나 설정을 확인해주세요.<br>(Firebase 콘솔 -> Realtime Database -> 규칙(Rules)에서 read, write를 true로 설정해야 합니다.)</td></tr>';
    });
}

// 모달 열기/닫기
function openWriteModal() {
    if (!db) {
        alert("먼저 Firebase 설정을 완료해야 글을 작성할 수 있습니다.");
        return;
    }
    document.getElementById("writeModal").style.display = "block";
}

function closeWriteModal() {
    document.getElementById("writeModal").style.display = "none";
    document.getElementById("writeForm").reset();
}

// 새 자료 등록 (Storage 업로드 포함)
async function submitPost(e) {
    e.preventDefault();
    if (!db || !storage) return;

    const title = document.getElementById("postTitle").value;
    const author = document.getElementById("postAuthor").value;
    const password = document.getElementById("postPassword").value;
    const content = document.getElementById("postContent").value;
    const fileInput = document.getElementById("postFile");
    
    const submitBtn = document.getElementById("submitBtn");

    submitBtn.disabled = true;
    submitBtn.textContent = "업로드 중...";

    let fileUrl = null;
    let fileName = null;

    try {
        // 1. 파일이 선택된 경우 Firebase Storage에 먼저 업로드
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            fileName = file.name;
            // 중복 방지를 위해 파일명에 타임스탬프 추가
            const storageRef = storage.ref(`resources/${Date.now()}_${fileName}`);
            
            const uploadTask = await storageRef.put(file);
            fileUrl = await uploadTask.ref.getDownloadURL();
        }

        // 2. 파일 업로드가 완료되면 Realtime Database에 메타데이터 저장
        await db.ref("resources").push({
            title: title,
            author: author,
            password: password,
            content: content,
            fileUrl: fileUrl,
            fileName: fileName,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        });
        
        closeWriteModal();
        alert("자료가 성공적으로 등록되었습니다.");
    } catch (error) {
        console.error("등록 에러:", error);
        // Storage 권한 에러 처리 가이드
        if (error.code === 'storage/unauthorized') {
            alert("파일 업로드 권한이 없습니다.\nFirebase Storage -> Rules 탭에서 read, write 규칙을 true로 변경해주세요.");
        } else {
            alert("등록에 실패했습니다. " + error.message);
        }
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "등록하기";
    }
}

// 자료 상세 보기
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
    document.getElementById("view-content").textContent = post.content || "내용이 없습니다.";

    // 첨부파일 영역 처리
    const attachmentDiv = document.getElementById("view-attachment");
    if (post.fileUrl) {
        attachmentDiv.style.display = "block";
        const fileLink = document.getElementById("view-file-link");
        fileLink.href = post.fileUrl;
        fileLink.textContent = post.fileName + " (다운로드)";
    } else {
        attachmentDiv.style.display = "none";
    }
}

// 목록으로 돌아가기
function closePostView() {
    currentViewingPostId = null;
    document.getElementById("board-post-view").style.display = "none";
    document.getElementById("board-list-view").style.display = "block";
}

// 자료 삭제
async function attemptDeletePost() {
    if (!currentViewingPostId || !db) return;

    const post = currentPosts.find(p => p.id === currentViewingPostId);
    
    const inputPassword = prompt("자료 등록 시 입력한 비밀번호를 입력하세요.");
    if (inputPassword === null) return;
    
    if (inputPassword !== post.password) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
    }

    if (confirm("정말로 이 자료를 삭제하시겠습니까?")) {
        try {
            // 1. Storage에서 파일 삭제 (옵션이지만 권장됨)
            // Firebase Storage HTTP URL에서 ref 위치를 파싱하기는 약간 까다롭지만
            // refFromURL 메서드를 사용하면 쉽게 삭제할 수 있습니다.
            if (post.fileUrl && storage) {
                try {
                    const fileRef = storage.refFromURL(post.fileUrl);
                    await fileRef.delete();
                } catch(fileError) {
                    console.warn("스토리지 파일 삭제 실패 (무시됨):", fileError);
                }
            }

            // 2. DB에서 메타데이터 삭제
            await db.ref("resources/" + currentViewingPostId).remove();
            
            alert("삭제되었습니다.");
            closePostView();
        } catch (error) {
            console.error("삭제 에러:", error);
            alert("삭제에 실패했습니다.");
        }
    }
}
