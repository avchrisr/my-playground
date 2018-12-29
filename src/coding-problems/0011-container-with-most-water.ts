/*
Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai). 
n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). 
Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

ex)
Input: [1,8,6,2,5,4,8,3,7]
Output: 49
*/

// SOLUTION 1
// for each item in the array, iterate each item to calculate the area. store max.
// Time: O(n^2)
// Space: O(1)

const maxAreaBruteForce = (heights: number[]): number => {
    let max: number = 0;

    for (let i=0; i < heights.length - 1; i++) {
        for (let j=i+1; j < heights.length; j++) {
            let tempArea = (j-i) * Math.min(heights[i], heights[j]);

            // console.log(`(${j}-${i}) * Math.min(${heights[i]}, ${heights[j]}) = ${tempArea}`);

            if (tempArea > max) {
                max = tempArea;
            }
        }
    }  

    return max;
};


// SOLUTION 2
// start from the first and last index. take the smaller value and calculate the area. move the left pointer up or right pointer down, whichever's value is smaller
// while l < r
// Time: O(n)
// Space: O(1)

const maxArea = (heights: number[]): number => {
    let max: number = 0;
    let left = 0, right = heights.length - 1;

    while (left < right) {
        let tempArea = (right - left) * Math.min(heights[left], heights[right]);
        if (tempArea > max) {
            max = tempArea;
        }

        if (heights[left] <= heights[right]) {
            left += 1;
        } else {
            right -= 1;
        }
    }

    return max;
};


const heights: number[] = [1,8,6,2,5,4,8,3,7];

console.log(maxArea(heights));

export {};
