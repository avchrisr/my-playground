const mergeSort = (arr: number[]): number[] => {
    // base case
    if (arr.length <= 1) {
        return arr;
    }

    // divide and conquer
    const middle = Math.floor((arr.length) / 2);
    const leftArray = mergeSort(arr.slice(0, middle));
    const rightArray = mergeSort(arr.slice(middle));
    return merge(leftArray, rightArray);
};

function merge(arr1: number[], arr2: number[]): number[] {
    const result = [];
    let arr1Index = 0;
    let arr2Index = 0;

    while (arr1Index < arr1.length && arr2Index < arr2.length) {
        if (arr1[arr1Index] < arr2[arr2Index]) {
            result.push(arr1[arr1Index]);
            arr1Index += 1;
        } else {
            result.push(arr2[arr2Index]);
            arr2Index += 1;
        }
    }

    while (arr1Index < arr1.length) {
        result.push(arr1[arr1Index]);
        arr1Index += 1;
    }
    while (arr2Index < arr2.length) {
        result.push(arr2[arr2Index]);
        arr2Index += 1;
    }

    return result;
}

const input = [1,98,25,34,3,2,98,55,35,31];

console.log(mergeSort(input));


export {};
