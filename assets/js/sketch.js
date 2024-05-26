let ball, floor;

function setup() {
	new Canvas(1080, 1920);
	world.gravity.y = 10;
	ball = new Sprite(40, 30, 50);
	firstFloor = new Sprite(30, 50, [[60, 20], [90, -9], [90, 9]], 's');
	secondFloor = new Sprite(250, 155, 500, 5, 'static');
}

function draw() {
	clear();
	ball.moveTowards(mouse);
}