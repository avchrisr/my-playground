// --- Directions
// Given an array and chunk size, divide the array into many subarrays where each subarray is of length size

// --- Examples
// chunk([1, 2, 3, 4], 2) --> [[ 1, 2], [3, 4]]
// chunk([1, 2, 3, 4, 5], 2) --> [[ 1, 2], [3, 4], [5]]
// chunk([1, 2, 3, 4, 5, 6, 7, 8], 3) --> [[ 1, 2, 3], [4, 5, 6], [7, 8]]
// chunk([1, 2, 3, 4, 5], 4) --> [[ 1, 2, 3, 4], [5]]
// chunk([1, 2, 3, 4, 5], 10) --> [[ 1, 2, 3, 4, 5]]


// SOLUTION 1  --  O(n) time | O(n) space
// loop over the input array. keep a counter, and if the counter === size, create a new array and push it to the output array.
// if i === input array.length - 1, then create a new array and push it to the output array

// SOLUTION 2  --  O(n/2) time == O(n) time | O(n) space
// while index < array.length, create a subarray using Array.slice(), and push it to the output array

const chunk2 = (array, size) => {
    const output = [];
    let index = 0;
    while (index < array.length) {
        output.push(array.slice(index, index + size));
        index += size;
    }    
    return output;
};

const chunk1 = (array, size) => {
    const output = [];
    let counter = 0;
    for (let i=0; i < array.length; i++) {
        counter += 1;
        if (counter === size) {
            const subArr = [];
            
            let k = 0;
            for (let j = i - counter + 1; k < counter; j++, k++) {
                subArr.push(array[j]);
            }
            output.push(subArr);
            counter = 0;
        }
    }

    if (counter > 0) {
        const subArr = [];
        let k = 0;
        for (let j = array.length - 1 - counter + 1; k < counter; j++, k++) {
            subArr.push(array[j]);
        }
        output.push(subArr);
    }
    return output;
};

console.log(chunk2([1, 2, 3, 4], 2));
console.log(chunk2([1, 2, 3, 4, 5], 2));
console.log(chunk2([1, 2, 3, 4, 5, 6, 7, 8], 3));
console.log(chunk2([1, 2, 3, 4, 5], 4));
console.log(chunk2([1, 2, 3, 4, 5], 10));

module.exports = chunk2;
