class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];

        for (let i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = 0;
            }
        }   
        
    }

    /**
     * Function runs against each value in the matrix.
     * Receives three args:
     * 1. {*} value
     * 2. {Number} row
     * 3. {Number} col
     * @param {*} fn 
     */
    map(fn) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = fn(this.data[i][j], i, j);
            }
        }   
    }

    randomize(min = -1, max = 1) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = (Math.random() * (max - min)) + min;
            }
        }   
    }
 
    /**
     * element wise addition
     * @param {Number|Matrix} n 
     * @returns 
     */
    add(n) {
        if (n instanceof Matrix) {
          if (this.rows !== n.rows || this.cols !== n.cols) {
            console.log('Columns and Rows of A must match Columns and Rows of B.');
            return;
          }
          return this.map((e, i, j) => e + n.data[i][j]);
        } else {
          return this.map(e => e + n);
        }
      }
  
 
    /**
     * scalar multiplication
     * @param {Number} n 
     */
    scalarMult(n) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    toArray() {
        let arr = [];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        for (let i = 0; i < arr.length; i++) {
            m.data[i][0] = arr[i];
        }
        return m;
    }

    /**
     * Dot product multiplication
     * @param {Matrix} m1 
     * @param {Matrix} m2 
     * @returns Matrix
     */
    static mult(m1, m2) {
        let result = new Matrix(m1.rows, m2.cols);
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0;
                for (let k = 0; k < m1.cols; k++) {
                    sum += m1.data[i][k] * m2.data[k][j];
                }
                result.data[i][j] = sum;                    
            }
        }            
        return result;
    }

    /**
     * 
     * @returns Matrix
     */
    static transpose(m) {
        let result = new Matrix(m.cols, m.rows);
        for (let i = 0; i < m.rows; i++) {
            for (let j = 0; j < m.cols; j++) {
                result.data[j][i] = m.data[i][j];
            }
        }        
        return result;
    }

}


export default Matrix;