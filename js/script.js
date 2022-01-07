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
window.onload = function() {
    canvas = document.getElementById('gamecanvas');
    canvasContext = canvas.getContext('2d');
    let framesPerSecond = 30;
    setInterval(function() {
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

// Function to Perform Computer Movement
function computerMovement() {
    let paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY - 35) {
        paddle2Y += 60;
    } else if (paddle2YCenter > ballY + 35) {
        paddle2Y -= 60;
    }
}

// Function to Move Everything
function moveEverything() {
    if (showingWinScreen) {
        return;
    }

    computerMovement();
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = - ballSpeedX;
            let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player2Score++;
            ballReset();
        }
    }

    if (ballX > canvas.width) {
        if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1Score++;
            ballReset();
        }
    }

    if (ballY < 0) {
        ballSpeedY = - ballSpeedY;
    }

    if (ballY > canvas.height) {
        ballSpeedY = - ballSpeedY;
    }
}

// Function to Draw Net
function drawNet() {
    for (let i=0;i<canvas.height;i+=40) {
        colorRect(canvas.width/2-1,i,2,20,'white');
    }
}

// Function to Draw Everything
function drawEverything() {
    // Blank Out the Screen with Canvas Color
    colorRect(0,0,canvas.width,canvas.height,'#34568B');

    if (showingWinScreen) {
        canvasContext.fillStyle = 'white';
        canvasContext.textAlign = 'center';
        if (player1Score >= WINNING_SCORE) {
            canvasContext.font = '50px Roboto';
            canvasContext.fillText('You won',canvas.width/2,canvas.height/2);
        } else if (player2Score >= WINNING_SCORE) {
            canvasContext.font = '50px Roboto';
            canvasContext.fillText('Computer won',canvas.width/2,canvas.height/2); 
        }
        canvasContext.font = '40px Roboto';
        canvasContext.fillText('click to continue',canvas.width/2,500);
        return;

    }

    drawNet();

    // Left Player Paddle
    canvasContext.globalAlpha = 1;
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    // Right Player Paddle
    colorRect(canvas.width-PADDLE_THICKNESS,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

    // Draw the Ball
    colorCircle(ballX,ballY,10,'white');

    canvasContext.font = '200px Roboto';
    canvasContext.globalAlpha = 0.6;
    canvasContext.fillStyle = 'white';
    canvasContext.fillText(player1Score,150,300);
    canvasContext.fillText(player2Score,canvas.width-150,300);

}

// Function to Color Circle
function colorCircle(centerX,centerY,radius,drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.globalAlpha = 0.6;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
    canvasContext.fill();
}
