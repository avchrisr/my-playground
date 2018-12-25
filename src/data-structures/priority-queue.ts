// PRIORITY QUEUE

// enqueue - O(n) because we're checking priority of items already in the queue
// dequeue - O(1) remove the first

class PriorityQueue {
    storage: any[] = [];
    
    constructor() {}

    enqueue(item: any) {
        // item: ex) {task: 'task1', priority: 2}       // 1 highest, 5 lowest
        if (this.storage.length === 0) {
            this.storage.push(item);
            return;
        }

        let itemAdded = false;
        for (let i=0; i < this.storage.length; i++) {
            if (item.priority < this.storage[i].priority) {
                this.storage.splice(i, 0, item);
                itemAdded = true;
                i = this.storage.length;
            }
        }
        if (!itemAdded) {
            this.storage.push(item);
        }
    }

    dequeue(): any {
        return this.storage.shift();
    }

    getSize(): number {
        return this.storage.length;
    }
}

const pq = new PriorityQueue();

console.log(pq.getSize());
console.log(pq.dequeue());

pq.enqueue({task: 'task1', priority: 3});
pq.enqueue({task: 'task2', priority: 5});
pq.enqueue({task: 'task3', priority: 1});
pq.enqueue({task: 'task4', priority: 2});
pq.enqueue({task: 'task5', priority: 3});
pq.enqueue({task: 'task6', priority: 1});

console.log(pq.getSize());
console.log(pq);
console.log(pq.dequeue());
console.log(pq);
console.log(pq.getSize());


