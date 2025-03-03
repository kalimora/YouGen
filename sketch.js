let face = {
  lips: {
    size: 60,
    curve: 0,
    yOffset: 30,
    color: [200, 100, 100], // Default color
    curveIntensity: 0
  },
  nose: {
    overallSize: 30, 
    bridgeLength: 15,
    nostrilSize: 5, 
    hairy: false, 
    noseHeadSize: 10, 
    shape: 'round'
  },
  eyes: {
    pupilColor: [0, 0, 0], 
    pupilSize: 4, // Size of the pupil
    eyeSize: 24, // Size of the eyes
    eyelashLength: 5, // Length of eyelashes
    eyelashCount: 5, // Number of eyelashes
    eyeBags: true, // Presence of eye bags
    openness: 1, // (range 0 - 1)
  lookingDirection: 0 // Direction they are looking (angle in degrees)
  },
  eyebrows: {
    eyebrowLength: 30, // Length of eyebrows
    eyebrowWidth: 15, // Distance between eyebrows
    eyebrowHeight: -15, // Height position of the eyebrows
    eyebrowCurve: 5, // Curve/Angle of the eyebrows
    thickness: 2 // Thickness of eyebrows
  },
  ears: {},
  hair: {},
  skin: {
    skinColor: [255, 204, 153] // Default skin color
  },
  faceShape: {
    faceWidth: 100,
    faceHeight: 140,
    chinAngle: 0
  },
  makeup: {},
  piercings: {}
};

function setup() {
  createCanvas(600, 600);
  background(255);

  // Setup buttons for each feature
  
  let lipsButton = createButton('Lips');
  lipsButton.position(450, 50);
  lipsButton.mousePressed(() => randomizeFeature('lips'));

  let eyesButton = createButton('Eyes');
  eyesButton.position(450, 80);
  eyesButton.mousePressed(() => randomizeFeature('eyes'));
  
  let eyebrowsButton = createButton("Eyebrows");
  eyebrowsButton.position(450, 110);
  eyebrowsButton.mousePressed(() => randomizeFeature("eyebrows"));
  
  let noseButton = createButton('Nose');
  noseButton.position(450, 140);
  noseButton.mousePressed(() => randomizeFeature('nose'));
  
  let faceShapeButton = createButton("Face Shape");
  faceShapeButton.position(450, 170);
  faceShapeButton.mousePressed(() => randomizeFeature("faceShape"));
  
  let skinButton = createButton("Skin");
  skinButton.position(450, 200);
  skinButton.mousePressed(() => randomizeFeature("skin"));

}

// ------------------- DRAWING ------------------------------------

function draw() {
  background(255);
  drawFace();
}

// Draw face with all features
function drawFace() {
  drawFaceShape();
  drawLips();
  drawNose();
  drawEyes();
  drawEyebrows();
  // Call the other features here
}

// DRAW LIPS
function drawLips() {
  let xCenter = width / 2;
  let yCenter = height / 2 + face.lips.yOffset;
  let lipWidth = face.lips.size;
  let lipHeight = face.lips.size / 2;
  let curveIntensity = face.lips.curveIntensity * lipHeight / 2; // Adjusting the intensity

  if (face.lips.color && face.lips.color.length === 3) {
    fill(face.lips.color[0], face.lips.color[1], face.lips.color[2]);
    noStroke();

    // Top lip with cupid's bow and adjustable curve
    beginShape();
    vertex(xCenter - lipWidth / 2, yCenter);
    bezierVertex(xCenter - lipWidth / 4, yCenter - lipHeight / 4 - curveIntensity, xCenter - lipWidth / 8, yCenter - lipHeight / 2, xCenter, yCenter - lipHeight / 4 - curveIntensity);
    bezierVertex(xCenter + lipWidth / 8, yCenter - lipHeight / 2, xCenter + lipWidth / 4, yCenter - lipHeight / 4 - curveIntensity, xCenter + lipWidth / 2, yCenter);
    endShape();

    // Bottom lip
    beginShape();
    vertex(xCenter - lipWidth / 2, yCenter);
    bezierVertex(xCenter - lipWidth / 3, yCenter + lipHeight / 2 + curveIntensity, xCenter + lipWidth / 3, yCenter + lipHeight / 2 + curveIntensity, xCenter + lipWidth / 2, yCenter);
    endShape(CLOSE);
  }
}

// DRAW EYES
function drawEyes() {
    let xCenter = width / 2;
    let yCenter = height / 3 + face.lips.yOffset + 40; 

    fill(255); // Eye white color
    noStroke(); 

    for (let i = -1; i <= 1; i += 2) { // Left (-1) and right (1) eye
        let eyeX = xCenter + i * 30; // Horizontal position of each eye

        // Outermost eye circle 
        stroke(0);
        strokeWeight(1);
        ellipse(eyeX, yCenter, face.eyes.eyeSize + 2, face.eyes.eyeSize * face.eyes.openness + 2);

        // Main eye white
        noStroke();
        fill(255);
        ellipse(eyeX, yCenter, face.eyes.eyeSize, face.eyes.eyeSize * face.eyes.openness);

        // Draw pupil
        fill(face.eyes.pupilColor);
        let pupilX = eyeX + face.eyes.lookingDirection * 2; // Adjust pupil direction more subtly
        ellipse(pupilX, yCenter, face.eyes.pupilSize, face.eyes.pupilSize * face.eyes.openness);

        // Add highlights
        fill(255); // White highlight
        ellipse(pupilX - 2, yCenter - 2, face.eyes.pupilSize / 3, face.eyes.pupilSize / 3);

        // Eyelashes
        if (face.eyes.eyelashLength > 0) {
            stroke(0);
            strokeWeight(1.5); 
            let angleOffset = -PI / 1.7; // Starting angle at the top of the eye
            for (let j = 0; j < face.eyes.eyelashCount; j++) {
                let angle = angleOffset + (PI / 6) * j / (face.eyes.eyelashCount - 1);
                let lashStartX = eyeX + (face.eyes.eyeSize / 2 + 1) * cos(angle);
                let lashStartY = yCenter + (face.eyes.eyeSize / 2 + 1) * sin(angle) * face.eyes.openness;
                let lashEndX = lashStartX + face.eyes.eyelashLength * cos(angle + PI / 16);
                let lashEndY = lashStartY + face.eyes.eyelashLength * sin(angle + PI / 16); // Modify to arc upwards
                line(lashStartX, lashStartY, lashEndX, lashEndY);
            }
        }

        // Optional: Soften eye bags
        if (face.eyes.eyeBags) {
            noFill();
            stroke(200, 100, 100); // Lighter color for eye bags
            strokeWeight(0.5);
            arc(eyeX, yCenter + 12, face.eyes.eyeSize * 0.7, face.eyes.eyeSize * 0.2, 0, PI);
        }
    }
}

// DRAW EYEBROWS
function drawEyebrows() {
  let xCenter = width / 2;
  let yCenter = height / 3 + face.lips.yOffset;

  stroke(0); // Eyebrow color (Black for now)
  strokeWeight(face.eyebrows.thickness);
  noFill();

  let eyebrowWidth = face.eyebrows.eyebrowWidth;
  let eyebrowHeight = face.eyebrows.eyebrowHeight;
  let eyebrowLength = face.eyebrows.eyebrowLength;

  // Inner point of the eyebrows (Closer to the nose)
  let innerPoint = [eyebrowWidth, eyebrowHeight];
  // Outer point of the eyebrows (Further from the nose)
  let outerPoint = [eyebrowWidth + eyebrowLength, eyebrowHeight];

  for (let i = -1; i <= 1; i += 2) { // Left (-1) and right (1)
    let innerX = xCenter + i * innerPoint[0]; // Closer to the nose
    let innerY = yCenter - innerPoint[1]; 

    let outerX = xCenter + i * outerPoint[0]; // Further from the nose
    let outerY = yCenter - outerPoint[1];

    let controlX = (innerX + outerX) / 2; // Midpoint control for curve
    let controlY = min(innerY, outerY) - face.eyebrows.eyebrowCurve; // Curve

    beginShape();
    vertex(innerX, innerY); // Start at inner eyebrow
    bezierVertex(controlX, controlY, controlX, controlY, outerX, outerY); // Curve the eyebrow
    endShape();
  }
}

// DRAW NOSE
function drawNose() {
  let xCenter = width / 2;
  let yCenter = height / 2.15;
  
  // Adjust the yCenter for drawing the nose based on face dimensions
  yCenter += face.lips.yOffset / 2; // Adjust this value as needed to position the nose correctly relative to the lips

  // Nose Bridge
  let bridgeTopY = yCenter - face.nose.bridgeLength;
  line(xCenter, yCenter, xCenter, bridgeTopY); // Draw the bridge

  // Nose Head (using ellipse for simplicity)
  ellipse(xCenter, yCenter, face.nose.noseHeadSize, face.nose.overallSize);

  // Nostrils
  ellipse(xCenter - face.nose.nostrilSize, yCenter + 2, face.nose.nostrilSize, face.nose.nostrilSize / 2);
  ellipse(xCenter + face.nose.nostrilSize, yCenter + 2, face.nose.nostrilSize, face.nose.nostrilSize / 2);

  // Optional!! Draw hairy nostrils
  if (face.nose.hairy) {
    stroke(0); // Black hair
    for (let i = 0; i < 5; i++) { // Draw 5 hairs for each nostril
      line(xCenter - face.nose.nostrilSize + i, yCenter + 4, xCenter - face.nose.nostrilSize + i, yCenter + 6);
      line(xCenter + face.nose.nostrilSize - i, yCenter + 4, xCenter + face.nose.nostrilSize - i, yCenter + 6);
    }
  }
}

// DRAW FACE SHAPE
function drawFaceShape() {
  push();
  translate(width / 2, height / 2);

  let faceWidth = face.faceShape.faceWidth;
  let faceHeight = face.faceShape.faceHeight;
  let chinAngle = face.faceShape.chinAngle;
  let topWidth = faceWidth * 1.1; // Slightly wider at the top
  let chinWidth = faceWidth * 0.8; // Slightly narrower at the chin
  
  // Adds skin color feature to the face
  let skinColor = face.skin.skinColor;
  fill(skinColor);
  noStroke();
  
  beginShape();
  
  vertex(-topWidth / 2, -faceHeight / 2);
  
  // Top head curve
  bezierVertex(
    0, -faceHeight / 2 - 20, // Control point 1 (above the center)
    0, -faceHeight / 2 - 20, // Control point 2 (above the center)
    topWidth / 2, -faceHeight / 2 // Top right
  );
  
  // Right cheek curve
  bezierVertex(
    topWidth * 0.6, -faceWidth * 0.3, // Control point 1
    chinWidth * 0.7, faceWidth * 0.3, // Control point 2
    chinWidth / 2, faceHeight / 2 + chinAngle // Chin right
  );
  
  // Chin curve
  bezierVertex(
    0, faceHeight / 2 + chinAngle + 15,  // Control point 1 (Bottom center)
    0, faceHeight / 2 + chinAngle + 15,  // Control point 2 (Bottom center)
    -chinWidth / 2, faceHeight / 2 + chinAngle // Chin left
  );
  
  // Left cheek curve
  bezierVertex(
    -chinWidth * 0.7, faceHeight * 0.3, // Control point 1
    -topWidth * 0.6, -faceHeight * 0.3, // Control point 2
    -topWidth / 2, -faceHeight / 2 // Back to top left
  );
  
  endShape(CLOSE);
  pop();
}

// ------------------- RANDOMIZING --------------------------------

// RANDOMIZE LIPS
function randomizeLips() {
  face.lips.size = random(40, 80);
  face.lips.curveIntensity = random(-1, 1); // Randomize the curve intensity
  face.lips.yOffset = random(20, 40);
  face.lips.color = [random(200, 255), random(100, 150), random(100, 150)];
}

// RANDOMIZE EYES
function randomizeEyes() {
  face.eyes.pupilColor = [random(0, 255), random(0, 255), random(0, 255)];
  face.eyes.pupilSize = random(3, 7);
  face.eyes.eyeSize = random(20, 30);
  face.eyes.eyelashLength = random(3, 10);
  face.eyes.eyelashCount = round(random(3, 10));
  face.eyes.eyeBags = random([true, false]);
  face.eyes.openness = random(0.5, 1);
  face.eyes.lookingDirection = random(-5, 5); // In pixels, not degrees for simplicity
}

// RANDOMIZE EYEBROWS
function randomizeEyebrows() {
  face.eyebrows.eyebrowLength = random(50);
  face.eyebrows.eyebrowWidth = random(10, 20);
  face.eyebrows.eyebrowHeight = random(-25, 0);
  face.eyebrows.eyebrowCurve = random(-10, 20);
  face.eyebrows.thickness = random(5.0);
}

// RANDOMIZE NOSE
function randomizeNose() {
  face.nose.overallSize = random(20, 40);
  face.nose.bridgeLength = random(10, 20);
  face.nose.nostrilSize = random(3, 7);
  face.nose.hairy = random([true, false]);
  face.nose.noseHeadSize = random(8, 12);
  face.nose.shape = random(['round', 'pointed', 'wide']); // Add more shapes as needed
}

// RANDOMIZE FACE SHAPE
function randomizeFaceShape() {
  face.faceShape.faceWidth = random(80, 150);
  face.faceShape.faceHeight = random(80, 180);
  face.faceShape.chinAngle = random(-20, 20);
}

// RANDOMIZE SKIN
function randomizeSkin() {
  face.skin.skinColor = [random(255), random(255), random(255)];
}

// Randomize the given face feature
function randomizeFeature(feature) {
  if (feature === 'lips') {
    randomizeLips();
  } else if (feature === 'eyes') {
    randomizeEyes();
  } else if(feature === "eyebrows") {
    randomizeEyebrows();        
  } else if (feature === 'nose') {
    randomizeNose();
  } else if (feature === "faceShape") {
    randomizeFaceShape();
  } else if (feature === "skin") {
    randomizeSkin();
  }
  console.log(`Randomized ${feature}`);
}