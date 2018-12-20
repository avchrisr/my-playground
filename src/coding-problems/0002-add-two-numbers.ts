/*
You are given two non-empty linked lists representing two non-negative integers.
The digits are stored in reverse order and each of their nodes contain a single digit.
Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example:

Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
*/

// RESULT
// Runtime: 112 ms, faster than 99.53% of JavaScript online submissions for Add Two Numbers.

// Time complexity: O(max(m,n))
// Space complexity: O(max(m,n)) + 1

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

class ListNode {
    val: number;
    next: ListNode;

    constructor(val: number, next: ListNode) {
        this.val = val;
        this.next = next;
    }
}

const addTwoNumbers = (l1: ListNode, l2: ListNode) => {
    let i = l1;
    let j = l2;
    let carryOver: number = 0;

    let newNode: ListNode;
    let headNode: ListNode;
    let nextNode: ListNode;
    while (i !== null || j !== null || carryOver > 0) {
        let num1 = i ? i.val : 0;
        let num2 = j ? j.val : 0;

        const sum = num1 + num2 + carryOver;
        carryOver = (sum >= 10) ? 1 : 0;

        newNode = new ListNode(sum >= 10 ? sum - 10 : sum, null);

        if (!headNode) {
            headNode = newNode;
        }
        if (nextNode) {
            nextNode.next = newNode;
        }
        nextNode = newNode;

        i = i ? i.next : null;
        j = j ? j.next : null;
    }

    return headNode;
};

const l1 = new ListNode(2, new ListNode(4, new ListNode(3, null)));

const l3 = new ListNode(1, new ListNode(0, new ListNode(0, 
    new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(0, 
        new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(0, 
            new ListNode(0, new ListNode(0, new ListNode(0, new ListNode(0, 
                new ListNode(0, new ListNode(1, null)))))))))))))))));

const l2 = new ListNode(5, new ListNode(6, new ListNode(4, null)));

console.log(addTwoNumbers(l3, l2));
