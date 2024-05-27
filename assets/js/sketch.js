document.getElementById('motion').onclick = requestMotionPermission;

let deltaX, deltaY;
const w = window.innerWidth;
const h = window.innerHeight;
const beginX = w / 2;
const beginY = h / 2;

let goalX, goalY, goalWidth, goalHeight, goalArmWidth;
let goalReached = false;

function setup() {
  createCanvas(w, h);
  goalX = width / 2 - 50;
  goalY = height - 50;
  goalWidth = 100;
  goalHeight = 20;
  goalArmWidth = 20;
}

function draw() {
  background(255, 205, 0, .5);
  drawGoal();
  
  if (!goalReached) {
    ball.show();
    angleMode(DEGREES);
    deltaX = map(rotationX, -30, 30, -10, 10);
    deltaY = map(rotationY, -30, 30, -10, 10);
    ball.move(deltaX, deltaY);
    checkGoal();
  } else {
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("GOAL!", width / 2, height / 2);
  }
}

class Ball {
  constructor(x, y, s, c) {
    this.x = x;
    this.y = y;
    this.size = s;
    this.color = c;
  }
  
  show() {
    push();
    noStroke();
    fill(this.color);
    circle(this.x, this.y, this.size);
    pop();
  }

  move(xOff, yOff) {
    this.x += xOff;
    this.y -= yOff;
    let r = this.size / 2;
    if (this.x - r < 0) {
      this.x = 0 + r;
    }
    if (this.x + r > width) {
      this.x = width - r;
    }
    if (this.y - r < 0) {
      this.y = 0 + r;
    }
    if (this.y + r > height) {
      this.y = height - r;
    }
    // Check if the ball hits the goal
    if (this.y + r > goalY && this.y - r < goalY + goalHeight && this.x + r > goalX + goalArmWidth && this.x - r < goalX + goalWidth - goalArmWidth) {
      // Prevent the ball from passing through the goal
      if (this.y + r > goalY && this.y - r < goalY + goalHeight) {
        if (this.x < goalX + goalArmWidth || this.x > goalX + goalWidth - goalArmWidth) {
          this.y = constrain(this.y, 0 + r, goalY - r);
        }
      }
      goalReached = true;
    }
  }
}

const ball = new Ball(beginX, beginY, 70, "#C8102E");

function drawGoal() {
  fill(45, 41, 38);
  // Goal arms
  rect(goalX, goalY, goalArmWidth, goalHeight);
  rect(goalX + goalWidth - goalArmWidth, goalY, goalArmWidth, goalHeight);
  // Goal base
  rect(goalX + goalArmWidth, goalY + goalHeight - 5, goalWidth - 2 * goalArmWidth, 5);
}

// Function to check if the ball hits the goal
function checkGoal() {
  let ballTop = ball.y - ball.size / 2;
  let ballBottom = ball.y + ball.size / 2;
  let ballLeft = ball.x - ball.size / 2;
  let ballRight = ball.x + ball.size / 2;

  if (ballBottom >= goalY && ballTop <= goalY + goalHeight && ballLeft >= goalX + goalArmWidth && ballRight <= goalX + goalWidth - goalArmWidth) {
    console.log("Goal scored!");
    goalReached = true;
    ball.color = color(255, 255, 255, 0);
  }
}
