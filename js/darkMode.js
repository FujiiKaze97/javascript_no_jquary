// DOM 로딩시 로컬스토리지 테마 적용
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle'); // 토글버튼
    const savedTheme = localStorage.getItem('theme') || 'light'; // 로컬스토리지 테마 불러오기
    const isDarkMode = savedTheme === 'dark'; // 테마 다크모드 판단

// 토글버튼 이벤트
    themeToggle.addEventListener('click', () => {
        // body태그에 class 토글 / 다크모드 경우 true 반환
        const isDarkMode = document.body.classList.toggle('dark-mode');
        // 로컬스토리지 테마 저장 true=>'dark' false=>'light'
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyTheme(isDarkMode);
    });

    // 초기 테마 적용
    if(isDarkMode){
        themeToggle.click();
    }
});

// 테마 적용 함수
function applyTheme(isDarkMode) {
    const darkModeStylesheet = document.getElementById('darkMode-stylesheet');

    if (isDarkMode) {
        // 저장 테마 dark 일 경우
        if (!darkModeStylesheet) {
            const link = document.createElement('link');
            link.id = 'darkMode-stylesheet';
            link.rel = 'stylesheet';
            link.href = './css/darkMode.css';
            // head 에 다크모드 link 태그 추가하기
            document.head.appendChild(link);
        }
    } else {
        // 저장 테마 dark 아닐 경우
        if (darkModeStylesheet) {
            // 'darkMode-stylesheet' 이 있다면 다크모드 link 태그 삭제
            darkModeStylesheet.parentNode.removeChild(darkModeStylesheet);
        }
    }
}
