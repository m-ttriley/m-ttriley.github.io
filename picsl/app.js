var i = 0;
var j = 0;
var done = false;
var ready = false;
// Create a raster item using the image tag with id='mona'
var raster = new Raster('original');

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 8;

// Space the cells by 120%:
var spacing = 1.2;

var current = 1;
var count = 60 * 60;
var temp;

// As the web is asynchronous, we need to wait for the raster to load
// before we can perform any operation on its pixels.
raster.on('load', function() {


    raster.size = new Size(60, 60);

    for (var y = 0; y < raster.height; y++) {
        for(var x = 0; x < raster.width; x++) {
            // Get the color of the pixel:
            var color = raster.getPixel(x, y);

            // Create a circle shaped path:

            var path = new Path.Circle({
                center: new Point(x, y) * gridSize,
                radius: gridSize / 2 / spacing
            });

            // Set the fill color of the path to the color
            // of the pixel:
            path.fillColor = color;
        }
    }

    // Move the active layer to the center of the view, so all 
    // the created paths in it appear centered.
    project.activeLayer.position = view.center;
    ready = true;
});

// Move the active layer to the center of the view:
project.activeLayer.position = view.center;
function onFrame(event) {
    // console.log(event.count);
    if(ready) {
        for(var i = 0; i < count; i++) {
            if(current <= count - 1) {
                var item = project.activeLayer.children[current];
                var nextitem = project.activeLayer.children[current + 1];
                if (item.fillColor.hue > nextitem.fillColor.hue) {
                    swap(item, nextitem);
                }
                current = current + 1;
            }
            else {
                current = 1;
            }
        }
    }
}

function swap(first, second) {
    var temp = first.fillColor;
    first.fillColor = second.fillColor;
    second.fillColor = temp;
}