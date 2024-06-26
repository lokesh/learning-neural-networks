import Matrix from './oldMatrix.js';

/**
 * Sigmoid activation function.
 * Takes a number and places it between 1 and -1.
 * @param {Number} x 
 * @returns {Number}
 */
function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

/**
 * Derivative of the sigmoid function.
 * @param {Number} y 
 * @returns {Number}
 */
function dsigmoid(y) {
    return y * (1 - y);
}

// function dsigmoid(x) {
//     return sigmoid(x) * (1 -sigmoid(x));
// }


class NeuralNetwork {
  /**
     * Constructor for the NeuralNetwork.
     * @param {number} inputNodeCount - Number of input nodes
     * @param {number} hiddenNodeCount - Number of hidden nodes
     * @param {number} outputNodeCount - Number of output nodes
     */
    constructor(inputNodeCount, hiddenNodeCount, outputNodeCount) {
        this.learningRate = 0.01;  // Default learning rate

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

    /**
     * Feedforward algorithm.
     * @param {number[]} inputsArray - Array of input values.
     * @returns {Matrix} - The output matrix.
     */
    feedForward(inputsArray) {
        // 1. Create vector (aka single column matrix) from passed in array
        let inputs = Matrix.fromArray(inputsArray);

        // 2. Get dot product of weights matrix and inputs vector. 
        // This returns a new vector.
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

    /**
     * Trains the neural network by adjusting the weights and biases based on the inputs and targets.
     * @param {number[]} inputsArray - The array of input values.
     * @param {number[]} targets - The array of target values.
     */
    train(inputsArray, targets) {
        let inputs = Matrix.fromArray(inputsArray);
        let hidden = Matrix.mult(this.weightsIH, inputs);
        hidden.add(this.biasH);                
        hidden.map(sigmoid);

        // Repeat for the next layer
        let outputs = Matrix.mult(this.weightsHO, hidden);
        outputs.add(this.biasO);
        outputs.map(sigmoid); 

        targets = Matrix.fromArray(targets);
        let outputErrors = Matrix.subtract(targets, outputs);
        
        // Calc gradient
        let gradients = Matrix.map(outputs, dsigmoid);
        gradients = Matrix.mult(gradients, outputErrors);
        gradients.scalarMult(this.learningRate); 


        // Calculate deltas
        let transposedWeightsHO = Matrix.transpose(this.weightsHO)
        let weightsHODelta = Matrix.mult(gradients, transposedWeightsHO);

        // let hiddenErrors = Matrix.mult(transposedWeightsHO, outputErrors);
        

        // console.table(outputs.data);
        // console.table(targets.data);
        // console.table(outputErrors.data);
        // console.table(this.weightsHO.data);

        this.weightsHO.add(weightsHODelta)

        // console.table(hiddenErrors.data);


        
    }

   /**
     * Train the neural network with given inputs and targets.
     * @param {number[]} inputsArray - Array of input values.
     * @param {number[]} targetsArray - Array of target values.
     */
   trainComplete(inputsArray, targetsArray) {
    // Feedforward step
    const inputs = Matrix.fromArray(inputsArray);
    const hidden = Matrix.mult(this.weightsIH, inputs);
    hidden.add(this.biasH);
    hidden.map(sigmoid);

    const outputs = Matrix.mult(this.weightsHO, hidden);
    outputs.add(this.biasO);
    outputs.map(sigmoid);

    // Convert target array to matrix
    const targets = Matrix.fromArray(targetsArray);

    // Calculate the output errors
    const outputErrors = Matrix.subtract(targets, outputs);

    // Calculate the gradients
    const gradients = Matrix.map(outputs, dsigmoid);
    gradients.multiply(outputErrors);
    gradients.multiply(this.learningRate);

    // Calculate deltas for hidden-output weights
    const hiddenT = Matrix.transpose(hidden);
    const weightsHODeltas = Matrix.mult(gradients, hiddenT);

    // Update the weights and biases
    this.weightsHO.add(weightsHODeltas);
    this.biasO.add(gradients);

    // Calculate the hidden layer errors
    const weightsHOT = Matrix.transpose(this.weightsHO);
    const hiddenErrors = Matrix.mult(weightsHOT, outputErrors);

    // Calculate hidden gradients
    const hiddenGradient = Matrix.map(hidden, dsigmoid);
   }

}

export default NeuralNetwork;