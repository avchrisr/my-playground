/*
Given a string, find the length of the longest substring without repeating characters.

Example 1:
Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Example 3:
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
*/

// solution 1
// iterate and store each character into a Set until a character is already in the Set. build a string.
// repeat until all characters in the input string have been iterated. the longest string built wins
// Time complexity: O(n^2)
// Space complexity: O(n)

// RESULT: Runtime: 272 ms, faster than 35.72% of JavaScript online submissions for Longest Substring Without Repeating Characters.

const lengthOfLongestSubstringUsingSet = (s: string) => {
    if (s.length < 2) {
        return s.length;
    }

    const characterSet = new Set();
    let longestSubString: string = '';
    let currentSubString: string = '';

    for (let i=0; i < s.length; i++) {
        const char = s[i];
        if (!characterSet.has(char)) {
            characterSet.add(char);
            currentSubString += char;
        } else {
            if (longestSubString.length < currentSubString.length) {
                longestSubString = currentSubString;
            }
            currentSubString = currentSubString.substring(currentSubString.indexOf(char) + 1) + char;
            characterSet.clear();
            for (let j=0; j < currentSubString.length; j++) {
                characterSet.add(currentSubString[j]);
            }
        }
    }
    if (longestSubString.length < currentSubString.length) {
        longestSubString = currentSubString;
    }

    // console.log(`longestSubString = ${longestSubString} | currentSubString = ${currentSubString}`);

    return longestSubString.length;
};

// solution 2
// iterate and build the string until a repeated character is met
// no need to use Set, just work with a string object
// Time complexity: O(n)
// Space complexity: O(1) string vs. array O(n) ?

// RESULT: Runtime: 80 ms, faster than 95.90% of JavaScript online submissions for Longest Substring Without Repeating Characters.

const lengthOfLongestSubstring = (s: string) => {
    let longestSubString: string = '';
    let currentSubString: string = '';

    for (let i=0; i < s.length; i++) {
        const char = s[i];
        const charIndex = currentSubString.indexOf(char);
        if (charIndex < 0) {
            currentSubString += char;
        } else {
            if (longestSubString.length < currentSubString.length) {
                longestSubString = currentSubString;
            }
            currentSubString = currentSubString.substring(charIndex + 1) + char;
        }
    }
    if (longestSubString.length < currentSubString.length) {
        longestSubString = currentSubString;
    }

    // console.log(`longestSubString = ${longestSubString} | currentSubString = ${currentSubString}`);

    return longestSubString.length;
};

// const input: string = 'abcabcbb';
// const input: string = 'bbbbb';
// const input: string = 'pwwkew';
const input: string = 'dvdf';

console.log(lengthOfLongestSubstring(input));
