/*
This problem was asked by Pinterest.
Given an integer list where each number represents the number of hops you can make, determine whether you can reach to the last index starting at index 0.
For example, [2, 0, 1, 0] returns True while [1, 1, 0, 1] returns False.
*/

/*
SOLUTION  --  O(n) worst case where it visits every item.  |  O(m) m: number of hops

loop over the given array of integers
if the current item is 0 and the current index < array.length - 1 (not including the very last index), then return false
else
  hop over to the next item. (current item + current index)

return false    (covers the scenario where it went out of bounds after the hop)
*/

const canReachLastIndex = (nums = []) => {
    for (let i=0; i < nums.length; i++) {
        if (i === nums.length - 1) {
            // reached the last index
            return true;
        }
        if (nums[i] === 0 && i < nums.length - 1) {
            return false;
        }
        i += nums[i];
    }
    return false;
};

// const input = [2, 0, 1, 0];
const input = [1, 1, 0, 1];

console.log(canReachLastIndex(input));

