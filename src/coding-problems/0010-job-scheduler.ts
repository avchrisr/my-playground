/*
This problem was asked by Apple.
Implement a job scheduler which takes in a function f and an integer n, and calls f after n milliseconds.
*/

const jobScheduler = (cb: Function, delay: number) => {
    console.log(`Waiting ${delay}ms delay...`);
    setTimeout(cb, delay);
};

const delay = 3000;
const myFunction = () => {
    console.log(`executed myFunction.`);
};

jobScheduler(myFunction, delay);

export {};
