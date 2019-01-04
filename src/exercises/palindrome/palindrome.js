// --- Directions
// Given a string, return true if the string is a palindrome
// or false if it is not.  Palindromes are strings that
// form the same word if it is reversed. *Do* include spaces
// and punctuation in determining if the string is a palindrome.
// --- Examples:
//   palindrome("abba") === true
//   palindrome("abcdefg") === false

// SOLUTION 1
// iterate through each character, and build a reverse string.  O(n) time | O(1) space

// SOLUTION 2
// iterate through the string from left and right indices. while left < right.   O(n) time | O(1) space

const isPalindrome2 = (str) => {
    if (str.length < 2) {
        return true;
    }

    let left = 0;
    let right = str.length -1;

    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left += 1;
        right -= 1;
    }
    
    return true;
}

const isPalindrome1 = (str) => {
    let reversed = '';
    for (let char of str) {
        reversed = char + reversed;
    }
    return str === reversed;
}


module.exports = isPalindrome2;
