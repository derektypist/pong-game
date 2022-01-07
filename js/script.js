// Set Up Global Variables and Constants
let canvas = document.getElementsByTagName('canvas')[0];
let canvasContext;
let ballX = 50;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ballY = 50;
let ballSpeedX = 18;
let ballSpeedY = 16;
let player1Score = 0;
let player2Score = 0;
const WINNING_SCORE = 3;
let showingWinScreen = false;
let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_THICKNESS = 14;
const PADDLE_HEIGHT = 130;

// Set Up Functions

// Function to Calculate Mouse Position
function calculateMousePos(e) {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    let mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

// Function to Handle Mouse Click
function handleMouseClick(e) {
    if (showingWinScreen) {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
}

// Load the Object
window.onload = () => {
    canvas = document.getElementById('gamecanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function () {
        moveEverything();
        drawEverything();
    }, 1000 / framesPerSecond);

    canvas.addEventListener('mousedown',handleMouseClick);
    canvas.addEventListener('mousemove',function(e) {
        let mousePos = calculateMousePos(e);
        paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
    });
};

// Function to Reset Ball
function ballReset() {
    if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
        showingWinScreen = true;
    }

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}
