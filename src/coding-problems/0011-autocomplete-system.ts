/*
This problem was asked by Twitter.

Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.
For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].

Hint: Try preprocessing the dictionary into a more efficient data structure to speed up queries.
*/

// solution 1:
// iterate over each item and run .indexOf(s) == 0 ?
// time complexity: O(n)
// space complexity: O(n)


const queryString = `de`;
const possibleStrings = ['dog', 'deer', 'deal'];

const matchingPrefix = (prefix: string, dataSet: string[]): string[] => {
    const result: string[] = [];
    for (let value of dataSet) {
        if (value.indexOf(prefix) === 0) {
            result.push(value);
        }
    }
    return result;
}

console.log(matchingPrefix(queryString, possibleStrings));


