/*
This problem was asked by Amazon.

Given a N by M matrix of numbers, print out the matrix in a clockwise spiral.

For example, given the following matrix:

[[1,  2,  3,  4,  5],
 [6,  7,  8,  9,  10],
 [11, 12, 13, 14, 15],
 [16, 17, 18, 19, 20]]
You should print out the following:

1 2 3 4 5 10 15 20 19 18 17 16 11 6 7 8 9 14 13 12
*/

const printMatrix = (matrix: number[][], rowLength: number, columnLength: number): void => {
    let output: string = '';

    let rowStartIndex: number = 0;
    let colStartIndex: number = 0;

    while (rowStartIndex < rowLength && colStartIndex < columnLength) {
        // print the first row
        for (let i = colStartIndex; i < columnLength; i++) {
            output += `${matrix[rowStartIndex][i]} `;
        }
        rowStartIndex += 1;

        // print the last column
        for (let i = rowStartIndex; i < rowLength; i++) {
            output += `${matrix[i][columnLength - 1]} `;
        }
        columnLength -= 1;

        // print the last row
        if (rowStartIndex < rowLength) {
            for (let i = columnLength - 1; i >= colStartIndex; i--) {
                output += `${matrix[rowLength - 1][i]} `;
            }
            rowLength -= 1;
        }

        // print the first column
        if (colStartIndex < columnLength) {
            for (let i = rowLength - 1; i >= rowStartIndex; i--) {
                output += `${matrix[i][colStartIndex]} `;
            }
            colStartIndex += 1;
        }
    }

    console.log(output);
};


const matrix = [[1,  2,  3,  4,  5],
                [6,  7,  8,  9,  10],
                [11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20]];

// console.log(matrix[0][0]);  // 1
// console.log(matrix[0][1]);  // 2
// console.log(matrix[1][0]);  // 6
// console.log(matrix[3][0]);  // 16

printMatrix(matrix, 4, 5);

export {};
