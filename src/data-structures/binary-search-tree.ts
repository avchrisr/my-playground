// Binary Search Tree (BST) implementation

// balance tree (when it's unbalanced)
// - when to trigger?  when the difference of depth between left and right sides is greater than 5 (arbitrarily)?

// it's always in sorted order
// can or cannot have duplicate keys? if duplicate, what to do?  put it in Left

// - fast search = O(log n)
// - fast insert = O(log n)
// - fast delete = O(log n)

// ref) https://www.geeksforgeeks.org/implementation-binary-search-tree-javascript/
// re-implement this based on that reference tutorial!

/*

INSERTED value = 6
INSERTED value = 4
INSERTED value = 5
INSERTED value = 8
INSERTED value = 9
INSERTED value = 2
INSERTED value = 1

      6
	 / \
    4   8
   / \   \
  2   5   9
 /  
1

Max value in the BST = 9
Min value in the BST = 1

Tree is balanced = true

--------  InOrder  (left to right. always in order)  ---------
1 2 4 5 6 8 9

--------  PreOrder (depth-first traversal, starting with the root)  ---------
6 4 2 1 5 8 9

--------  PostOrder (start at deepest left depth first. left tree first then right tree, ending at root) sort of like reverse-breadth-first  ---------
1 2 5 4 9 8 6

*/

class Node {
    data: any;
    left: Node;
    right: Node;

    constructor(data: any) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    root: Node;

    constructor() {
        this.root = null;
    }

    getRootNode(): Node {
        return this.root;
    }

    insert(data: any): void {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            // find the correct position in the tree and add the new node
            this.insertNode(this.root, newNode);
        }
    }

    private insertNode(currentNode: Node, newNode: Node): void {
        if (newNode.data > currentNode.data) {
            // go right
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.insertNode(currentNode.right, newNode);
            }
        } else {
            // go left
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.insertNode(currentNode.left, newNode);
            }
        }
    }

    insertNodeIteratively(data: any): void {
        let newNode = new Node(data);
        let currentNode = this.root;
        let prevNode: Node = null;
        while (currentNode !== null) {
            prevNode = currentNode;
            if (newNode.data > currentNode.data) {
                currentNode = currentNode.right;
            } else {
                currentNode = currentNode.left;    
            }
        }

        if (prevNode === null) {
            this.root = newNode;
        } else {
            if (newNode.data > prevNode.data) {
                prevNode.right = newNode;
            } else {
                prevNode.left = newNode;
            }
        }
    }

    remove(data: any): void {
        // root is re-set with the re-organized tree after removal
        this.root = this.removeNode(this.root, data);
    }

    private removeNode(currentNode: Node, data: any): Node {
        if (currentNode === null) {
            console.log(`${data} not found. nothing to remove...`);
            return currentNode;
        }

        if (data > currentNode.data) {
            // go right
            currentNode.right = this.removeNode(currentNode.right, data);
        } else if (data < currentNode.data) {
            // go left
            currentNode.left = this.removeNode(currentNode.left, data);
        } else {
            // found a node with the same data value
            console.log(`${data} Found. removing...`);

            // when the tree allows multiple nodes with the same data, then remove the first one found

            // if left exists and right does not, set the currentNode = currentNode.left
            // if left does not exist, and right does, set the currentNode = currentNode.right
            // if both exist, set the next min data (right most node of the left side OR left most node of the right side)
            //     and then remove that next min node from the currentNode subtree 

            if (currentNode.left === null && currentNode.right === null) {
                currentNode = null;
                return currentNode;
            }

            if (currentNode.left === null) {
                currentNode = currentNode.right;
                return currentNode;
            }

            if (currentNode.right === null) {
                currentNode = currentNode.left;
                return currentNode;
            }

            // both left and right nodes exist
            // get the right most node of the left side (next min value)
            let replacer = currentNode.left;
            while (replacer.right !== null) {
                replacer = replacer.right;
            }
            currentNode.data = replacer.data;

            // removeNode of that replacer data from this subtree
            currentNode.left = this.removeNode(currentNode.left, replacer.data);
        }
        return currentNode;
    }

    contains(data: any): boolean {
        return this.containsNode(this.root, data);
    }

    private containsNode(currentNode: Node, data: any): boolean {
        if (currentNode === null) {
            return false;
        }

        if (data === currentNode.data) {
            return true;
        }

        if (data > currentNode.data) {
            // go right
            return this.containsNode(currentNode.right, data);
        } else {
            // go left
            return this.containsNode(currentNode.left, data);
        }
    }

    // ----------   TREE TRAVERSALS   -------------

    // --------  InOrder  (left to right. always in order)  ---------
    printInOrder(): void {
        this.inOrderTraversal(this.root);
    }

    private inOrderTraversal(currentNode: Node): void {
        if (currentNode !== null) {
            this.inOrderTraversal(currentNode.left);
            console.log(currentNode.data);                  // IN (BETWEEN)
            this.inOrderTraversal(currentNode.right);
        }
    }

    private inOrderTraverse(currentNode: Node, arr: any[]): void {
        if (currentNode !== null) {
            this.inOrderTraverse(currentNode.left, arr);
            arr.push(currentNode.data);
            this.inOrderTraverse(currentNode.right, arr);
        }
    }

    // --------  PreOrder (depth-first traversal, starting with the root)  ---------
    printPreOrder(): void {
        this.preOrderTraversal(this.root);
    }

    private preOrderTraversal(currentNode: Node): void {
        if (currentNode !== null) {
            console.log(currentNode.data);                  // PRE
            this.preOrderTraversal(currentNode.left);
            this.preOrderTraversal(currentNode.right);
        }
    }

    //--------  PostOrder (start at deepest left depth first. left tree first then right tree, ending at root) sort of like reverse-breadth-first  ---------
    printPostOrder(): void {
        this.postOrderTraversal(this.root);
    }

    private postOrderTraversal(currentNode: Node): void {
        if (currentNode !== null) {
            this.postOrderTraversal(currentNode.left);
            this.postOrderTraversal(currentNode.right);
            console.log(currentNode.data);                  // POST
        }
    }

    getMaxValue(): any {
        let currentNode = this.root;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }

    getMinValue(): any {
        let currentNode = this.root;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.data;
    }

    isBalanced(currentNode: Node = this.root, level: number = 1): boolean {
        if (currentNode === null) {
            return true;
        }

        const leftHeight: number = this.checkHeight(currentNode.left);
        const rightHeight: number = this.checkHeight(currentNode.right);

        console.log(`level [${level}] - leftHeight = ${leftHeight} | rightHeight = ${rightHeight}`);

        if ((Math.abs(leftHeight - rightHeight) <= 1) && this.isBalanced(currentNode.left, level + 1) && this.isBalanced(currentNode.right, level + 1)) {
            return true;
        }

        return false;
    }

    checkHeight(currentNode: Node): number {
        if (currentNode === null) {
            return 0;
        }

        return 1 + Math.max(this.checkHeight(currentNode.left), this.checkHeight(currentNode.right));
    }

    // rebalanceTree()      --  too complex to be on interview questions.  AVL tree.  O(n log n)
}

const bst = new BinarySearchTree();

for (let i=0; i < 7; i++) {
    const value: number = Math.ceil(Math.random() * 10);
    // bst.insert(value);
    bst.insertNodeIteratively(value);
    console.log(`INSERTED value = ${value}`);
}

bst.remove(Math.ceil(Math.random() * 10));

const searchValue = Math.ceil(Math.random() * 10);
console.log(`this BST contains ${searchValue} = ${bst.contains(searchValue)}`);

console.log(`Max value in the BST = ${bst.getMaxValue()}`);
console.log(`Min value in the BST = ${bst.getMinValue()}`);

console.log(`Tree is balanced = ${bst.isBalanced()}`);

console.log('--------  InOrder  ---------');
bst.printInOrder();

console.log('--------  PreOrder  ---------');
bst.printPreOrder();

console.log('--------  PostOrder  ---------');
bst.printPostOrder();

export {};
