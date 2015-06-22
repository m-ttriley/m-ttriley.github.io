var raster = new Raster('picture');

// Hide the raster:
raster.visible = false;

// The size of our grid cells:
var gridSize = 12;

// Space the cells by 120%:
var spacing = 1.2;

raster.position = view.center;


//tool.fixedDistance = 25;

    raster.on('load', function () {
        // Since the example image we're using is much too large,
        // and therefore has way too many pixels, lets downsize it to
        // 40 pixels wide and 30 pixels high:
        raster.size = new Size(100, 100);

        var pixelArray = run();

        for (var y = 0; y < pixelArray.length; y++) {
            for (var x = 0; x < pixelArray[1].length; x++) {
                // Get the color of the pixel:
                var color = pixelArray[y][x];

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
    });

function run() {
// init array
   var pixelArray = [];
    var vertical = [];
    for(var i = 0; i < raster.width; i++) {
        for(var j = 0; j < raster.height; j++) {
            pixelArray[i] = new Array(j);
            vertical[i] = new Array(j);
        }
    }
// putting pixel values in array

    for(var i = 0; i < raster.width; i++) {
        for(var j = 0; j< raster.height; j++) {
            pixelArray[i][j] = raster.getPixel(i, j);
        }
    }


// SORTING PIXEL ARRAY
    for (var i = 0; i < pixelArray.length; i++) {
        pixelArray[i] = mergeSort(pixelArray[i]);
    }


    for (var i = 0; i< pixelArray.length; i++) {
        for(var j = 0; j < pixelArray[i].length; j++) {
            vertical[i][j] = pixelArray[j][i];
        }
    }

    for (var i = 0; i < vertical.length; i++) {
        vertical[i] = mergeSort(vertical[i]);
    }

    console.log(pixelArray);
    return vertical;
}

function merge(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il].hue < right[ir].hue){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}


function mergeSort(items){

    // Terminal case: 0 or 1 item arrays don't need sorting
    if (items.length < 2) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left    = items.slice(0, middle),
        right   = items.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}





