/*
This problem was asked by Microsoft.

Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

For example, given [100, 4, 200, 1, 3, 2], the longest consecutive element sequence is [1, 2, 3, 4]. Return its length: 4.

Your algorithm should run in O(n) complexity.
*/

/*
SOLUTION

O(n) time | O(n) space

- add the array items to a hashmap and work with the hashmap: O(n) time | O(n) space
- set the longestLength = 0;
- for each item(num) in the hashmap				O(n) time
    if hashmap[num-1] exists, continue
	else
	  set length counter = 1;
	  while hashmap[num+1] exists, increment the length counter
	  after the while loop, if the length counter > longestLength, set longestLength = length counter
*/

const longestLengthSequence = (nums = []) => {
    if (nums.length < 2) {
        return nums.length;
    }

    const numsMap = {};
    for (let i=0; i < nums.length; i++) {
        numsMap[nums[i]] = true;
    }

    let longestLength = 0;
    Object.keys(numsMap).forEach((num) => {
        num = parseInt(num);

        if (!((num-1) in numsMap)) {
            let count = 1;
            let tempNum = num + 1;
            while (numsMap[tempNum]) {
                count += 1;
                tempNum += 1;
            }
            if (longestLength < count) {
                longestLength = count;
            }
        }
    });
    return longestLength;
};

const input = [100, 4, 200, 1, 3, 2, 19, 18, 17, 16, 15, 14, 13];

console.log(longestLengthSequence(input));

