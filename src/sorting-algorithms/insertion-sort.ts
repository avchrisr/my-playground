// INSERTION SORT  --  O(n^2) time | O(1) space

const insertionSort = (arr: number[]): number[] => {

    // two pointers. x and y
    // x starts at index 1 and increments till the end of the array
    // y = x-1 and decrements until conditions are met
    //    while (y >= 0 && arr[y+1] < arr[y])
    //        swap
    //        y--

    for (let x=1; x < arr.length; x++) {
        let y = x-1;
        while (y >= 0 && arr[y+1] < arr[y]) {
            // swap
            const temp = arr[y+1];
            arr[y+1] = arr[y];
            arr[y] = temp;
            y -= 1;
        }
    }
        
    return arr;
};

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(insertionSort(input));


export {};
