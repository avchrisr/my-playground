/*
This problem was asked by Amazon.

A sorted array of integers was rotated an unknown number of times.

Given such an array, find the index of the element in the array in faster than linear time. If the element doesn't exist in the array, return null.

For example, given the array [13, 18, 25, 2, 8, 10] and the element 8, return 4 (the index of 8 in the array).

You can assume all the integers in the array are unique.
*/

// SOLUTION  --  O(log n) time | O(m) space -- recursion stack
// faster than linear time O(n), means O(log n) === divide and conquer
// if (left <= right)
//   find the mid index of the array.  mid = Math.floor((left + right) / 2)
//   if element === arr[mid], return mid
//
//   if the array is sorted.. ==  arr[left] < arr[mid]
//     if the element is between it, search left
//     else search right
//   else 
//     if the element is smaller than arr[left] AND greater than arr[mid], search right
//     else search left
// else
//   return null

const findElementIndex = (arr: number[], element: number, left = 0, right = arr.length - 1): number => {
    if (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // console.log(`## mid = ${mid}`);

        if (element === arr[mid]) {
            return mid;
        }
        if (arr[left] < arr[mid]) {
            if (element >= arr[left] && element <= arr[mid]) {
                return findElementIndex(arr, element, left, mid - 1);
            }
            return findElementIndex(arr, element, mid + 1, right);
        } else {
            if (element < arr[left] && element > arr[mid]) {
                return findElementIndex(arr, element, mid + 1, right);
            }
            return findElementIndex(arr, element, left, mid - 1);
        }
    }
    return null;
};


const arr: number[] = [13, 18, 25, 2, 8, 10];
const element: number = 2;

console.log(findElementIndex(arr, element));

export {};
