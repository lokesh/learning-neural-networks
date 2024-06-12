class Perceptron {    
    // Create weights
    constructor(n) {
        this.weights = [];
        this.learningConstant = 0.0001;
        
        for (let i = 0; i < n; i++) {
            this.weights[i] = Math.random() * 2 - 1;
        }
    }

    // Mult inputs against weights, sum up, and pass to activate
    feedForward(inputs) {
        let sum = 0;
        for (let i = 0; i < inputs.length; i++) {
            sum += inputs[i] * this.weights[i];
        }

        return this.activate(sum);
    }

    // Activation function
    activate(sum) {
        return sum > 0 ? 1 : -1;
    }

    train(inputs, desired) {
        let guess = this.feedForward(inputs);

        let error = desired - guess;
        for (let i = 0; i < this.weights.length; i++) {
            // Train the network against known data.
            this.weights[i] = this.weights[i] + error * inputs[i] * this.learningConstant;
        }        

        console.log(this.weights);
    }
}



// Simple slope function to help generate synthetic values for testing
// y = mx + b
// y = 1/2 x - 1
function f(x) {
    return 0.5 * x - 1;
}



// 3 weight perceptron (2 inputs, 1 bias)

let perceptron = new Perceptron(3);

// The input is three values: x, y, and the bias.
let inputs = [50, -12, 1];
console.log(`Inputs: ${inputs}`);

let guess = perceptron.feedForward(inputs);
console.log(`Guess #1: ${guess}`);

// TRAIN
let trainingLoopCount = 1000;

for (let i = 0; i < trainingLoopCount; i++){
    let x0 = Math.random() * 200 - 100;
    let x1 =  Math.random() * 200 - 100;
    let xbias = 1;

    let trainingInputs = [x0, x1, xbias];
    let yVal = f(x0);
    let desired = (yVal > x1) ? 1 : 0;
    perceptron.train(trainingInputs, desired);
}



// perceptron.train()
