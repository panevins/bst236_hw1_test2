const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Simple Pacman game logic
let pacman = { x: 50, y: 50, size: 20, dx: 0, dy: 0 };
const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function drawMaze() {
    for (let row = 0; row < maze.length; row++) {
        for (let col = 0; col < maze[row].length; col++) {
            if (maze[row][col] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(col * 20, row * 20, 20, 20);
            } else {
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.arc(col * 20 + 10, row * 20 + 10, 3, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}

function drawPacman() {
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
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

    const col = Math.floor(pacman.x / 20);
    const row = Math.floor(pacman.y / 20);

    if (maze[row][col] === 0) {
        maze[row][col] = 2; // Mark the dot as eaten
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMaze();
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