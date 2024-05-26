let ball, floor;

function setup() {
	new Canvas(1080, 1920);
	world.gravity.y = 10;
	ball = new Sprite(40, 30, 50);
	firstFloor = new Sprite(40, 155, 80, 5, 'static');
	secondFloor = new Sprite(40, 155, 80, 5, 'static');
}

function draw() {
	clear();
}