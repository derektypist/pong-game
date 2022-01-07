// Set Up Global Variables and Constants
const canvas = document.getElementsByTagName('canvas')[0];
let canvasContext;
let ballX = 50;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ballY = 50;
let ballSpeexX = 18;
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