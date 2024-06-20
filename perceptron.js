

class Perceptron {    
    // Create weights
    constructor(n, c) {
        this.weights = new Array(n + 1); // +1 for bias
        this.learningConstant = c;
        
        for (let i = 0; i < n + 1; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }
    }

    // Mult inputs against weights, sum up, and pass to activate
    feedForward(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }

        sum += this.weights[this.weights.length - 1];  // Add bias weight

        return this.activate(sum);
    }

    // Activation function
    activate(sum) {
        return sum > 0 ? 1 : -1;
    }

    train(inputs, desired) {
        let guess = this.feedForward(inputs);

        // This value can only be 0, -2, or 2
        let error = desired - guess;
        
        // Update weights
        for (let i = 0; i < this.weights.length - 1; i++) {
            this.weights[i] += error * inputs[i] * this.learningConstant;
        }

        // Update bias
        this.weights[this.weights.length - 1] += error * this.learningConstant;
    }
}



// Simple slope function to help generate synthetic values for testing
// y = mx + b
// y = 1/2 x - 1
function f(x) {
    return 0.5 * x - 1;

}

// 3 weight perceptron (2 inputs, 1 bias)

let perceptron = new Perceptron(2, 0.0001);

// The input is three values: x, y, and the bias.
let inputs = [10, 6];
console.log(`Inputs: ${inputs}`);

let guess = perceptron.feedForward(inputs);
console.log(`Guess #1: ${guess}`);

console.log('TRAINING');

// TRAIN
let trainingLoopCount = 100000;

for (let i = 0; i < trainingLoopCount; i++){
    let x0 = Math.random() * 200 - 100;
    let x1 =  Math.random() * 200 - 100;
    let xbias = 1;

    let trainingInputs = [x0, x1, xbias];
    let yVal = f(x0);
    let desired = (x1 > yVal) ? 1 : -1;
    perceptron.train(trainingInputs, desired);
}

let x = 10;
console.log(`Actual f(x): ${f(x)}`);
for (let i = 0; i < 20; i++){
    guess = perceptron.feedForward([x, i, 1]);
    console.log(`Inputs: ${x}, ${i}, 1. Guess #${i + 2}: ${guess}`);
}
