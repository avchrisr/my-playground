/*
This problem was asked by Facebook.

Given a binary tree, return all paths from the root to leaves.

For example, given the tree:

   1                <--  NOT A VALID BINARY TREE....
  / \
 2   3
    / \
   4   5

   Return [[1, 2], [1, 3, 4], [1, 3, 5]].


   2
  / \
 1   4
    / \
   3   5

   Return [[2, 1], [2, 4, 3], [2, 4, 5]].
*/

/*
SOLUTION

depth-first search  --  pre-order traversal
*/

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    getRoot() {
        return this.root;
    }

    // insert
    insert(data) {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            insertNode(this.root, newNode);
        }

        function insertNode(currentNode, newNode) {
            if (newNode.data > currentNode.data) {
                // go right
                if (currentNode.right === null) {
                    currentNode.right = newNode;
                } else {
                    insertNode(currentNode.right, newNode);
                }
            } else {
                // go left
                if (currentNode.left === null) {
                    currentNode.left = newNode;
                } else {
                    insertNode(currentNode.left, newNode);
                }
            }
        }
    }

    getAllPaths() {
        const visitedPaths = [];
        preOrderTraversal(this.root);
        return visitedPaths;

        function preOrderTraversal(currentNode, path = []) {

            // console.log(`currentNode.data = ${currentNode.data}`);
            // console.log(`path = ${path}`);

            if (currentNode.left === null && currentNode.right === null) {
                visitedPaths.push(path.concat([currentNode.data]));
            } else {
                if (currentNode.left !== null) {
                    preOrderTraversal(currentNode.left, path.concat([currentNode.data]));
                }
                if (currentNode.right !== null) {
                    preOrderTraversal(currentNode.right, path.concat([currentNode.data]));
                }
            }
        }
    }

    // preOrder (root -> left -> right)
    preOrder() {
        const visited = [];
        preOrderTraversal(this.root);
        return visited;

        function preOrderTraversal(currentNode) {
            if (currentNode !== null) {
                visited.push(currentNode.data);
                preOrderTraversal(currentNode.left);
                preOrderTraversal(currentNode.right);
            }
        }
    }

    // inOrder (left -> root -> right)
    inOrder() {
        const visited = [];
        inOrderTraversal(this.root);
        return visited;

        function inOrderTraversal(currentNode) {
            if (currentNode !== null) {
                inOrderTraversal(currentNode.left);
                visited.push(currentNode.data);
                inOrderTraversal(currentNode.right);
            }
        }
    }

    breadthFirst() {
        const visited = [];
        if (this.root !== null) {
            const queue = [];
            queue.push(this.root);

            while (queue.length > 0) {
                const node = queue.shift();
                visited.push(node.data);
                if (node.left !== null) {
                    queue.push(node.left);
                }
                if (node.right !== null) {
                    queue.push(node.right);
                }
            }
        }
        return visited;
    }
}

const bst = new BinarySearchTree();
bst.insert(2);
bst.insert(1);
bst.insert(4);
bst.insert(3);
bst.insert(5);

// console.log(bst);
// console.log(bst.breadthFirst());
// console.log(bst.preOrder());
// console.log(bst.inOrder());

const allPaths = bst.getAllPaths();
console.log(`all paths =`, allPaths);
