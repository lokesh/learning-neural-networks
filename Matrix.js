class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.matrix = [];

        for (let i = 0; i < this.rows; i++) {
            this.matrix.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0;
            }
        }   
        
    }

    rand(min = 0, max = 10) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor((Math.random() * max)) + min;
            }
        }   
    }

    /**
     * element wise addition
     * @param {Integer|Matrix} n 
     */
    add(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n.matrix[i][j];
                }
            }
    
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] += n;
                }
            }
        }        
    }    

    /**
     * element wise multiplication
     * @param {Integer|Matrix} n 
     */
    mult(n) {
        if (n instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n.matrix[i][j];
                }
            }
    
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.matrix[i][j] *= n;
                }
            }
        }

    }
}


export default Matrix;