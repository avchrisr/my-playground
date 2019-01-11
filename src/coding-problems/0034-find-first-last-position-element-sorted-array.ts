/*
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.
Your algorithm's runtime complexity must be in the order of O(log n).
If the target is not found in the array, return [-1, -1].

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]


Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
*/

// SOLUTION
// two binary searches. one to find the begin, another to find the end.  O(2log n) === O(log n)

const findPositions = (nums: number[], target: number): number[] => {
    let beginIndex = -1;
    let endIndex = -1;

    findBeginIndex(0, nums.length-1);

    findEndIndex(0, nums.length-1);


    function findBeginIndex(left: number, right: number): void {

    }

    function findEndIndex(left: number, right: number): void {

    }

    return [beginIndex, endIndex];

};

const input = [5,7,7,8,8,10];
const target = 8;

console.log(findPositions(input, target));

export {};
