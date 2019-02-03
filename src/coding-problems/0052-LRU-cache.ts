/*
This problem was asked by Google.

Implement an LRU (Least Recently Used) cache. It should be able to be initialized with a cache size n, and contain the following methods:

set(key, value): sets key to value. If there are already n items in the cache and we are adding a new item, then it should also remove the least recently used item.
get(key): gets the value at key. If no such key exists, return null.
Each operation should run in O(1) time.
*/

// SOLUTION
// hash map with linked list.  set and get must be O(1).  HashMap.   set/remove - O(1)  --  LinkedList
// LinkedList - head: most recently used.  tail: least recently used.
//  set(key, value)
//   if map.contains(key)
//     set map.put(key, value)
//     remove the item with same key from linkedlist        <--  needs to be Doubly linked list
//      and set the new item to head
//   else
//     if map.size() === maxSize 
//       remove the tail. remove the tail's key from the map
//       set map.put(key, value)
//       set it to head
//     else
//       set map.put(key, value)
//       set it to head

//  get
//   remove the item from linkedList, and set it to head

class Node {
    key: string;
    value: any;
    prev: Node = null;
    next: Node = null;

    constructor(key: string, value: any) {
        this.key = key;
        this.value = value;
    }
}

class LRU_Cache {
    maxSize: number;
    cacheMap = new Map();
    head: Node = null;
    tail: Node = null;

    constructor(maxSize: number) {
        this.maxSize = maxSize;
    }

    private removeNode(node: Node) {
        if (node.prev !== null) {
            if (node.key === this.tail.key) {
                node.prev.next = null;
                this.tail = node.prev;
            } else {
                node.prev.next = node.next;
            }
        }
        if (node.next !== null) {
            node.next.prev = node.prev;
            node.next = null;
        }
    }

    private setHead(node: Node) {
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.head.prev = node;
            node.next = this.head;
            node.prev = null;
            this.head = node;
        }
    }

    set(key: string, value: any) {
        if (this.cacheMap.has(key)) {
            // remove oldNode from linkedList
            const oldNode = this.cacheMap.get(key);
            this.removeNode(oldNode);
        } else if (this.cacheMap.size === this.maxSize) {
            this.cacheMap.delete(this.tail.key);
            this.tail = this.tail.prev;
            this.tail.next = null;
        }

        const newNode = new Node(key, value);
        this.cacheMap.set(key, newNode);

        // set the newNode to head
        this.setHead(newNode);
    }

    get(key: string): any {
        const node = this.cacheMap.get(key);
        this.removeNode(node);
        this.setHead(node);
        return node.value;
    }
}

const lruCache = new LRU_Cache(5);

lruCache.set('a', 1);
lruCache.set('b', 2);
lruCache.set('c', 3);
lruCache.set('d', 4);
lruCache.set('e', 5);

console.log(lruCache);

lruCache.set('f', 6);

console.log('-------------------------');
console.log(lruCache);


console.log(lruCache.get('d'));

console.log('-------------------------');
console.log(lruCache);

console.log(lruCache.get('b'));

console.log('-------------------------');
console.log(lruCache);

export {};
