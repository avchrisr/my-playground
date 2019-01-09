/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

2 - abc
3 - def
4 - ghi
5 - jkl
6 - mno
7 - pqrs
8 - tuv
9 - wxyz

Example:

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]
*/

// SOLUTION  --  O(2^n) - exponential time | O(2^n) exponential space (output)
// DFS traversal using a queue (FIFO)
// for each digit in the input, translate each digit to the corresponding mapping value
//  and add each character of the mapping value to the queue
// get each character from the queue (unshift), build up string combinations by iterating each character of the next digit mapping value, if 

// RESULT: Runtime: 52 ms, faster than 88.91% of JavaScript online submissions for Letter Combinations

const letterCombinations = (digits: string): string[] => {
    if (digits.length === 0) {
        return [];
    }

    const output = [];
    const mapping = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };
    
    iterateEachDigitMapping(digits);

    function iterateEachDigitMapping(digits: string, digitIndex: number = 0, subsequentDigitCount: number = 0, combo: string = '') {
        // base case
        if (combo.length === digits.length) {
            output.push(combo);
            return;
        }

        if (digitIndex + subsequentDigitCount < digits.length) {
            for (let char of mapping[digits[digitIndex + subsequentDigitCount]]) {
                iterateEachDigitMapping(digits, digitIndex, subsequentDigitCount + 1, combo + char);
            }
        }
    }

    return output;
};

const input = '23';
const output = letterCombinations(input);
console.log(output);
console.log(`total size = ${output.length}`);


export {};
