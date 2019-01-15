const quickSort = (arr: number[], left = 0, right = arr.length - 1): number[] => {
    // base case: left === right. just return the array.
    if (left < right) {
        const pivotIndex = pivot(arr, left, right);

        // left
        quickSort(arr, left, pivotIndex-1);

        // right
        quickSort(arr, pivotIndex+1, right);
    }
    return arr;
};

function pivot(arr: number[], start = 0, end = arr.length - 1) {
    function swap(arr: number[], i: number, j: number) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    const pivot = arr[start];       // always picking the first element as the pivot (to sort and put it in correct position and return its index)
    let swapIndex = start;

    for (let i = start + 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            // swap. goal is to place all smaller numbers to the left of Pivot, and larger numbers to the right of Pivot
            swapIndex += 1;
            swap(arr, swapIndex, i);
        }
    }

    // swap the pivot (in this case, the first element that we chose) with the last item that was swapped.
    swap(arr, start, swapIndex);

    return swapIndex;
}

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(quickSort(input));


export {};
