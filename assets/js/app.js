document.getElementById('motion').onclick = requestMotionPermission;

let deltaX, deltaY;
const w =window.innerWidth;
const h = window.innerHeight;
const beginX = w /2;
const beginY = h/2;
function setup() {
  createCanvas(w, h);
}

function draw() {
  background(252, 228, 204);
  fill(255);
  strokeWeight(1.5);
  fill(255);
  circle(beginX-50, beginY, ball.size + 10);
  
  ball.show();
  angleMode(DEGREES);
  deltaX =  map(rotationX, -30, 30, -10, 10);
  deltaY = map(rotationY, -30, 30, -10, 10);
  ball.move(deltaX,deltaY);
  fill(0);
  textAlign(CENTER);

 // text("(" + rotationX + " , "+ rotationY + ")", w/2,15);
}

class Ball{
  constructor(x,y,s,c){
    this.x = x;
    this.y = y;
    this.size = s;
    this.color= c;
  }
  
  show(){
    push();
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.size);
    pop();
  }

  move(xOff,yOff){
    
    this.x += xOff;
    this.y -= yOff;
    let r = this.size/2;
    if(this.x - r < 0){
        this.x = 0 + r;
    }
    if(this.x + r > width ){
      this.x = width - r;
    }
    if(this.y - r < 0){
      this.y = 0  +r;
    }
    if(this.y + r > height ){
      this.y = height - r;
    }
    
    
  }
}

const ball = new Ball(beginX,beginY,70,"#ff8e0d");