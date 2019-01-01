/*
Write a function called 'sumZero', which accepts a 'sorted' array of integers.
The function should find the 'first' pair where the sum is 0.
Return an array that includes both values that sum to zero or undefined if a pair does not exist.

examples:

sumZero([-3,-2,-1,0,1,2,3])     // [-3, 3]
sumZero([-2,0,1,3])             // undefined
sumZero([1,2,3])                // undefined
*/

// SOLUTION  --  O(n) time.  O(1) space
// loop over the arr with two pointers. one from beginning (left), another from the end (right), until a pair is found or as long as left < right
// if leftItem + rightItem = 0, return [leftItem, rightItem]
// else if the sum is < 0, increment left by 1
//      if the sum is > 0, decrement right by 1


// SOLUTION (naive)  --  O(n^2) time.  O(1) space
// loop over the arr, for each integer, loop over the subsequent integers and find sum = 0


const sumZero = (arr: number[]): number[] => {
    let left = 0;
    let right = arr.length - 1;

    while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum === 0) {
            return [arr[left], arr[right]];
        }
        if (sum < 0) {
            left += 1;
        } else {
            right -= 1;
        }
    }
    return undefined;
}


console.log(sumZero([-3,-2,-1,0,1,2,3]));
console.log(sumZero([-2,0,1,3]));
console.log(sumZero([1,2,3]));

export {};
