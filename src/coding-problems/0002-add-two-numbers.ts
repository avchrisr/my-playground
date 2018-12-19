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

    let num1 = '';
    let num2 = '';

    let i = l1;
    while (i !== null) {
        num1 = i.val + num1;
        i = i.next;
    }

    i = l2;
    while (i !== null) {
        num2 = i.val + num2;
        i = i.next;
    }

    const sum = (parseInt(num1) + parseInt(num2)).toString();

    let newListNode: ListNode;
    let nextNode: ListNode;
    for (let i=0; i < sum.length; i++) {
        if (i === 0) {
            newListNode = new ListNode(parseInt(sum[i]), null);
        } else {
            nextNode = new ListNode(parseInt(sum[i]), newListNode);
            newListNode = nextNode;
        }
    }
    return newListNode;
};

const l1 = new ListNode(2, new ListNode(4, new ListNode(3, null)));
const l2 = new ListNode(5, new ListNode(6, new ListNode(4, null)));

console.log(addTwoNumbers(l1, l2));
