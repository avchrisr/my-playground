/*
This problem was asked by Microsoft.

Given a 2D matrix of characters and a target word, write a function that returns whether the word can be found in the matrix by going left-to-right, or up-to-down.

For example, given the following matrix:

[['F', 'A', 'C', 'I'],
 ['O', 'B', 'Q', 'P'],
 ['A', 'N', 'O', 'B'],
 ['M', 'A', 'S', 'S']]

and the target word 'FOAM', you should return true, since it's the leftmost column. Similarly, given the target word 'MASS', you should return true, since it's the last row.
*/

/*
SOLUTION

1. iterate the matrix and store the row/col index of each letter in a hashmap
2. iterate through each letter in the target word, and check right or down as long as the next letter matches AND the index is within the boundary if the matrix
   - if it went beyond the boundary and there's still remaining letters in target word, return false
   - if the letter does not match, move on to the next occurrence (position) of the very first letter
*/

const wordExists = (matrix: string[][], word: string): boolean => {
    if (matrix.length < 1 || matrix[0].length < 1 || typeof word !== 'string' || word.length < 1) {
        return false;
    }

    const rowLength = matrix.length;
    const columnLength = matrix[0].length;
    const charPositionInMatrix = {};

    // 1. iterate the matrix and store the row/col index of each letter in a hashmap
    for (let i=0; i < matrix.length; i++) {
        for (let j=0; j < matrix[i].length; j++) {
            let char = matrix[i][j];
            let charPosition = charPositionInMatrix[char];
            if (charPosition === undefined) {
                charPositionInMatrix[char] = [[i, j]];
            } else {
                charPositionInMatrix[char].push([i, j]);
            }
        }
    }

    // 2. iterate through each letter in the target word, and check right or down as long as the next letter matches AND the index is within the boundary if the matrix
    //    - if it went beyond the boundary and there's still remaining letters in target word, return false
    //    - if the letter does not match, move on to the next occurrence (position) of the very first letter
    const firstLetterPosition = charPositionInMatrix[word[0]];
    if (firstLetterPosition === undefined) {
        return false;
    }

    for (let i=0; i < firstLetterPosition.length; i++) {
        const charRowIndex = firstLetterPosition[i][0];
        const charColumnIndex = firstLetterPosition[i][1];

        for (let j=1; j < word.length; j++) {
            // check right
            if (charColumnIndex + j < columnLength && matrix[charRowIndex][charColumnIndex + j] === word[j]) {
                if (j === word.length - 1) {
                    // if this is the last word. we've found the word!
                    return true;
                }
            } else {
                // break out of this nested loop.
                j = word.length;
            }    
        }
        for (let j=1; j < word.length; j++) {
            // check down
            if (charRowIndex + j < rowLength && matrix[charRowIndex + j][charColumnIndex] === word[j]) {
                if (j === word.length - 1) {
                    // if this is the last word. we've found the word!
                    return true;
                }
            } else {
                // break out of this nested loop.
                j = word.length;
            }    
        }
    }

    return false;
};

const matrix = [['F', 'A', 'C', 'I'],
                ['O', 'B', 'Q', 'P'],
                ['A', 'N', 'O', 'B'],
                ['M', 'A', 'S', 'S']];

console.log(wordExists(matrix, 'FOAM'));
console.log(wordExists(matrix, 'ASS'));
console.log(wordExists(matrix, 'BQP'));

export {};
