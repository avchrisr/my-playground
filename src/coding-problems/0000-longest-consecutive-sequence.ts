// Find the longest consecutive sequence length in an array

// ex) Given an input of following array [2, 1, 5, 9, 4, 3], the longest consecutive sequence is [1, 2, 3, 4, 5] so the output is 5

// Solution 1
// 1. sort the array. O(n log n) or O(n^2) time.  O(1) or O(n) space.
// 2. scan the array that's now sorted in order, and keep a count that increments for each iterating number if the current number is previous number + 1
//    if it's the same number as the previous number (duplicate), then don't increment the counter and just proceed onto the next number.
//    if it's not, compare it to the longest count, and set it if it's greater than the longest counter so far. And reset the counter.
//    O(n)


// Solution 2
// 1. copy the array to a Set. it will remove all duplicates automatically. O(n) time.  O(n) space.
// 2. iterate through the array,   O(n log n)
//    if there's current number - 1 in the Set, then proceed onto the next number
//    in a while loop, 
//      if there's current number + 1 in the Set, then increment the counter, and proceed.
//    otherwise, compare the current counter to the longest count, and set it if it's greater than the longest counter so far, and reset the counter


// SOLUTION 1
const longestConsecutiveSequence = (input: number[]): number => {
    // by default, the array.sort() compares items as strings even if the items themselves are numbers. so 10 would be placed before 2.
    const sortedArray = input.sort((a, b) => {      // sorts 'in place'.  no extra space.  O(1) ??
        return a - b;
    });

    let longestSequenceLength = 0;
    let counter = 1;
    for (let i=1; i < sortedArray.length; i++) {
        if (sortedArray[i] === sortedArray[i-1]) {
            // do nothing, and proceed
        } else if (sortedArray[i] === (sortedArray[i-1] + 1)) {
            counter += 1;    
        } else {
            if (counter > longestSequenceLength) {
                longestSequenceLength = counter;
                counter = 1;
            }
        }
    }

    if (counter > longestSequenceLength) {
        longestSequenceLength = counter;
    }

    return longestSequenceLength;
};


// SOLUTION 2
const longestConsecutiveSequenceSet = (input: number[]): number => {
    const numSet = new Set();

    // O(n) space.  O(n) time.
    for (let i=0; i < input.length; i++) {
        numSet.add(input[i]);    
    }

    let longestSequenceLength: number = 0;
    let counter: number = 1;

    // O(n log n) time.
    const numSetIterator = numSet.values();
    for (let i of numSetIterator) {
        console.log(`i = ${i}`);

        counter = 1;
        if (numSet.has(i-1)) {
            console.log(`has the PREV NUMBER ${i-1}`);
            // do nothing
        } else {
            let currNum = i;
            while (numSet.has(currNum+1)) {
                console.log(`has the NEXT NUMBER ${currNum+1}`);
                counter += 1;
                currNum += 1;
            }
        }

        if (counter > longestSequenceLength) {
            longestSequenceLength = counter;
        }
    }

    return longestSequenceLength;
};


const input: number[] = [2, 1, 5, 9, 4, 3, 8, 1, 2, 10, 7, 6];
console.log(longestConsecutiveSequenceSet(input));

export {};
