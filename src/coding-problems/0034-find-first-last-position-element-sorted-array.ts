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
// binary search - O(log n) time | O(1) space

const findPositions = (nums: number[], target: number): number[] => {
    let beginIndex = -1;
    let endIndex = -1;

    binarySearch(nums, target, 0, nums.length-1);

    function binarySearch(nums: number[], target: number, left: number, right: number): void {
        // if (left <= right)

        // find mid index
        // if nums[mid] < target,  search right by setting left = mid + 1
        // if nums[mid] > target,  search left by setting right = mid - 1
        // if nums[mid] === target, 
        //    if beginIndex === -1 || beginIndex > mid, set beginIndex to mid, and search left
        //    if endIndex < mid, set endIndex to mid, and search right

        if (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) {
                if (beginIndex === -1 || beginIndex > mid) {
                    beginIndex = mid;
                    binarySearch(nums, target, left, mid - 1);
                }
                if (endIndex < mid) {
                    endIndex = mid;
                    binarySearch(nums, target, mid + 1, right);
                }
            } else if (nums[mid] > target) {
                binarySearch(nums, target, left, mid - 1);
            } else {
                binarySearch(nums, target, mid + 1, right);
            }
        }
    }
    return [beginIndex, endIndex];
};

const input = [5,7,7,8,8,10];
const target = 8;

console.log(findPositions(input, target));

export {};
