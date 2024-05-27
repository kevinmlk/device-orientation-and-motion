let deltaX, deltaY;
const ballSize = 70;
let ball;
const platformHeight = 20;
const platformY = 3 * (window.innerHeight / 4);
const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  createCanvas(w, h);
  ball = new Ball(w / 2, platformY - ballSize / 2, ballSize, "#ff8e0d");
}

function draw() {
  background(252, 228, 204);
  
  // Show the platform
  fill(100);
  rect(0, platformY, w, platformHeight);
  
  // Show the ball
  ball.show();
  
  // Map the device orientation values to ball movement
  deltaX = map(rotationY, -90, 90, -10, 10);
  deltaY = map(rotationX, -90, 90, -10, 10);
  
  // Move the ball
  ball.move(deltaX, deltaY);
  
  // Check if the ball is on the platform
  if (ball.y + ball.size / 2 >= platformY && ball.y + ball.size / 2 <= platformY + platformHeight) {
    // Ball is on the platform
    ball.isOnPlatform = true;
  } else {
    // Ball is off the platform
    ball.isOnPlatform = false;
  }
  
  // If the ball falls off the platform, reset its position
  if (!ball.isOnPlatform) {
    ball.y = platformY - ball.size / 2;
  }
}

class Ball {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.isOnPlatform = true;
  }
  
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  move(xOff, yOff) {
    if (!this.isOnPlatform) {
      // If the ball is off the platform, apply gravity
      yOff += 0.5;
    }
    
    this.x += xOff;
    this.y += yOff;
    
    // Ensure the ball stays within the canvas bounds
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}
