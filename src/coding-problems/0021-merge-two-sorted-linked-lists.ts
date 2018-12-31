/*
Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
*/

// SOLUTION  --  iterative approach
// loop over two lists, for each value, compare against each other, and create a new ListNode with smaller value. and increment its pointer to move onto the next val
// O(n) + O(n) = O(n) time
// O(n) space

// RESULT: Runtime: 64 ms, faster than 88.86% of JavaScript online submissions for Merge Two Sorted Lists.

// ----------------------------------------

// SOLUTION  --  recursive approach



/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

 class ListNode {
    val: any;
    next: ListNode
    constructor(val: any, next: ListNode = null) {
        this.val = val;
        this.next = next;
    }
 }

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
const mergeTwoListsIterative = (l1: ListNode, l2: ListNode): ListNode => {
    // loop over two lists, for each value, compare against each other, and create a new ListNode with smaller value. and increment its pointer to move onto the next val
    let currentL1node = l1;
    let currentL2node = l2;
    let outputNode: ListNode = null;
    let outputHead: ListNode = null;

    while (currentL1node !== null && currentL2node !== null) {
        if (currentL1node.val < currentL2node.val) {
            if (outputHead === null) {
                outputHead = new ListNode(currentL1node.val);
                outputNode = outputHead;
            } else {
                outputNode.next = new ListNode(currentL1node.val);
                outputNode = outputNode.next;
            }
            currentL1node = currentL1node.next;
        } else {
            if (outputHead === null) {
                outputHead = new ListNode(currentL2node.val);
                outputNode = outputHead;
            } else {
                outputNode.next = new ListNode(currentL2node.val);
                outputNode = outputNode.next;
            }
            currentL2node = currentL2node.next;
        }
    }

    if (outputHead === null) {
        if (l1 !== null) {
            return l1;
        }
        if (l2 !== null) {
            return l2;
        }
        return null;
    }

    // add any remainders to the output
    while (currentL1node !== null) {
        outputNode.next = new ListNode(currentL1node.val);
        outputNode = outputNode.next;
        currentL1node = currentL1node.next;
    }
    while (currentL2node !== null) {
        outputNode.next = new ListNode(currentL2node.val);
        outputNode = outputNode.next;
        currentL2node = currentL2node.next;
    }

    return outputHead;
};

const mergeTwoListsRecursive = (l1: ListNode, l2: ListNode): ListNode => {
    if (l1 === null) {
        return l2;
    }
    if (l2 === null) {
        return l1;
    }

    if (l1.val < l2.val) {
        l1.next = mergeTwoListsRecursive(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoListsRecursive(l1, l2.next);
        return l2;
    }
};


// Input: 1->2->4, 1->3->4
// Output: 1->1->2->3->4->4

const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));

// const output = mergeTwoListsIterative(l1, l2);
// console.log(JSON.stringify(output));

const output = mergeTwoListsRecursive(l1, l2);
console.log(JSON.stringify(output));

export {};
