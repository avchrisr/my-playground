// --- Directions
// Check to see if two provided strings are anagrams of eachother.
// One string is an anagram of another if it uses the same characters
// in the same quantity. Only consider characters, not spaces
// or punctuation.  Consider capital letters to be the same as lower case

// --- Examples
//   anagrams('rail safety', 'fairy tales') --> True
//   anagrams('RAIL! SAFETY!', 'fairy tales') --> True
//   anagrams('Hi there', 'Bye there') --> False


// SOLUTION 1  --  O(n^2) time.  O(1) space
// if str1.length is not same as str2.length, return false
// loop over str1, for each character, check if it exists in str2. (indexOf).   O(n^2) time
//   if index < 0, return false
//   if index >= 0, remove that index from str2


// SOLUTION 2  --  O(n) time.  O(n) space
// if str1.length is not same as str2.length, return false
// loop over str1, store its counter in a map.  O(n) time.  O(n) space
// loop over str2, for each character, if the character as the key exists in the map, check the counter value.   O(n) time.  O(1) lookup
//   if the value is 1, delete the key
//   if the value is > 1, decrement it by 1
// if the character as the key does not exist in the map, return false
// if the size of the map is > 0. (i.e. if there's any key remaining in the map), return false          O(1) time


// SOLUTION 3  --  O(n log n) time.  O(n) space
// return str1.split('').sort().join('') === str2.split('').sort().join('');


const anagrams = (stringA, stringB) => {
    stringA = stringA.replace(/[^\w]/g, '').toLowerCase();
    stringB = stringB.replace(/[^\w]/g, '').toLowerCase();

    if (stringA.length !== stringB.length) {
        return false;
    }

    const strAmap = {};
    for (let char of stringA) {
        // if (!(char in strAmap)) {
        //     strAmap[char] = 1;
        // } else {
        //     strAmap[char] += 1;
        // }

        strAmap[char] = char in strAmap ? strAmap[char] + 1 : 1;
    }

    for (let char of stringB) {
        if (char in strAmap) {
            // if (strAmap[char] > 1) {
            //     strAmap[char] -= 1;
            // } else {
            //     delete strAmap[char];
            // }

            strAmap[char] > 1 ? strAmap[char] -= 1 : delete strAmap[char];
        } else {
            return false;
        }
    }

    if (Object.keys(strAmap).length > 0) {
        return false;
    }

    return true;
};


module.exports = anagrams;
