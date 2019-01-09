/*
This problem was asked by Google.
Given a singly linked list and an integer k, remove the kth last element from the list. k is guaranteed to be smaller than the length of the list.
The list is very long, so making more than one pass is prohibitively expensive.
Do this in constant space and in one pass.
*/

/*
A -> B -> C -> D -> E -> F -> G
1    2    3    4    5    6    7
*/

// Q) do we know the size of the LinkedList?  If so,  k=2  size-2+1.    size-k+1   --  O(n) time | O(1) space


// SOLUTION  --  O(n) time | O(1) space
// using two pointers p and q
// move p to next for k number of times
// move q to next until p becomes null
// return q's data

class LinkedList {
    head: Node;
    constructor() {
        this.head = null;
    }

    append(data: number) {
        const newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
        } else {
            let currNode = this.head;
            while (currNode.next !== null) {
                currNode = currNode.next;
            }
            currNode.next = newNode;
        }
    }

    removeKthElementFromLast(k: number): number {
        if (k <= 0) {
            return null;
        }

        if (this.head === null) {
            return null;
        }

        let p = this.head;
        let q = this.head;

        for (let i=0; i < k; i++) {
            p = p.next;
            if (p === null) {
                // k is larger than the list
                return null;
            }
        }

        // need to keep track of one node previous to the actual k'th node so that we can link the previous node to the q+1's node
        while (p.next !== null) {
            p = p.next;
            q = q.next;
        }

        const removedValue = q.next.data;
        q.next = q.next.next;
        return removedValue;
    }
}

class Node {
    data: number;
    next: Node;
    constructor(data: number) {
        this.data = data;
        this.next = null;
    }
}


const myList = new LinkedList();
myList.append(1);
myList.append(2);
myList.append(3);
myList.append(4);
myList.append(5);
myList.append(6);
myList.append(7);

const removedValue = myList.removeKthElementFromLast(2);     // 6.   list: 1-2-3-4-5-7
console.log(removedValue);
console.log(JSON.stringify(myList));

export {};
