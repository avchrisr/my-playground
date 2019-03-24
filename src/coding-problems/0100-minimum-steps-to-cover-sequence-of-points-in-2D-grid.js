/*
This problem was asked by Google.

You are in an infinite 2D grid where you can move in any of the 8 directions:

 (x,y) to
    (x+1, y),
    (x-1, y),
    (x, y+1),
    (x, y-1),
    (x-1, y-1),
    (x+1,y+1),
    (x-1,y+1),
    (x+1,y-1)

You are given a sequence of points and the order in which you need to cover the points. Give the minimum number of steps in which you can achieve it. You start from the first point.

Example:

Input: [(0, 0), (1, 1), (1, 2)]
Output: 2

It takes 1 step to move from (0, 0) to (1, 1). It takes one more step to move from (1, 1) to (1, 2).
*/

/*
SOLUTION  --  O(n) time | O(1) space

In 2D grid, the minimum number of steps is the FROM (x1,y1) TO (x2,y2).
ABS(x2-x1). ABS(y2-y1). whichever is greater is the minimum number of steps required to move from Point1 to Point2

- if the sequence of points' length < 2, return 0
- iterate over each point from index 1  --  O(n) time
  - calculate the diff. ABS(x2-x1). ABS(y2-y1). add whichever is greater to the minimumNumSteps
*/

const minimumNumSteps = (seqPoints = []) => {
    if (seqPoints.length < 2) {
        return 0;
    }

    let minSteps = 0;
    for (let i=1; i < seqPoints.length; i++) {
        let prevPoint = seqPoints[i-1];
        let currPoint = seqPoints[i];

        let xDiff = Math.abs(currPoint[0] - prevPoint[0]);
        let yDiff = Math.abs(currPoint[1] - prevPoint[0]);
        minSteps = xDiff > yDiff ? minSteps + xDiff : minSteps + yDiff;
    }
    return minSteps;
};

const seq = [[0,0], [1,1], [1,2], [4,5], [-3, -2]];

console.log(minimumNumSteps(seq));
