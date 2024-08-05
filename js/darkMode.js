// 테마 설정 예시
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    toggleDarkModeStylesheet(isDarkMode);
});

// 페이지 로드 시 테마 설정 적용
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const isDarkMode = savedTheme === 'dark';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    toggleDarkModeStylesheet(isDarkMode);
});

function toggleDarkModeStylesheet(enable) {
    let link = document.getElementById('dark-mode-stylesheet');
    if (enable) {
        if (!link) {
            link = document.createElement('link');
            link.id = 'dark-mode-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'dark-mode.css';
            document.head.appendChild(link);
        }
    } else {
        if (link) {
            link.parentNode.removeChild(link);
        }
    }
}
