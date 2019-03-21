/*
This problem was asked by Coursera.

Given a 2D board of characters and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

For example, given the following board:

[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
exists(board, "ABCCED") returns true, exists(board, "SEE") returns true, exists(board, "ABCB") returns false.
*/

/*
SOLUTION

first, scan the 2D matrix, and convert it into a Graph
for each cell, add the letter to a hashmap with a value of its neighboring cells (letters)

Given the Graph, see if the input (word) exists in the path
*/

const containsWord = (board, word = '') => {
    if (word.length === 0) {
        return false;
    }

    const graph = {};

    // create a graph based on the board
    for (let row=0; row < board.length; row++) {
        for (let col=0; col < board[row].length; col++) {
            const currentLetter = board[row][col];
            // board[row][col-1]   board[row][col+1]
            // board[row-1][col]   board[row+1][col]

            if (!(currentLetter in graph)) {
                graph[currentLetter] = [];
            }

            const neighbors = [];

            if (col > 0 && board[row][col-1]) {
                neighbors.push(board[row][col-1]);
            }
            if (col < board[row].length - 1 && board[row][col+1]) {
                neighbors.push(board[row][col+1]);
            }
            if (row > 0 && board[row-1][col]) {
                neighbors.push(board[row-1][col]);
            }
            if (row < board.length - 1 && board[row+1][col]) {
                neighbors.push(board[row+1][col]);
            }

            graph[currentLetter].push(neighbors);
        }
    }

    console.log(graph);

    // see if a path exists in the graph for the given word
    for (let i=0; i < word.length; i++) {
        // check if word[i] exists in the graph
        // if i < word.length - 1, check if word[i+1] exists in the path(s)
        //   if exists, check if the word[i+1] exists in the graph and repeat until i < word.length
        //   else return false

        if (word[i] in graph) {
            if (i < word.length - 1) {
                const pathExists = graph[word[i]].some((neighbors) => {
                    console.log(neighbors);
                    return neighbors.includes(word[i+1]);
                });

                console.log(`pathExists = ${pathExists}`);

                if (!pathExists) {
                    return false;
                }
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
};


const board = [
    ['A','B','C','E'],
    ['S','F','C','S'],
    ['A','D','E','E']
];

// console.log(containsWord(board, 'ESEEDAA'));
// console.log(containsWord(board, 'ESEEDAA'));
console.log(containsWord(board, 'SEE'));



