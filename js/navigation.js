import { loadModule } from './loader.js';

export function initNavigation() {
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('nav-btn')) {
            const tab = e.target.getAttribute('data-tab');
            
            // Загружаем нужную страницу из папки html
            await loadModule('content-area', `./html/${tab}.html`);
            
            // Обновляем активную кнопку
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
        }
    });
}