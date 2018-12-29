/*
This problem was asked by Twitter.

You run an e-commerce website and want to record the last N order ids in a log. Implement a data structure to accomplish this, with the following API:

record(order_id): adds the order_id to the log
get_last(i): gets the ith last element from the log. i is guaranteed to be smaller than or equal to N.

You should be as efficient with time and space as possible.
*/

// SOLUTION
// array.  get(i)  - O(1)
//         add(id) - O(n) time & space

// linkedlist & stacks.  get(i)  - O(n)
//                       add(id) - O(1)  time & space

// hashmap/hashtable.   get(i)  - O(1)
//                      add(id) - O(1)   time & space

// binary search tree.  get(i) - O(log n) time, but in this case, it's in a sequential order, unbalanced to the right. O(n)
//                      add(id) - O(log n)  time, but in this case we're already adding to tht end. so O(n).  O(1) space


// Choice: Hashmap

class Logs {
    storage: Map<number, string>;
    counter: number;

    constructor() {
        this.storage = new Map();
        this.counter = 0;
    }

    record(order_id: string): void {
        this.counter += 1;
        this.storage.set(this.counter, order_id);
    }

    getLast(i: number): string {
        return this.storage.get(i);
    }
}

const twitterLogs = new Logs();

twitterLogs.record('id1');
twitterLogs.record('id4');
twitterLogs.record('id2');
twitterLogs.record('id3');

console.log(twitterLogs.getLast(3));    // 3rd item = id2
console.log(twitterLogs);

export {};
