const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Game settings
const gridSize = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 160 }];
let direction = "right";
let food = generateFood();
let gameInterval;

// Start the game
function startGame() {
    gameInterval = setInterval(updateGame, 100);
}

// Update game state
function updateGame() {
    // Move snake
    const head = { ...snake[0] };
    
    if (direction === "right") head.x += gridSize;
    if (direction === "left") head.x -= gridSize;
    if (direction === "up") head.y -= gridSize;
    if (direction === "down") head.y += gridSize;
    
    // Check for collisions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || isSnakeColliding(head)) {
        clearInterval(gameInterval);
        alert("Game Over! Press OK to restart.");
        resetGame();
        return;
    }

    // Add new head
    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

// Check if the snake collides with itself
function isSnakeColliding(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Generate new food
function generateFood() {
    let foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x: foodX, y: foodY };
}

// Draw everything
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Handle key press events for direction
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "down") direction = "up";
    if (e.key === "ArrowDown" && direction !== "up") direction = "down";
    if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
    if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Reset game state
function resetGame() {
    snake = [{ x: 160, y: 160 }];
    direction = "right";
    food = generateFood();
    startGame();
}

// Start the game initially
startGame();
