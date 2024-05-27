let deltaX, deltaY;
const ballSize = 70;
let ball;
const platformHeight = 20; // Height of the platform
const platformY = 3 * (window.innerHeight / 4); // Y-coordinate of the platform
let platformWidth; // Width of the platform
const gapWidth = 100; // Width of the gap
const gravity = 0.5; // Gravity strength
const initialBallX = 100; // Initial X-coordinate of the ball
const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  // Initialize the platform width
  platformWidth = min(w - 200, 800); // Adjust the maximum width as needed
  
  createCanvas(w, h);
  
  // Initialize the ball on the left side of the platform
  ball = new Ball(initialBallX, platformY - ballSize / 2, ballSize, "#ff8e0d");
}

function draw() {
  background(252, 228, 204);
  
  // Show the left half of the platform
  fill(100);
  rect(0, platformY, platformWidth / 2 - gapWidth / 2, platformHeight);
  
  // Show the right half of the platform
  rect(platformWidth / 2 + gapWidth / 2, platformY, platformWidth / 2 - gapWidth / 2, platformHeight);
  
  // Show the gap
  fill(252, 228, 204);
  rect(platformWidth / 2 - gapWidth / 2, platformY, gapWidth, platformHeight);
  
  // Show the ball
  ball.show();
  
  // Map the device orientation values to ball movement
  deltaX = map(rotationY, -90, 90, -10, 10);
  deltaY = map(rotationX, -90, 90, -10, 10);
  
  // Move the ball
  ball.move(deltaX, deltaY);
  
  // Apply gravity to the ball
  ball.applyGravity();
  
  // Check if the ball falls through the gap
  if (ball.isOverGap(platformWidth, gapWidth)) {
    // Reset the ball's position to the initial position
    ball.x = initialBallX;
    ball.y = platformY - ballSize / 2;
  }
}

class Ball {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocityY = 0; // Initial vertical velocity
  }
  
  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  move(xOff, yOff) {
    this.x += xOff;
    this.y += yOff;
    
    // Ensure the ball stays within the canvas bounds
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
  
  isOnPlatform() {
    // Check if the ball is on the platform
    return this.y + this.size / 2 >= platformY;
  }
  
  applyGravity() {
    // Apply gravity to the ball
    if (!this.isOnPlatform()) {
      this.y += this.velocityY;
      this.velocityY += gravity;
      
      // If the ball reaches the bottom, stop it and bounce it back up a little
      if (this.y + this.size / 2 >= height) {
        this.y = height - this.size / 2;
        this.velocityY *= -0.5;
      }
    }
  }
  
  isOverGap(platformWidth, gapWidth) {
    return this.x >= platformWidth / 2 - gapWidth / 2 && this.x <= platformWidth / 2 + gapWidth / 2 &&
           this.y + this.size / 2 >= platformY;
  }
}
