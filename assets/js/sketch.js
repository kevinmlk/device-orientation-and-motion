document.getElementById('motion').onclick = requestMotionPermission;

let deltaX, deltaY;
const ballSize = 70;
let ball;
const w = window.innerWidth;
const h = window.innerHeight;

function setup() {
  createCanvas(w, h);
  ball = new Ball(w / 2, h / 2, ballSize, "#ff8e0d");
}

function draw() {
  background(252, 228, 204);
  
  // Show the ball
  ball.show();
  
  // Map the device orientation values to ball movement
  deltaX = map(rotationY, -90, 90, -10, 10);
  deltaY = map(rotationX, -90, 90, -10, 10);
  
  // Move the ball
  ball.move(deltaX, deltaY);
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
}
