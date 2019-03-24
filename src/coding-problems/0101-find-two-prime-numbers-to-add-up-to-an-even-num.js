/*
This problem was asked by Alibaba.

Given an even number (greater than 2), return two prime numbers whose sum will be equal to the given number.

A solution will always exist. See Goldbach’s conjecture.

Example:

Input: 4
Output: 2 + 2 = 4
If there are more than one solution possible, return the lexicographically smaller solution.

If [a, b] is one solution with a <= b, and [c, d] is another solution with c <= d, then

[a, b] < [c, d]
If a < c OR a==c AND b < d.
*/

// Prime number 
// 1. can only be an odd number. can only be divided by itself.  (covered by #2 below as '2' is a prime number) 
// 2. cannot be dividied by any of the preceding prime numbers.

/*
SOLUTION  --  O(n^2) time | O(m) space

- find prime numbers smaller than the given input number.   O(m) space   (m == number of prime numbers smaller than the input number)
- based on the prime numbers, find a pair of prime numbers that add up to the given input number
  - for each prime number     (nested loop - O(n^2))
    - for each prime number
      - check sum == given input number
*/

const findTwoPrimeNumbers = (evenNumber) => {
    if (evenNumber % 2 !== 0) {
        throw new Error(`the input number must be an even number`);
    }

    const primeNumbers = [2];
    for (let i=3; i < evenNumber; i++) {
        if (primeNumbers.every((primeNum) => i % primeNum !== 0)) {
            primeNumbers.push(i);
        }
    }

    console.log(`primeNumbers: ${primeNumbers}`);

    for (let i=0; i < primeNumbers.length; i++) {
        for (let j=0; j < primeNumbers.length; j++) {
            if (primeNumbers[i] + primeNumbers[j] === evenNumber) {
                return [primeNumbers[i], primeNumbers[j]];
            }
        }
    }

    return `ERROR: should never be here according to Goldbach’s conjecture.`;
};

console.log(findTwoPrimeNumbers(556));




