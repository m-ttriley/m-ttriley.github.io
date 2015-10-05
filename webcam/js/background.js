var capture;


function setup() {
	var width = window.innerWidth;
	var height = window.innerHeight;
  createCanvas(width, height);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
}

function draw() {
	var width = window.innerWidth;
	var height = window.innerHeight;
  background(255);
  image(capture, 0, 0, width, height);
  loadPixels();
  	for(var i = 0; i < 2; i++) {
  		var c = get(randomNum(0, width), randomNum(0, height), randomNum(0, width) + 100, randomNum(0, height) + 100);
  		set(randomNum(0, width), randomNum(0, height), c);
  	}
  updatePixels();
  filter('THRESHOLD', 0.1);
}

function randomNum(min, max) {
	return Math.floor((Math.random() * max) + min);
}
