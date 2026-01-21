export async function loadModule(id, path) {
    try {
        // Добавляем ?v=случайное_число, чтобы браузер думал, что это новый файл
        const uniquePath = `${path}?v=${Date.now()}`;
        
        const response = await fetch(uniquePath);
        if (!response.ok) throw new Error(`Ошибка загрузки: ${path}`);
        
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        return true;
    } catch (err) {
        console.error("Ошибка в loader.js:", err);
        return false;
    }
}