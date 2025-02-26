let face = {
  lips: {
    size: 60,
    curve: 0,
    yOffset: 30,
    color: [200, 100, 100] // Default color
  },
  // Initialize other features 
  nose: {},
  eyes: {},
  eyebrows: {},
  ears: {},
  hair: {},
  skin: {},
  faceShape: {},
  makeup: {},
  piercings: {}
};

function setup() {
  createCanvas(600, 600);
  background(255);

  // Setup buttons for each feature
  
  let lipsButton = createButton('Lips');
  lipsButton.position(450, 20);
  lipsButton.mousePressed(() => randomizeFeature('lips'));

  let eyesButton = createButton('Eyes');
  eyesButton.position(450, 50);
  eyesButton.mousePressed(() => randomizeFeature('eyes'));

}

function draw() {
  background(255);
  drawFace();
}

function drawFace() {
  drawLips();
  // Call the other features here
}

function drawLips() {
  if (face.lips.color && face.lips.color.length === 3) {
    fill(face.lips.color[0], face.lips.color[1], face.lips.color[2]);
    arc(width / 2, height / 2 + face.lips.yOffset, face.lips.size, face.lips.size / 2, 0, PI);
  }
}

function drawEyes() {
  // later prob
}

function randomizeLips() {
  face.lips.size = random(40, 80); // Randomize size
  face.lips.curve = random(-0.2, 0.2); // Randomize curve
  face.lips.yOffset = random(20, 40); // Randomize vertical offset
  face.lips.color = [random(200, 255), random(100, 150), random(100, 150)]; // Randomize color
}

function randomizeEyes() {
  // later prob
}

function randomizeFeature(feature) {
  if (feature === 'lips') {
    randomizeLips();
  } else if (feature === 'eyes') {
    randomizeEyes();
  }
  // Add cases for other features as you implement them
  
  console.log(`Randomized ${feature}`);
}
