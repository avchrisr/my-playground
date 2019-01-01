/*
Given two strings, write a function to determine if the second string is an anagram of the first.
An anagram is a word, phrase, or name formed by rearranging the letters of another, such as "cinema", formed from "iceman"

examples:

validAnagram('', '')                    // true
validAnagram('aaz', 'zza')              // false
validAnagram('anagram', 'nagaram')      // true
validAnagram('rat', 'car')              // false
validAnagram('awesome', 'awesom')       // false
validAnagram('qwerty', 'qeywrt')        // true
validAnagram('texttwisttime', 'timetwisttext')    // true
*/

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

const validAnagram1 = (str1: string, str2: string): boolean => {
    // if str1.length is not same as str2.length, return false
    if (str1.length !== str2.length) {
        return false;
    }

    // loop over str1, for each character, check if it exists in str2. (indexOf).   O(n^2) time
    //   if index < 0, return false
    //   if index >= 0, remove that index from str2
    for (let char of str1) {                        // O(n)
        const charIndex = str2.indexOf(char);           // nested O(n)
        if (charIndex < 0) {
            return false;
        } else {
            str2 = str2.substring(0, charIndex) + str2.substring(charIndex + 1);        // O(n) ?
        }
    }

    return true;
};


const validAnagram2 = (str1: string, str2: string): boolean => {
    // if str1.length is not same as str2.length, return false
    if (str1.length !== str2.length) {
        return false;
    }

    // loop over str1, store its counter in a map.  O(n) time.  O(n) space
    const counterMap = {};
    for (let char of str1) {
        // counterMap[char] = counterMap[char] ? counterMap[char] + 1 : 1;      // either way works
        counterMap[char] ? counterMap[char] += 1 : counterMap[char] = 1;
    }

    // loop over str2, for each character, if the character as the key exists in the map, check the counter value.   O(n) time.  O(1) lookup
    //   if the value is 1, delete the key
    //   if the value is > 1, decrement it by 1
    // if the character as the key does not exist in the map, return false
    for (let char of str2) {
        if (counterMap[char]) {
            if (counterMap[char] > 1) {
                counterMap[char] -= 1;
            } else {
                delete counterMap[char];
            }
        } else {
            return false;
        }
    }

    // if the size of the map is > 0. (i.e. if there's any key remaining in the map), return false          O(1) time
    if (Object.keys(counterMap).length > 0) {
        return false;
    }

    return true;
};

console.log(validAnagram2('', ''))                               // true
console.log(validAnagram2('aaz', 'zza'))                         // false
console.log(validAnagram2('anagram', 'nagaram'))                 // true
console.log(validAnagram2('rat', 'car'))                         // false
console.log(validAnagram2('awesome', 'awesom'))                  // false
console.log(validAnagram2('qwerty', 'qeywrt'))                   // true
console.log(validAnagram2('texttwisttime', 'timetwisttext'))     // true

export {};
