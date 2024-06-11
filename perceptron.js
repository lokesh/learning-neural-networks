
class Perceptron {
    
    // Create weights
    constructor(n) {
        this.weights = [];
        this.learningConstant = 0.01;
        
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
        let guess = this.feedforward(inputs);
        let error = desired - guess;
        for (let i = 0; i < this.weights.length; i++) {
            // Train the network against known data.
          this.weights[i] = this.weights[i] + error * inputs[i] * this.learningConstant;
        }        
    }
}

let perceptron = new Perceptron(3);

// The input is three values: x, y, and the bias.
let inputs = [50, -12, 1];

let guess = perceptron.feedForward(inputs);

console.log(inputs);
console.log(guess);