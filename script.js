import { loadModule } from './js/loader.js';
import { initTheme } from './js/theme.js';
import { initNavigation } from './js/navigation.js';

window.addEventListener('DOMContentLoaded', async () => {
    // 1. Загружаем стартовые блоки
    await loadModule('navbar', './html/navbar.html');
    await loadModule('content-area', './html/projects.html');
    await loadModule('footer', './html/footer.html');

    // 2. Инициализируем логику модулей
    initTheme();
    initNavigation();

    // 3. Убираем Splash Screen
    setTimeout(() => {
        const splash = document.getElementById('splash');
        const wrapper = document.getElementById('site-wrapper');
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.style.display = 'none';
            wrapper.style.opacity = '1';
        }, 1000);
    }, 2000);
});

// Глобальные функции (для onclick в HTML)
window.copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
};