// BUBBLE SORT  --  O(n^2) time | O(1) space

const bubbleSort = (input: number[]): number[] => {
    for (let i = input.length; i > 0; i--) {
        let swapped = false;
        
        for (let j=0; j < i - 1; j++) {
            if (input[j+1] < input[j]) {
                // swap
                const temp = input[j];
                input[j] = input[j+1];
                input[j+1] = temp;

                swapped = true;
            }
        }

        if (!swapped) {
            // array is already sorted. no need further iteration. break
            i = 0;
        }
    }
    return input;
};

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(bubbleSort(input));


export {};
