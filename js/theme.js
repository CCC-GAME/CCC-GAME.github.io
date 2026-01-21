export function initTheme() {
    document.addEventListener('click', (e) => {
        if (e.target.closest('.theme-switcher')) {
            const isLight = document.body.classList.toggle('light-theme');
            document.body.className = isLight ? 'light-theme' : 'dark-theme';
        }
    });
}