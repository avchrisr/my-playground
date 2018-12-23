/*
Given a string s, find the longest palindromic substring in s.
You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.

Example 2:

Input: "cbbd"
Output: "bb"

Example 3:

Input: "a"
Output: "a"

Example 4:

Input: "ac"
Output: "a"
*/

// Time complexity: O(n^3)  --  TOO SLOW.  DO NOT USE THIS

const longestPalindromeSlow = (input: string = '') => {
    let longestPalindromes: string = '';
    let longestPalindromesLength: number = 0;

    for (let i=0; i < input.length; i++) {
        const tempStr1 = input.substring(i, input.length);

        if (tempStr1.length > longestPalindromesLength) {
            // tempStr1 starts from the beginning, so tempStr2 must start from the end
            for (let j = tempStr1.length; j > 0; j--) {
                const tempStr2 = tempStr1.substring(0, j);
    
                if (tempStr2.length > longestPalindromesLength) {
                    // check if the substring is a palindrome
                    const reversedTempStr2 = tempStr2.split('').reverse().join('');
                    // const tempArr = tempStr2.split('');
                    // for (let k=0, m=tempArr.length - 1; k < m; k++, m--) {
                    //     let temp = tempArr[k];
                    //     tempArr[k] = tempArr[m];
                    //     tempArr[m] = temp;
                    // }
                    // const reversedTempStr2 = tempArr.join('');
                    
                    // console.log(`tempStr1 = ${tempStr1} | tempStr2 = ${tempStr2} | reversedTempStr2 = ${reversedTempStr2}`);
                    
                    if (tempStr2 === reversedTempStr2) {
                        longestPalindromesLength = tempStr2.length;
                        longestPalindromes = tempStr2;

                        // no need to proceed further. exit this sub loop
                        j = 0;
                    }
                }
            }           
        }
    }
    return longestPalindromes;
};


// Time complexity: O(n^2)

const longestPalindrome = (input: string = '') => {
    let longestPalindromeBeginIndex: number = 0;
    let longestPalindromeEndIndex: number = 0;

    if (input.length < 2) {
        return input;
    }

    for (let i=1; i < input.length; i++) {
        checkPalindrome(input, i, i);       // accounting for odd middle.   ex) abcba
        checkPalindrome(input, i, i+1);     // accounting for even middle.  ex) abccba
    }

    return input.substring(longestPalindromeBeginIndex, longestPalindromeEndIndex + 1);     // adding 1 to make the end position inclusive using .substring()

    function checkPalindrome(input: string, start: number, end: number) {
        while (start >= 0 && end < input.length && input[start] === input[end]) {
            start--;
            end++;
        }

        // back to the last valid index
        start++;
        end--;

        if (end - start > longestPalindromeEndIndex - longestPalindromeBeginIndex) {
            longestPalindromeBeginIndex = start;
            longestPalindromeEndIndex = end;
        }
    }
};

// const input: string = 'absdfwoiefwe';
// const input: string = 'badab';
// const input: string = 'a';
const input: string = 'civilwartestingwhetherthatnaptionoranynartionsoconceivedandsodedicatedcanlongendureWeareqmetonagreatbattlefiemldoftzhatwarWehavecometodedicpateaportionofthatfieldasafinalrestingplaceforthosewhoheregavetheirlivesthatthatnationmightliveItisaltogetherfangandproperthatweshoulddothisButinalargersensewecannotdedicatewecannotconsecratewecannothallowthisgroundThebravelmenlivinganddeadwhostruggledherehaveconsecrateditfaraboveourpoorponwertoaddordetractTgheworldadswfilllittlenotlenorlongrememberwhatwesayherebutitcanneverforgetwhattheydidhereItisforusthelivingrathertobededicatedheretotheulnfinishedworkwhichtheywhofoughtherehavethusfarsonoblyadvancedItisratherforustobeherededicatedtothegreattdafskremainingbeforeusthatfromthesehonoreddeadwetakeincreaseddevotiontothatcauseforwhichtheygavethelastpfullmeasureofdevotionthatweherehighlyresolvethatthesedeadshallnothavediedinvainthatthisnationunsderGodshallhaveanewbirthoffreedomandthatgovernmentofthepeoplebythepeopleforthepeopleshallnotperishfromtheearth';

// console.log(longestPalindrome(input));

console.time('BENCHMARK');
console.log(longestPalindrome(input));
console.timeEnd('BENCHMARK');

