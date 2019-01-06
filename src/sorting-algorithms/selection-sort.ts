// SELECTION SORT  --  O(n^2) time | O(1) space

const selectionSort = (input: number[]): number[] => {
    for (let i=0; i < input.length - 1; i++) {
        let lowest = i;

        for (let j = i+1; j < input.length; j++) {
            if (input[j] < input[lowest]) {
                lowest = j;
            }
        }

        if (lowest !== i) {
            // swap
            const temp = input[lowest];
            input[lowest] = input[i];
            input[i] = temp;
        }
    }
    return input;
};

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(selectionSort(input));


export {};
