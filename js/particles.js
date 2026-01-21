const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray;
let mouse = { x: null, y: null, radius: 100 };

// Настройка размера холста
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Класс Пикселя
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        // Рисуем квадрат (пиксель)
        ctx.rect(this.x, this.y, this.size, this.size);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        // Движение и отскок от краев
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // Взаимодействие с мышкой
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) this.x += 3;
            if (mouse.x > this.x && this.x > this.size * 10) this.x -= 3;
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) this.y += 3;
            if (mouse.y > this.y && this.y > this.size * 10) this.y -= 3;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

// Создаем стаю пикселей
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 15000;
    
    // === ВОТ ЗДЕСЬ БЫЛА ПРОБЛЕМА ===
    let isLight = document.body.classList.contains('light-theme');
    
    // В светлой теме ставим 0.8 (черный и жирный), в темной 0.1 (белый и прозрачный)
    let color = isLight ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.1)';

    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Анимация
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    // === И ЗДЕСЬ ТОЖЕ ПРОВЕРЯЕМ ===
    let isLight = document.body.classList.contains('light-theme');
    
    // Если тема светлая - делаем точки черными и яркими (0.8)
    // Если темная - белыми и прозрачными (0.1)
    let color = isLight ? 'rgb(0, 0, 0)' : 'rgba(255,255,255,0.1)';
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].color = color;
        particlesArray[i].update();
    }
}

init();
animate();