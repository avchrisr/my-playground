/*
This problem was asked by Facebook.
Given a function f, and N return a debounced f of N milliseconds.
That is, as long as the debounced f continues to be invoked, f itself will not be called for N milliseconds.
*/

let myTimeout;
const debouncedFunc = (f, n = 0) => {
    console.log(`n = ${n}`);

    clearTimeout(myTimeout);
    
    myTimeout = setTimeout(() => {
        f();
    }, n);
};

const myFunc = () => {
    console.log(`my func called!`);
};

debouncedFunc(myFunc, 100);
debouncedFunc(myFunc, 100);
debouncedFunc(myFunc, 100);
debouncedFunc(myFunc, 100);
