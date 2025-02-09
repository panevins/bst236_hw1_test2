const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Simple Pacman game logic
let pacman = { x: 50, y: 50, size: 20, dx: 2, dy: 0 };

function drawPacman() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function update() {
    pacman.x += pacman.dx;
    pacman.y += pacman.dy;

    if (pacman.x + pacman.size > canvas.width || pacman.x - pacman.size < 0) {
        pacman.dx *= -1;
    }

    if (pacman.y + pacman.size > canvas.height || pacman.y - pacman.size < 0) {
        pacman.dy *= -1;
    }

    drawPacman();
    requestAnimationFrame(update);
}

update();