import Matrix from './Matrix.js';

/**
 * Takes a number and places it between 1 and -1.
 * @param {Number} x 
 * @returns 
 */
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}


class NeuralNetwork {
    constructor(inputNodeCount, hiddenNodeCount, outputNodeCount) {
        this.inputNodeCount = inputNodeCount;
        this.hiddenNodeCount = hiddenNodeCount;
        this.outputNodeCount = outputNodeCount;
        
        this.weightsIH = new Matrix(this.hiddenNodeCount, this.inputNodeCount);
        this.weightsHO = new Matrix(this.outputNodeCount, this.hiddenNodeCount);
        
        this.weightsIH.randomize();
        this.weightsHO.randomize();

        this.biasH = new Matrix(this.hiddenNodeCount, 1);
        this.biasO = new Matrix(this.outputNodeCount, 1);

        this.biasH.randomize();
        this.biasO.randomize();
    }

    feedForward(inputsArray) {
        // 1. Create vector (aka single column matrix) from passed in array
        let inputs = Matrix.fromArray(inputsArray);

        // 2. Get dot product of weights matrix and inputs vector. 
        // This returns a 
        // Note: The order matters when doing dot products.
        let hidden = Matrix.mult(this.weightsIH, inputs);
        
        // 3. Use element wise addition to add the bias vector
        hidden.add(this.biasH);        
        
        // 4. Now that we finally have the weighted sums, run them through the 
        // activation function. In this example we are using a sigmoid function.
        hidden.map(sigmoid);

        // Repeat for the next layer
        let output = Matrix.mult(this.weightsHO, hidden);
        output.add(this.biasO);
        output.map(sigmoid);        
     
        return output;
    }

    train(inputs, answer) {

    }
}

export default NeuralNetwork;