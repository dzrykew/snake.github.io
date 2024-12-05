const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏配置
const gridSize = 20;
const tileCount = 20;

// 蛇的初始位置
let snake = [
    {x: 10, y: 10},
];
let food = {x: 15, y: 15};
let dx = 0;
let dy = 0;
let score = 0;

// 控制方向
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = 1; dy = 0; }
            break;
    }
});

function gameLoop() {
    // 移动蛇
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        generateFood();
    } else {
        snake.pop();
    }
    
    // 检查游戏结束条件
    if (isGameOver()) {
        alert(`游戏结束！得分：${score}`);
        resetGame();
        return;
    }
    
    // 清空画布
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 画食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize-2, gridSize-2);
    
    // 画蛇
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize-2, gridSize-2);
    });
    
    setTimeout(gameLoop, 100);
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function isGameOver() {
    // 撞墙
    if (snake[0].x < 0 || snake[0].x >= tileCount || 
        snake[0].y < 0 || snake[0].y >= tileCount) {
        return true;
    }
    
    // 撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    food = {x: 15, y: 15};
    dx = 0;
    dy = 0;
    score = 0;
    gameLoop();
}

// 开始游戏
gameLoop();
