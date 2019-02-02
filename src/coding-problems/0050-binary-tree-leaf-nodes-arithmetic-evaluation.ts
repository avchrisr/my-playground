/*
This problem was asked by Microsoft.

Suppose an arithmetic expression is given as a binary tree. Each leaf is an integer and each internal node is one of '+', '−', '∗', or '/'.

Given the root to such a tree, write a function to evaluate it.

For example, given the following tree:

    *
   / \
  +    +
 / \  / \
3  2  4  5
You should return 45, as it is (3 + 2) * (4 + 5).
*/

// SOLUTION  --  O(n) time  |  O(m) space for recursive stack to store immediate results
// starting from root, evaluate left and right nodes using recursive traversal

class Node {
   data: any;
   left: Node = null;
   right: Node = null;

   constructor(data: any) {
      this.data = data;
   }
}

const root = new Node('*');
root.left = new Node('+');
root.right = new Node('+');
root.left.left = new Node(3);
root.left.right = new Node(2);
root.right.left = new Node(4);
root.right.right = new Node(5);

const evaluateBinaryTree = (node: Node): number => {
   switch (node.data) {
      case '*':
         return evaluateBinaryTree(node.left) * evaluateBinaryTree(node.right);
      case '/':
         return evaluateBinaryTree(node.left) / evaluateBinaryTree(node.right);
      case '+':
         return evaluateBinaryTree(node.left) + evaluateBinaryTree(node.right);
      case '-':
         return evaluateBinaryTree(node.left) - evaluateBinaryTree(node.right);
      default:
         // must be a number
         return parseFloat(node.data);
   }
};

console.log(evaluateBinaryTree(root));

export {};
