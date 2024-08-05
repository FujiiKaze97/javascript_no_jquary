document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle'); // 토글버튼
    const savedTheme = localStorage.getItem('theme') || 'light'; // 로컬스토리지 테마 불러오기
    const isDarkMode = savedTheme === 'dark'; // 테마 다크모드 판단
    applyTheme(isDarkMode);

    themeToggle.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('darkMode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        applyTheme(isDarkMode);
    });
});

function applyTheme(isDarkMode) {
    const darkModeStylesheet = document.getElementById('darkMode-stylesheet');

    if (isDarkMode) {
        if (!darkModeStylesheet) {
            const link = document.createElement('link');
            link.id = 'darkMode-stylesheet';
            link.rel = 'stylesheet';
            link.href = 'darkMode.css';
            document.head.appendChild(link);        }
    } else {
        if (darkModeStylesheet) {
            darkModeStylesheet.parentNode.removeChild(darkModeStylesheet);
        }
    }
}
