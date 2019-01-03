// --- Directions
// Given a string, return a new string with the reversed order of characters
// --- Examples
//   reverse('apple') === 'elppa'
//   reverse('hello') === 'olleh'
//   reverse('Greetings!') === '!sgniteerG'


// SOLUTION 1  --  O(n) time | O(n) space
// loop over each char in the string, and push into a stack. LIFO.  O(n) time | O(n) space
// pop each character to build the reversed string.  O(n) time

// SOLUTION 2  --  O(n) time | O(1) space
// loop over each char, build the reversed string right away.  O(n) time | O(1) space

// SOLUTION 3  --  O(n) time | O(1) space
// use .reduce() helper function

const reverse3 = (str) => {
    return str.split('').reduce((reversed, char) => char + reversed, '');
};

const reverse2 = (str) => {
    let reversed = '';
    for (let char of str) {
        reversed = char + reversed;
    }
    return reversed;
};

const reverse1 = (str) => {
    const arr = [];
    for (let char of str) {
        arr.unshift(char);
    }
    return arr.join('');
};

module.exports = reverse3;
