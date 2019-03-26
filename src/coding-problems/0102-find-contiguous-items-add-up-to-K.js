/*
This problem was asked by Lyft.
Given a list of integers and a number K, return which contiguous elements of the list sum to K.
For example, if the list is [1, 2, 3, 4, 5] and K is 9, then it should return [2, 3, 4], since 2 + 3 + 4 = 9.
*/
/*
SOLUTION

assumption) is the list of integers sorted?  Not necessarily. return the first occurrence of contiguous elements that add up to K.

1. iterate through each number, and add up					O(n^2) time | O(n) space
	 add each number to a temporary array (sequence)

     if the sum > K, move onto the next number
	 if sum === K, return the sequence
	 
   return null;

2. keep track of current sum and the startIndex - currIndex.            O(n) time | O(1) space
   iterate through each number
   WHILE currentSum > K, substrack the number at the startIndex
   if currentSum === K, return the numbers from startIndex to currIndex

   return null
*/

const findElements = (nums = [], k = 0) => {
    console.log(`k = ${k}`);

    if (nums.length === 0 || k <= 0) {
        throw new Error(`invalid input`);
    }

    let currSum = 0;
    let startIndex = 0;
    for (let i=0; i < nums.length; i++) {
        currSum += nums[i];

        console.log(`currSum[${i}] = ${currSum}`);

        while (currSum > k) {
            currSum -= nums[startIndex];
            startIndex += 1;
        }

        if (currSum === k) {
            return nums.slice(startIndex, i+1);
        }
    }
    return null;
};

const input = [1, 2, 3, 4, 5];
console.log(findElements(input, 9));
