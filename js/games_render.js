console.log("Render System: Loaded");

// ФУНКЦИЯ: Рисует одну карточку (вспомогательная)
function createCard(game, options = {}) {
    const { isArchive = false, isDevelopment = false } = options;

    let imgContent;
    // Проверка картинки
    if (game.isTextOnly || !game.image || !game.image.includes('/')) {
        imgContent = `<div class="m-img">${game.image || 'GAME'}</div>`;
    } else {
        imgContent = `<div class="m-img" style="background-image: url('${game.image}'); background-size: cover;"></div>`;
    }

    let btnText = (isArchive || isDevelopment) ? "VIEW" : "PLAY";
    let btnAction = game.link && game.link !== "#" ? `window.location.href='${game.link}'` : "";

    return `
        <div class="mini-card ${isArchive ? 'archive-card' : ''} ${isDevelopment ? 'dev-card' : ''}">
            <button class="share-btn" onclick="copyLink()">
                 <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
            </button>
            ${imgContent}
            <div class="m-info">
                <h3>${game.name}</h3>
                <p>${game.desc}</p>
            </div>
            <div class="card-controls">
                <button class="play-mini-btn" onclick="${btnAction}">${btnText}</button>
                <a href="privacy.html" class="file-icon-btn"><img src="image/Documentation.png" class="doc-img"></a>
            </div>
        </div>
    `;
}

// ГЛАВНАЯ ФУНКЦИЯ: Проверяет наличие блоков и заполняет их
function checkAndRender() {
    // 1. Ищем контейнер для новых игр
    const newContainer = document.getElementById('new-games-grid');
    
    // Если контейнера нет (мы не на вкладке Projects) — выходим
    if (!newContainer) return;
    
    // Если контейнер есть, но в нем уже что-то написано — выходим (чтобы не дублировать)
    if (newContainer.innerHTML.trim() !== "") return;

    console.log("Render System: Projects page detected. Rendering...");

    // === РЕНДЕР ГЛАВНОЙ КАРТОЧКИ (HERO) ===
    const heroContainer = document.getElementById('hero-container');
    const hero = gamesData.hero;
    if (heroContainer && hero) {
        heroContainer.innerHTML = `
            <div class="hero-card">
                <button class="share-btn hero-share" onclick="copyLink()">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg>
                </button>
                <img src="${hero.image}" alt="${hero.title}" class="hero-img">
                <div class="hero-overlay">
                    <div class="hero-text">
                        <span class="badge">${hero.badge}</span>
                        <h1>${hero.title}</h1>
                        <p>${hero.description}</p>
                        <div class="card-controls">
                            <button class="primary-btn" onclick="window.location.href='${hero.link}'">PLAY NOW</button>
                            <a href="privacy.html" class="file-icon-btn"><img src="image/Documentation.png" class="doc-img"></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // === ЗАПОЛНЯЕМ СПИСКИ ===
    if (gamesData.newGames) {
        gamesData.newGames.forEach(game => {
            newContainer.innerHTML += createCard(game);
        });
    }

    const devContainer = document.getElementById('dev-games-grid');
    if (gamesData.development && devContainer) {
        gamesData.development.forEach(game => {
            devContainer.innerHTML += createCard(game, { isDevelopment: true });
        });
    }

    const arcContainer = document.getElementById('archive-games-grid');
    if (gamesData.archive && arcContainer) {
        gamesData.archive.forEach(game => {
            arcContainer.innerHTML += createCard(game, { isArchive: true });
        });
    }
}

// ЗАПУСКАЕМ "СЛЕЖКУ"
// Каждые 100 миллисекунд скрипт будет проверять: "Мы уже на странице проектов или нет?"
setInterval(checkAndRender, 100);
