// Fibonacci numbers: each number is the sum of the two preceding ones.  F(n) = F(n-1) + F(n-2)  for  n >= 2
// 0 1 1 2 3 5 8 13 21 34 55 ...

/*
fibonacci_iterative(45);    //  1134903170
ITERATIVE:                      2.931ms

fibonacci(45);              //  1134903170
fibonacci function calls =      3672623805
NORMAL RECURSIVE:               65714.404ms

fiboDP(45);                 //  1134903170
fiboDP function calls =         46
DYNAMIC PROGRAMMING:            0.175ms
*/

// Iterative solution  --  O(n) time | O(1) space
// Not as fast as Dynamic Programming recursive solution, but still much faster than the normal recursive solution.
const fibonacci_iterative = (sequence: number): number => {
    // 0 1 1 2 3 5 8 13 21 34 55 ...
    if (sequence < 2) {
        return sequence;
    }

    let currNum: number;
    let prev1 = 1;
    let prev2 = 0;

    for (let i=2; i <= sequence; i++) {
        currNum = prev1 + prev2;
        prev2 = prev1;
        prev1 = currNum;
    }

    return currNum;
};

console.time('ITERATIVE');
console.log(fibonacci_iterative(45));
console.timeEnd('ITERATIVE');


let fibonacciFunctionCalls = 0;
let fiboDPcalls = 0;

// Recursive solution.  O(2^n) time | O(n) space due to recursion stack  --  worst performance
function fibonacci(sequence: number) {
    fibonacciFunctionCalls += 1;

    if (sequence < 2) {
        return sequence;
    }
    return fibonacci(sequence-1) + fibonacci(sequence-2);
}

// Dynamic Programming solution.  O(n) time | O(n) space
const fiboDP = (sequence: number, memo = {}) => {
    fiboDPcalls += 1;

    if (sequence < 2) {
        return sequence;
    }

    // this yields 87 function calls (because two recursive calls) vs. 45 below.
    // if (!memo[sequence]) {
    //     memo[sequence] = fiboDP(sequence-1, memo) + fiboDP(sequence-2, memo);
    // }
    // return memo[sequence];

    if (!memo[sequence-1]) {
        memo[sequence-1] = fiboDP(sequence-1, memo);
    }
    if (!memo[sequence-2]) {
        memo[sequence-2] = fiboDP(sequence-2, memo);
    }

    return memo[sequence-1] + memo[sequence-2];
}

// console.log(fiboDP(1));
// console.log(fiboDP(2));
// console.log(fiboDP(3));
// console.log(fiboDP(4));
// console.log(fiboDP(5));
// console.log(fiboDP(6));
// console.log(fiboDP(7));
// console.log(fiboDP(8));
// console.log(fiboDP(9));
// console.log(fiboDP(10));

console.time('NORMAL RECURSIVE');
console.log(fibonacci(45));
console.timeEnd('NORMAL RECURSIVE');
console.log(`fibonacci function calls = ${fibonacciFunctionCalls}`);

console.time('DYNAMIC PROGRAMMING');
console.log(fiboDP(45));
console.timeEnd('DYNAMIC PROGRAMMING');
console.log(`fiboDP function calls = ${fiboDPcalls}`);

