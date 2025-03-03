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
  hair: {
    hairType: "straight", // Default type
    hairColor: [50, 30, 20], // Default hair color (brown)
    hairLength: 50, // Default length
    hairVolume: 40, // Default volume
    hairParting: "center" // Default parting
  },
  skin: {
    skinColor: [255, 204, 153] // Default skin color
  },
  faceShape: {
    faceWidth: 100,
    faceHeight: 140,
    chinAngle: 0
  },
  makeup: {
    enabled: false, // Toggle for makeup
    eyeshadowColor: [0, 0, 0], // Default (will be randomized)
    blushColor: [0, 0, 0], 
    lipstickColor: [0, 0, 0]
  },
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

  let hairButton = createButton("Hair");
  hairButton.position(450, 230);
  hairButton.mousePressed(() => randomizeFeature("hair"));

  let makeupButton = createButton("Toggle Makeup");
  makeupButton.position(450, 260);
  makeupButton.mousePressed(() => {
    face.makeup.enabled = !face.makeup.enabled; // Toggle makeup on/off
    redraw(); // Redraw the face
  });

}

// ------------------- DRAWING ------------------------------------

function draw() {
  background(255);
  drawFace();
}

// Draw face with all features
function drawFace() {
  drawHair();
  drawFaceShape();
  if (face.makeup.enabled) {
    drawMakeup();
  }                        // Only show makeup if enabled
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

// DRAW HAIR
function drawHair() {
  let xCenter = width / 2;
  let yCenter = height / 2 - face.faceShape.faceHeight / 2 - 20;        // Place hair on top of the head

  // Make sure hair has a color, otherwise use default brown
  if (!face.hair.hairColor || face.hair.hairColor.length < 3) {
    face.hair.hairColor = [50, 30, 20];
  }

  fill(face.hair.hairColor[0], face.hair.hairColor[1], face.hair.hairColor[2]);
  noStroke();

  let hairLength = face.hair.hairLength * 1.5;                          // Adjust length
  let hairVolume = face.hair.hairVolume * 1.2;                          // Adjust width
  let hairDensity = face.hair.hairDensity;                              // How thick the hair is

  // The closer the spacing, the denser the hair
  let strandSpacing = map(hairDensity, 0.5, 2, 15, 5); 
  let curlSpacing = map(hairDensity, 0.5, 2, 20, 10);
  let afroSpacing = map(hairDensity, 0.5, 2, 20, 8);
  let spikeSpacing = map(hairDensity, 0.5, 2, 15, 7);

  let spikeHeights = face.hair.spikeHeights || [];
  let afroOffsets = face.hair.afroOffsets || [];

  // STRAIGHT HAIR
  if (face.hair.hairType === "straight") {
    for (let i = -hairVolume / 2; i < hairVolume / 2; i += strandSpacing) {
      let hairX = xCenter + i;
      let hairY = yCenter + abs(i / 2) - 10;                            // Slight curve to follow head

      stroke(face.hair.hairColor);
      strokeWeight(map(hairDensity, 0.5, 2, 2, 5));                     // Thicker for dense hair

      // Curved strands for a more natural look
      bezier(hairX, hairY, hairX - 10, hairY + hairLength / 3, hairX + 10, hairY + (2 * hairLength) / 3, hairX, hairY + hairLength);
    }
  }

  // WAVY HAIR
  else if (face.hair.hairType === "wavy") {
    for (let i = -hairVolume / 2; i < hairVolume / 2; i += strandSpacing) {
      let hairX = xCenter + i;
      let hairY = yCenter + abs(i / 3) - 10;

      // Create loose waves
      for (let j = 0; j < hairLength; j += 15) {
        bezier(
          hairX, hairY + j,
          hairX + 8, hairY + j + 10,
          hairX - 8, hairY + j + 20,
          hairX, hairY + j + 30
        );
      }
    }
  }

  // CURLY HAIR
  else if (face.hair.hairType === "curly") {
    let offsetIndex = 0;
    for (let i = -hairVolume / 2; i < hairVolume / 2; i += curlSpacing) {
      let hairX = xCenter + i;
      let hairY = yCenter + abs(i / 4) - 10;

      for (let j = 0; j < hairLength; j += 12) {
        let stableOffset = afroOffsets[offsetIndex % afroOffsets.length] || 0;
        ellipse(hairX + stableOffset, hairY + j, 12, 12);                 // Small curls
        offsetIndex++;
      }
    }
  }

  // AFRO HAIR
  else if (face.hair.hairType === "afro") {
    let afroSize = hairVolume * 1.5;
    let offsetIndex = 0;
    for (let i = -afroSize / 2; i < afroSize / 2; i += afroSpacing) {
      for (let j = -afroSize / 2; j < afroSize / 2; j += afroSpacing) {
        let distance = dist(i, j, 0, 0);
        if (distance < afroSize / 2) { // Keep it circular
          let stableOffset = afroOffsets[offsetIndex % afroOffsets.length] || 0;
          ellipse(xCenter + i + stableOffset, yCenter + j, 16, 16);
          offsetIndex++;
        }
      }
    }
  }

  // SPIKY HAIR
  else if (face.hair.hairType === "spiky") {
    let spikeIndex = 0;
    for (let i = -hairVolume / 2; i < hairVolume / 2; i += spikeSpacing) {
      let hairX = xCenter + i;
      let hairY = yCenter - abs(i / 3) - 5;
      let spikeHeight = spikeHeights[spikeIndex % spikeHeights.length] || 30;

      triangle(
        hairX, hairY, 
        hairX - 6, hairY - spikeHeight, 
        hairX + 6, hairY - spikeHeight
      ); // Sharp spikes
      spikeIndex++;
    }
  }

  // BALD - No hair drawn
}

// ------------------- INTERACTIVITY --------------------------------
// MAKEUP
function drawMakeup() {
  if (!face.makeup.enabled) return;                               // Don't draw makeup if the toggle is OFF

  let xCenter = width / 2;

  // LIPS POSITION
  let lipY = height / 2 + face.lips.yOffset;                     // Lips are near the bottom of the face
  let lipWidth = face.lips.size;
  let lipHeight = face.lips.size / 2;
  let curveIntensity = face.lips.curveIntensity * lipHeight / 2; // Curve depth

  // EYES POSITION
  let eyeY = height / 3 + face.lips.yOffset + 32;                 // Adjusted for eye level
  let eyeWidth = face.eyes.eyeSize;
  let eyeHeight = face.eyes.eyeSize * face.eyes.openness;
  let eyeCurve = eyeHeight / 4;                                   // Controls the depth of the eyeshadow curve

  // BLUSH POSITION
  let blushY = height / 2 + 10;                                   // Higher on the cheeks, not too low

  // EYESHADOW (Aligned with the eyes)
  fill(face.makeup.eyeshadowColor);
  noStroke();
  for (let i = -1; i <= 1; i += 2) {                              // Left (-1) & Right (1) eyes
    let eyeX = xCenter + i * 30;

    beginShape();
    vertex(eyeX - eyeWidth / 2, eyeY);
    bezierVertex(
      eyeX - eyeWidth / 3, eyeY - eyeHeight / 3 - eyeCurve, 
      eyeX + eyeWidth / 3, eyeY - eyeHeight / 3 - eyeCurve, 
      eyeX + eyeWidth / 2, eyeY
    );
    bezierVertex(
      eyeX + eyeWidth / 3, eyeY - eyeHeight / 4, 
      eyeX - eyeWidth / 3, eyeY - eyeHeight / 4, 
      eyeX - eyeWidth / 2, eyeY
    );
    endShape(CLOSE);
  }

  // BLUSH (Placed on cheeks)
  fill(face.makeup.blushColor);
  ellipse(xCenter - 40, blushY, 30, 20); // Left cheek
  ellipse(xCenter + 40, blushY, 30, 20); // Right cheek

  // LIPSTICK (Traces the lips)
  fill(face.makeup.lipstickColor);
  noStroke();

  // Top Lip
  beginShape();
  vertex(xCenter - lipWidth / 2, lipY);
  bezierVertex(
    xCenter - lipWidth / 4, lipY - lipHeight / 4 - curveIntensity, 
    xCenter - lipWidth / 8, lipY - lipHeight / 2, 
    xCenter, lipY - lipHeight / 4 - curveIntensity
  );
  bezierVertex(
    xCenter + lipWidth / 8, lipY - lipHeight / 2, 
    xCenter + lipWidth / 4, lipY - lipHeight / 4 - curveIntensity, 
    xCenter + lipWidth / 2, lipY
  );
  endShape();

  // Bottom Lip
  beginShape();
  vertex(xCenter - lipWidth / 2, lipY);
  bezierVertex(
    xCenter - lipWidth / 3, lipY + lipHeight / 2 + curveIntensity, 
    xCenter + lipWidth / 3, lipY + lipHeight / 2 + curveIntensity, 
    xCenter + lipWidth / 2, lipY
  );
  endShape(CLOSE);
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

// RANDOMIZE HAIR
function randomizeHair() {
  let hairTypes = ["straight", "curly", "wavy", "spiky", "afro", "bald"];
  face.hair.hairType = random(hairTypes);
  face.hair.hairColor = [random(50, 200), random(30, 150), random(20, 100)];
  face.hair.hairLength = random(50, 200);
  face.hair.hairVolume = random(50, 120);
  face.hair.hairParting = random(["left", "right", "center"]);
  face.hair.hairDensity = random(0.5, 2); // 0.5 = sparse, 2 = very dense

  console.log("Hair type: " + face.hair.hairType);
}

function randomizeMakeup(feature) {
  if (feature === "eyes") {
    face.makeup.eyeshadowColor = [random(50, 255), random(50, 200), random(50, 200)]; // Soft pastels
  } 
  else if (feature === "lips") {
    face.makeup.lipstickColor = [random(150, 255), random(50, 100), random(50, 100)]; // Rich lip colors
  } 
  else if (feature === "skin") {
    face.makeup.blushColor = [random(200, 100, 150), random(50, 100), random(50, 100)]; // Warm blush tones
  }
}


// Randomize the given face feature
function randomizeFeature(feature) {
  if (feature === 'lips') {
    randomizeLips();
    randomizeMakeup('lips');                          // Makeup (lipstick) updates with lips
  } else if (feature === 'eyes') {
    randomizeEyes();
    randomizeMakeup('eyes');                          // Makeup (eyeshadow) updates with eyes
  } else if (feature === 'skin') {
    randomizeSkin();
    randomizeMakeup('skin');                          // Makeup (blush) updates with skin
  } else if (feature === 'faceShape') {
    randomizeFaceShape();
  } else if (feature === 'hair') {
    randomizeHair();
  } else if (feature === 'eyebrows') {
    randomizeEyebrows();
  } else if (feature === 'nose') {
    randomizeNose();
  }

  console.log(`Randomized ${feature}`);
  redraw();
}
