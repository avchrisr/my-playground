/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

// Q) is the array already sorted?
// Q) can the array contain 0 or negative numbers?
// Q) can the array contain duplicate numbers?


const nums: number[] = [2, 7, 11, 15];
const target: number = 9;

// -----------------------------------------------------------
// solution 1 - brute force.  time complexity: O(n^2)  |  space complexity: O(1) constant
// -----------------------------------------------------------
const findSumBruteForce = (nums: number[], target: number) => {
    for (let i=0; i < nums.length - 1; i++) {
        for (let j=i+1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    throw new Error(`sum not found to add up to ${target}`);
}

// ----------------------------------
// solution 2 - time complexity: O(n) | space complexity: O(n) | each lookup in HashMap: O(1)
// trade space for speed
// as the items are iterated, do a lookup in the HashMap and see if the number is found with respective index.
// if found, get the index stored in the HashMap and the current index
// if not found, store the diff/current index as k/v in HashMap.
// ----------------------------------
const findSum = (nums: number[], target: number) => {
    const diffMap = new Map();
    for (let i=0; i < nums.length; i++) {
        if (diffMap.has(nums[i])) {
            return [diffMap.get(nums[i]), i];
        }
        diffMap.set(target - nums[i], i);
    }
    throw new Error(`sum not found.`);
}

console.log(findSum(nums, target));










