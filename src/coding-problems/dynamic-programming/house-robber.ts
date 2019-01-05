/*
You are a professional robber planning to rob houses along a street.
Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security system connected 
and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given a list of non-negative integers representing the amount of money of each house, 
determine the maximum amount of money you can rob tonight without alerting the police.

ASSUMPTION: you cannot skip two houses at once.  <---- ***

Example 1:

Input: [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.


Example 2:

Input: [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.
*/

// SOLUTION
// rob(i) = Math.max(rob(i-2) + arr(i), rob(i-1))

let functionCalls = 0;
const rob = (nums: number[], i = nums.length - 1, memo = {}): number => {
    functionCalls += 1;

    // base case
    if (i < 0) {
        return 0;
    }

    // be careful not to use "if (!memo[i-2]))" as the value 0 evaluates to false in JavaScript!
    if (!((i-2) in memo)) {
        memo[i-2] = rob(nums, i-2, memo);
    }
    if (!((i-1) in memo)) {
        memo[i-1] = rob(nums, i-1, memo);
    }
    return Math.max(memo[i-2] + nums[i], memo[i-1]);

    // WITHOUT DYNAMIC PROGRAMMING
    // return Math.max(rob(nums, i-2, memo) + nums[i], rob(nums, i-1, memo));
};

console.time('BENCH1');
// const input = [2,7,9,3,1,5,2,6,3,4,2,3,4,1,6,2,3,1,7,2,3,4,5,1,2,3];
const input = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
console.log(rob(input));
console.timeEnd('BENCH1');

console.log(`functionCalls = ${functionCalls}`);

// WITHOUT DP
// BENCH1: 10.527ms
// functionCalls = 635621

// WITH DP
// BENCH1: 3.308ms
// functionCalls = 29

export {};
