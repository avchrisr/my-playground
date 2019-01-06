/*
You are climbing a stair case. It takes n steps to reach to the top.
Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?
Note: Given n will be a positive integer.

Example 1:

Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps


Example 2:

Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
*/

// SOLUTION  --  DYNAMIC PROGRAMMING with Memoization.  O(n) time | O(n) space

// f(1) = 1
// f(2) = 2
// f(3) = 3  ==  f(2) + f(1)
// f(4) = 5  ==  f(3) + f(2)

// 1 + 1 + 1 + 1
// 1 + 1 + 2
// 1 + 2 + 1
// 2 + 1 + 1
// 2 + 2

// f(n) = f(n-1) + f(n-2)

// RESULT: Runtime: 48 ms, faster than 100.00% of JavaScript online submissions for Climbing Stairs.

const climbStairs = (n: number, memo = {}): number => {
    if (n <= 2) {
        return n;
    }

    if (!((n-1) in memo)) {
        memo[n-1] = climbStairs(n-1, memo);
    }
    if (!((n-2) in memo)) {
        memo[n-2] = climbStairs(n-2, memo);
    }

    return memo[n-1] + memo[n-2];
};


console.log(climbStairs(1));
console.log(climbStairs(2));
console.log(climbStairs(3));
console.log(climbStairs(4));
console.log(climbStairs(10));



export {};
