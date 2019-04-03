/*
This problem was asked by Google.
Given two strings A and B, return whether or not A can be shifted some number of times to get B.
For example, if A is 'abcde' and B is 'cdeab', return true. If A is 'abc' and B is 'acb', return false.
*/

/*
SOLUTION  --  O(n^3) time - n is the length of string | O(1) space

loop over each character in the string A
- if currStringA === stringB, return true
  else
    currStringA = stringA.substring(i) + stringA.substring(0, i);
  return false
*/

const determineAisB = (strA, strB) => {
    if (strA.length !== strB.length) {
        return false;
    }

    let currStrA = strA;                        // primitive data types like string are copied by value. (not passed by reference like objects)
    for (let i=1; i <= strA.length; i++) {
        console.log(`currStrA = ${currStrA} | strA = ${strA} | strB = ${strB}`);
        if (currStrA === strB) {
            return true;
        }
        currStrA = strA.substring(i) + strA.substring(0, i);
    }

    return false;
};

console.log(determineAisB('abcde', 'cdeab'));
console.log(determineAisB('abc', 'acb'));


