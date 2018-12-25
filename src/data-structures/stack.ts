// STACK

// pop, push, peek, length/size

// approach 1. use the native array as stack in JavaScript.
// approach 2. create a Stack class

class Stack {
    size: number;
    storage: object;

    constructor() {
        this.size = 0;
        this.storage = {};
    }

    // size
    getSize(): number {
        return this.size;
    }

    // push
    push(data: any) {
        this.size += 1;
        this.storage[this.size] = data;
    }

    // pop
    pop(): any {
        if (this.size === 0) {
            return undefined;
        }
        const item = this.storage[this.size];
        delete this.storage[this.size];
        this.size -= 1;
        return item;
    }

    // peek
    peek(): any {
        return this.storage[`${this.size}`];
    }
}


const stack = new Stack();

console.log(stack.getSize());   // 0

stack.push(5);
stack.push(4);
stack.push(16);
stack.push(20);

console.log(stack.getSize());   // 4

console.log(stack.peek());      // 20
console.log(stack.getSize());   // 4

console.log(stack.pop());       // 20
console.log(stack.getSize());   // 3

console.log(JSON.stringify(stack, null, 4));






