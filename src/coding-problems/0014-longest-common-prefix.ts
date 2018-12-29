/*
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"


Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.

Note: All given inputs are in lowercase letters a-z.
*/

// SOLUTION (naive) - O(n^2) time.  O(1) space
// using the first item in the array, iterate each character, and check against each item in the array
// if the character matches, proceed.
// if all characters of the first item have been iterated through or the character doesn't match any of the item, exit

// RESULT: Runtime: 56 ms, faster than 89.35% of JavaScript online submissions for Longest Common Prefix.

const longestCommonPrefixNaive = (input: string[]): string => {
    if (input.length === 0) {
        return '';
    }
    if (input.length === 1) {
        return input[0];
    }

    let firstItem = input[0];
    let commonPrefix: string = '';
    for (let i=0; i < firstItem.length; i++) {
        let char = firstItem[i];
        for (let j=1; j < input.length; j++) {
            if (char === input[j][i]) {
                if (j === input.length - 1) {
                    // if j is the very last item, then it means all the preceding items were a match
                    commonPrefix += char;
                }
            } else {
                j = input.length;   // break;
                i = firstItem.length;
            }
        }
    }

    return commonPrefix;
}

// const input = ["flower","flow","flight"];
// const input = ["dog","racecar","car"];
// const input = ["a"];
const input = ["aca", "cba"];

console.log(longestCommonPrefixNaive(input));

export {};
