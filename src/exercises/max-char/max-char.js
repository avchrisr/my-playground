// --- Directions
// Given a string, return the character that is most commonly used in the string.

// --- Examples
// maxChar("abcccccccd") === "c"
// maxChar("apple 1231111") === "1"


// SOLUTION  --  O(n) time | O(n) space
// iterate through each character and store the count in a hashmap  --  O(n) time | O(n) space
// scan through each key (character) and find the key with max value, and return the key  --  O(n) time

const maxChar = (str) => {
    if (str.length < 2) {
        return str;
    }

    const counterMap = {};
    for (let char of str) {
        counterMap[char] = counterMap[char] ? counterMap[char] + 1 : 1;
    }

    let maxChar = '';
    let maxCount = 0;
    for (let key in counterMap) {
        if (counterMap[key] > maxCount) {
            maxChar = key;
            maxCount = counterMap[key];
        }
    }

    return maxChar;
};

module.exports = maxChar;
