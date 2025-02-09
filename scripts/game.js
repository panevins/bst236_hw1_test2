const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Simple Pacman game logic
let pacman = { x: 50, y: 50, size: 20, dx: 0, dy: 0 };

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

    if (pacman.x + pacman.size > canvas.width) {
        pacman.x = canvas.width - pacman.size;
    } else if (pacman.x - pacman.size < 0) {
        pacman.x = pacman.size;
    }

    if (pacman.y + pacman.size > canvas.height) {
        pacman.y = canvas.height - pacman.size;
    } else if (pacman.y - pacman.size < 0) {
        pacman.y = pacman.size;
    }

    drawPacman();
    requestAnimationFrame(update);
}

function changeDirection(event) {
    const key = event.keyCode;
    switch (key) {
        case 37: // left arrow
            pacman.dx = -2;
            pacman.dy = 0;
            break;
        case 38: // up arrow
            pacman.dx = 0;
            pacman.dy = -2;
            break;
        case 39: // right arrow
            pacman.dx = 2;
            pacman.dy = 0;
            break;
        case 40: // down arrow
            pacman.dx = 0;
            pacman.dy = 2;
            break;
    }
}

document.addEventListener('keydown', changeDirection);

update();