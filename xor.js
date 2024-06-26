
let trainingData = [
  { inputs: [0, 0], outputs: [0] },
  { inputs: [0, 1], outputs: [1] },
  { inputs: [1, 0], outputs: [1] },
  { inputs: [1, 1], outputs: [0] },
];

function setup() {
  // frameRate(1)
  createCanvas(400, 400);
  nn = new NeuralNetwork(2, 4, 1);

  learningRateSlider = createSlider(0.00001, 0.5, 0.1, 0.00001);
}

function draw() {
  background(0);

  nn.setLearningRate(learningRateSlider.value());

  
  for (let i = 0; i < 100; i++) {
    data = random(trainingData);
    nn.train(data.inputs, data.outputs)
  }

  let rows = 40;
  let cols = 40;
  let rowHeight = height / rows;
  let colWidth = width / cols;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i / rows;
      let y = j / cols;
      let inputs = [x, y];
      let output = nn.predict(inputs);
      fill(output * 255);
      noStroke();
      rect(i * rowHeight, j * colWidth, rowHeight, colWidth);
    }
  }
  // console.log(nn.predict([1, 0]));
  
  
}