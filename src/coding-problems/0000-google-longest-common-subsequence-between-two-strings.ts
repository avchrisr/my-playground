/*
Write a function that takes two strings, s1 and s2. and returns the longest common subsequence of s1 and s2

"ABAZDC", "BACBAD"  => "ABAD"
"AGGTAB", "GXTXAVB" => "GTAB"
"aaaa"  , "aa"      => "aa"
*/

// for each character in s1, iterate s2 (with starting index is i) and see if there's a matching character. If so, build a temp string
// at the end of each iteration in s1, see if the temp string is longer than the current longest common subsequence
// Time complexity: O(n^3) - n-cubed
// Space complexity: just a couple of variables. O(1)

const findLongestSubsequence = (s1: string, s2: string, s1StartIndex = 0, s2StartIndex = 0, repeat = true): string => {
    let longestSubsequence: string = '';
    let temp: string = '';

    for (let i=s1StartIndex; i < s1.length; i++) {
        for (let j = s2StartIndex; j < s2.length; j++) {
            if (s1[i] === s2[j]) {
                temp += s1[i];
                s2StartIndex = j+1;
                j = s2.length;          // break;
            }
        }

        let temp2: string = '';
        if (repeat) {
            temp2 = findLongestSubsequence(s1, s2, i, 0, false);
        }

        let temp3 = temp.length > temp2.length ? temp : temp2;

        if (temp3.length > longestSubsequence.length) {
            longestSubsequence = temp3;
        }
    }

    return longestSubsequence;
}

const testData = [
    {
        s1: 'ABAZDC',
        s2: 'BACBAD',
        expected: 'ABAD',
        actual: ''
    },
    {
        s1: 'AGGTAB',
        s2: 'GXTXAVB',
        expected: 'GTAB',
        actual: ''
    },
    {
        s1: 'aaaa',
        s2: 'aa',
        expected: 'aa',
        actual: ''
    }
];

testData.forEach((test) => {
    const actual = findLongestSubsequence(test.s1, test.s2);
    test.actual = actual;
});

console.log(testData);

export {};
