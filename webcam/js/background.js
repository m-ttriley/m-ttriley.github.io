var capture;
var c = 0;
var width, height;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  capture = createCapture(VIDEO);
  capture.size(width, height);
  background(255);
  capture.hide();
}

function draw() {
  for(var i=0; i< width; i += (width/50)) {
    for(var j=0; j<height; j += (height/50)) {
        image(capture, i, j, (width / 50), (height / 50));
    };
  };

  //filter('THRESHOLD', Math.random());
}

function randomNum(min, max) {
	return Math.floor((Math.random() * max) + min);
}
