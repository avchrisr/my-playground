/*
Implement a function called 'countUniqueValues', which accepts a sorted array, and counts the unique values in the array.
There can be negative numbers in the array, but it will always be sorted.

examples:

countUniqueValues([1,1,1,1,1,2])                // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13])   // 7
countUniqueValues([])                           // 0
countUniqueValues([-2,-1,-1,0,1])               // 4
*/

// SOLUTION (naive)  --  O(n) time.  O(n) space
// loop over arr, add the number to a Set if the number does not exist. Or we can just blindly add it too since Sets automatically remove duplicates, and return the size of the Set


// SOLUTION (if we are allowed to alter the array)  --  O(n) time.  O(1) space
// loop over arr, with two indices. i and j. initial j is i+1.  while j < arr.length
// if i's value equals j's value, increment j by 1. i stays as is
// if i's value does not equal j's value, increment i by 1.
//   if i === j, just increment j by 1
//   if not, copy j's value over to i's. then increment j by 1
// when the iteration finishes, return i+1 as the total count of unique items


const countUniqueValues = (arr: number[]): number => {
    if (arr.length < 2) {
        return arr.length;
    }

    // loop over arr, with two indices. i and j. initial j is i+1.  while j < arr.length
    // if i's value equals j's value, increment j by 1. i stays as is
    // if i's value does not equal j's value, increment i by 1.
    //   if i === j, just increment j by 1
    //   if not, copy j's value over to i's. then increment j by 1
    // when the iteration finishes, return i+1 as the total count of unique items
    let i = 0;
    let j = 1;

    while (j < arr.length) {
        if (arr[i] !== arr[j]) {
            i += 1;
            if (i !== j) {
                arr[i] = arr[j];
            }
        }
        j += 1;
    }
    return i+1;
};

console.log(countUniqueValues([1,1,1,1,1,2]))                // 2
console.log(countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]))   // 7
console.log(countUniqueValues([]))                           // 0
console.log(countUniqueValues([-2,-1,-1,0,1]))               // 4

export {};
