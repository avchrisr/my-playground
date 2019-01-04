'use strict';

// --- Directions
// Given an integer, return an integer that is the reverse ordering of numbers.

// --- Examples
//   reverseInt(15) === 51
//   reverseInt(981) === 189
//   reverseInt(500) === 5
//   reverseInt(-15) === -51
//   reverseInt(-90) === -9


// SOLUTION  --  O(n) time | O(n) space
// if the number is a single digit number, just return it.
// convert the num to a string array
// iterate each character, with left and right pointers
// if the first character is '-', start at left + 1 

const reverseInt = (n) => {
    if (n < 10 && n > -10) {
        return n;
    }

    const s = n.toString().split('');
    let left = s[0] === '-' ? 1 : 0;
    let right = s.length - 1;

    while (left < right) {
        const temp = s[left];
        s[left] = s[right];
        s[right] = temp;

        left += 1;
        right -= 1;
    }

    return parseInt(s.join(''));
}

// console.log(reverseInt(15));
// console.log(reverseInt(981));
// console.log(reverseInt(500));
// console.log(reverseInt(-15));
// console.log(reverseInt(-90));

module.exports = reverseInt;
