let ball, floor;

function setup() {
	new Canvas(238, 200);
	world.gravity.y = 10;

	ball = new Sprite();
	ball.diameter = 50;
	ball.y = 30;

	floor = new Sprite();
	floor.y = 190;
	floor.w = 238;
	floor.h = 5;
	floor.collider = 'static';
}

function draw() {
	clear();
}