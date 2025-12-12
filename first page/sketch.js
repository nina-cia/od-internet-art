let imgs = [];
let numRows = 8; // increased from 6 to 10 (adds 4 more rows)
let numCols = 8;  // number of squares horizontally
let squareSize;
let colorPalette = [];

function preload() {
  // Load 4 different images
  imgs[0] = loadImage('bottom1.png');   // PUT IMAGE LINK HERE
  imgs[1] = loadImage('bottom2.png');   // PUT IMAGE LINK HERE
  imgs[2] = loadImage('shoe1.png'); // PUT IMAGE LINK HERE
  imgs[3] = loadImage('shoe2.png');  // PUT IMAGE LINK HERE
  imgs[4] = loadImage('top1.png');  // PUT IMAGE LINK HERE
  imgs[5] = loadImage('top2.png');  // PUT IMAGE LINK HERE
}

function setup() {
  createCanvas(2100, 2100);
  noLoop();
  squareSize = width / numCols;
  imageMode(CENTER);
}

function draw() {
  background(255, 133, 198);

  // Randomize image order
  shuffle(imgs, true);

  // Build a color palette from random pixels in the images
  generatePalette();

  // --- 1. Draw evenly spaced square cutouts (with extra rows) ---
  for (let y = 0; y < numRows; y++) {
    for (let x = 0; x < numCols; x++) {
      let img = random(imgs);
      let sx = random(img.width - squareSize);
      let sy = random(img.height - squareSize);

      let dx = x * squareSize + squareSize / 2;
      let dy = y * squareSize + squareSize / 2;

      image(
        img,
        dx, dy, squareSize, squareSize,
        sx, sy, squareSize, squareSize
      );
    }
  }

  // --- 2. Overlay random color-based shapes with varying transparency ---
  drawRandomShapesWithTransparency();

  // --- 3. Add random long, thin line shapes using color palette ---
  drawRandomLines();
}

// --- Build a color palette from random image pixels ---
function generatePalette() {
  colorPalette = [];
  for (let img of imgs) {
    img.loadPixels();
    for (let i = 0; i < 25; i++) { // 25 samples per image
      let x = int(random(img.width));
      let y = int(random(img.height));
      let c = img.get(x, y);
      colorPalette.push(c);
    }
  }
}

// --- Draw random shapes with varying transparency ---
function drawRandomShapesWithTransparency() {
  let numShapes = int(random(500, 800)); // random number of shapes

  for (let i = 0; i < numShapes; i++) {
    let c = color(random(colorPalette));
    let alpha = random(40, 180); // transparency range
    c.setAlpha(alpha);
    fill(c);
    noStroke();

    let x = random(width);
    let y = random(height);
    let size = random(30, 50);
    let shapeType = int(random(3)); // 0 = circle, 1 = triangle, 2 = polygon

    push();
    translate(x, y);

    if (shapeType === 0) {
      ellipse(0, 0, size, size);
    } else if (shapeType === 1) {
      triangle(
        -size / 2, size / 2,
        0, -size / 2,
        size / 2, size / 2
      );
    } else {
      beginShape();
      let sides = int(random(4, 8));
      for (let j = 0; j < sides; j++) {
        let angle = TWO_PI / sides * j;
        let px = cos(angle) * size * 0.5;
        let py = sin(angle) * size * 0.5;
        vertex(px, py);
      }
      endShape(CLOSE);
    }

    pop();
  }
}

// --- Draw long, thin lines using color palette and varying opacity ---
function drawRandomLines() {
  let numLines = int(random(50, 100)); // number of long lines

  for (let i = 0; i < numLines; i++) {
    let c = color(random(colorPalette));
    let alpha = random(40, 200); // transparency range
    c.setAlpha(alpha);

    stroke(c);
    strokeWeight(random(2, 6));

    // pick two random points across the canvas
    let x1 = random(width);
    let y1 = random(height);
    let x2 = random(width);
    let y2 = random(height);

    // randomly constrain some lines to be more horizontal or vertical
    if (random() < 0.3) {
      y2 = y1 + random(-50, 50);
      x2 = width;
    } else if (random() < 0.6) {
      x2 = x1 + random(-50, 50);
      y2 = height;
    }

    line(x1, y1, x2, y2);
  }
}