// INSERTION SORT  --  O(n^2) time | O(1) space

const insertionSort = (input: number[]): number[] => {
    for (let i=1; i < input.length; i++) {
        let currVal = input[i];
        let j = i-1;

        while (j >= 0 && currVal < input[j]) {
            input[j+1] = input[j];
            j -= 1;
        }
        
        input[j+1] = currVal;
    }
    return input;
};

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(insertionSort(input));


export {};
