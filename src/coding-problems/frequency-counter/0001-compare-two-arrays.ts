/*
frequency counter pattern example question

Write a function called 'same', which accepts two arrays
The function should return true if every value in the array has its corresponding value squared in the second array
The frequency of values must be the same

examples)

same([1,2,3], [4,1,9])	// true
same([1,2,3], [1,9])	// false
same([1,2,1], [4,4,1])	// false (must be same frequency)
*/

// SOLUTION 1  --  O(n) time.  O(n) space       <--  using the hashMap to store frequency
// loop over the arr1, create a hashmap that stores the squared values (as key) and its counter (as value).  O(n) time.  O(n) space
// loop over the arr2, check the hashmap for the matching key.  O(n) time.
//   if matching key found, if the value is 1, delete the key. Otherwise decrement the value by 1
//   if matching key NOT found, return false
// if there's any key left in the hashmap (i.e. if the size of the map is > 0), return false. Otherwise return true


// SOLUTION 2  --  O(n^2) time.  O(1) space
// loop over the arr1, check the index of the squared value in arr2.   O(n^2) time
//  if index is -1, return false
//  if index is >= 0, remove that item from arr2

const same1 = (arr1: number[], arr2: number[]): boolean => {
    if (arr1.length !== arr2.length) {
        return false;
    }

    const squareMap = {};

    // loop over the arr1, create a hashmap that stores the squared values (as key) and its counter (as value).  O(n) time.  O(n) space
    for (let val of arr1) {
        const square = val ** 2;
        if (squareMap[square]) {
            squareMap[square] += 1;
        } else {
            squareMap[square] = 1;
        }
    }

    // loop over the arr2, check the hashmap for the matching key
    //   if matching key found, if the value is 1, delete the key. Otherwise decrement the value by 1
    //   if matching key NOT found, return false
    for (let val of arr2) {
        if (squareMap[val]) {
            if (squareMap[val] > 1) {
                squareMap[val] -= 1;
            } else {
                delete squareMap[val];
            }
        } else {
            return false;
        }
    }

    // if there's any key left in the hashmap (i.e. if the size of the map is > 0), return false. Otherwise return true
    if (Object.keys(squareMap).length > 0) {
        return false;
    }

    return true;
};

const same2 = (arr1: number[], arr2: number[]): boolean => {
    // SOLUTION 2  --  O(n^2) time.  O(1) space
    if (arr1.length !== arr2.length) {
        return false;
    }

    // loop over the arr1, check the index of the squared value in arr2.
    //  if index is -1, return false
    //  if index is >= 0, remove that item from arr2
    for (let val of arr1) {
        const squareIndex = arr2.indexOf(val ** 2);
        if (squareIndex < 0) {
            return false;
        } else {
            arr2.splice(squareIndex, 1);
        }
    }

    return true;
};

console.log(same1([1,2,3], [4,1,9]));
console.log(same1([1,2,3], [1,9]));
console.log(same1([1,2,1], [4,4,1]));

export {};
