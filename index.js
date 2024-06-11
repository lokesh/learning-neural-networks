/*
1. For every input, multiply that input by its weight.
2. Sum all the weighted inputs.
3. Compute the output of the perceptron by passing that sum through an activation function (the sign of the sum).
*/

// random int
function rand(num = 1) {
    return Math.round(Math.random() * num);
}

function randWeight() {
    return Math.random() * 2 - 1;
}

function sumInputs(inputs, weights) {
    let sum = 0;
    for (let x = 0; x < inputs.length; x++) {
        sum += inputs[x] * weights[x];
    }
    return sum;
}

function activation(val) {
    return val > 0 ? 1 : -1; 
}

let inputs = [rand(20), rand(20), 1];
let weights = [randWeight(), randWeight(), randWeight()];

let sum = sumInputs(inputs, weights);

console.log(inputs, weights);
console.log(sum);
console.log(activation(sum));
// let x1 = rand()