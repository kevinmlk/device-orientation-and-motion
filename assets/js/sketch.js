let deltaX, deltaY;
const ballSize = 70;
let ball;
const platformHeight = 20;
const platformY = 3 * (window.innerHeight / 4);
const rampWidth = 200;
const rampHeight = 100;
const rampAngle = 30;
let ramp1X, ramp2X;
const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  createCanvas(w, h);
  
  // Calculate X-coordinates for the ramps
  ramp1X = w / 4 - rampWidth / 2;
  ramp2X = 3 * w / 4 - rampWidth / 2;
  
  // Initialize the ball on the first ramp
  ball = new Ball(ramp1X + rampWidth / 2, platformY - ballSize / 2 - rampHeight, ballSize, "#ff8e0d");
}

function draw() {
  background(252, 228, 204);
  
  // Show the ramps
  drawRamp(ramp1X, platformY, rampWidth, rampHeight, rampAngle);
  drawRamp(ramp2X, platformY, rampWidth, rampHeight, -rampAngle);
  
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
  
  // Check if the ball is on the ramps
  const isOnRamp1 = ball.isOnRamp(ramp1X, platformY, rampWidth, rampHeight, rampAngle);
  const isOnRamp2 = ball.isOnRamp(ramp2X, platformY, rampWidth, rampHeight, -rampAngle);
  
  // If the ball is not on any of the ramps, apply gravity
  if (!isOnRamp1 && !isOnRamp2) {
    ball.applyGravity();
  }
}

class Ball {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
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
  
  isOnRamp(rx, ry, rw, rh, angle) {
    // Check if the ball is on the specified ramp
    return this.x >= rx && this.x <= rx + rw &&
           this.y >= ry - (this.x - rx) * tan(angle) &&
           this.y <= ry;
  }
  
  applyGravity() {
    // Apply simple gravity effect
    this.y += 0.5;
  }
}

function drawRamp(x, y, w, h, angle) {
  // Draw a ramp with the specified properties
  push();
  translate(x, y);
  rotate(-angle);
  fill(150);
  rect(0, 0, w, h);
  pop();
}
