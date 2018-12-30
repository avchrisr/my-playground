/*
VALID PARENTHESES

Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Note that an empty string is also considered valid.
-----------------
Example 1:

Input: "()"
Output: true
-----------------
Example 2:

Input: "()[]{}"
Output: true
-----------------
Example 3:

Input: "(]"
Output: false
-----------------
Example 4:

Input: "([)]"
Output: false
-----------------
Example 5:

Input: "{[]}"
Output: true
-----------------
*/

// SOLUTION
// if the string is an odd length, return false
// start from index 0 of the string. add it to a stack if it's an open(left) parenthesis.  --  O(n) time
// as you encounter a close (right) parenthesis, check if the latest item in the stack matches it, if so, pop.  --  O(n) space
// if it does not match, return false
// after the iteration is finished, if there's any item left in the stack, return false
// --> O(n) time | O(n) space complexity

// RESULT: Runtime: 56 ms, faster than 58.45% of JavaScript online submissions for Valid Parentheses.

const isValid = (s: string): boolean => {
    if (s.length === 0) {
        return true;
    }
    if (s.length % 2 === 1) {
        return false;
    }

    const stack = [s[0]];
    for (let i=1; i < s.length; i++) {
        if (s[i] === '[' || s[i] === '(' || s[i] === '{') {
            stack.push(s[i]);
        } else {
            switch (s[i]) {
                case ']':
                    if (stack[stack.length-1] !== '[') {
                        return false;
                    } else {
                        stack.pop();
                    }
                    break;
                case ')':
                    if (stack[stack.length-1] !== '(') {
                        return false;
                    } else {
                        stack.pop();
                    }
                    break;
                case '}':
                    if (stack[stack.length-1] !== '{') {
                        return false;
                    } else {
                        stack.pop();
                    }
                    break;
                default:
                    // unrecognized parenthesis
                    return false;
            }
        }
    }

    if (stack.length > 0) {
        return false;
    }
    
    return true;
};

const testData = [
    {
        input: '()',
        output: true,
        actualOutput: undefined
    },
    {
        input: '()[]{}',
        output: true,
        actualOutput: undefined
    },
    {
        input: '(]',
        output: false,
        actualOutput: undefined
    },
    {
        input: '([)]',
        output: false,
        actualOutput: undefined
    },
    {
        input: '{[]}',
        output: true,
        actualOutput: undefined
    }
];

testData.forEach((data) => {
    data.actualOutput = isValid(data.input);
});

console.table(testData);

export {};
