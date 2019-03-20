/*
WHEN BALANCED:
fast search = O(log n)
fast insert = O(log n)
fast delete = O(log n)

WHEN NOT BALANCED: O(n)

----------------
TREE TRAVERSALS
----------------
DEPTH-FIRST SEARCH (DFS)
- IN-ORDER (left -> root -> right)
- PRE-ORDER (root -> left -> right)
- POST-ORDER (left -> right -> root)

BREADTH-FIRST SEARCH (BFS)
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

    // remove
    remove(data) {
        if (this.contains(data)) {
            this.root = removeNode(this.root, data);
            return true;
        }
        return false;
        
        function removeNode(currentNode, data) {
            if (currentNode === null) {
                console.log(`${data} not found. nothing to remove...`);
                return null;
            }

            if (currentNode.data < data) {
                // look right
                currentNode.right = removeNode(currentNode.right, data);
            } else if (currentNode.data > data) {
                // look left
                currentNode.left = removeNode(currentNode.left, data);
            } else {
                // found the data in the tree! remove it from the tree
                // console.log(`${data} Found. removing...`);

                // if currentNode is a leaf node (no children), then set currentNode to null, and return it
                // if currentNode.right exists and currentNode.left does not exist, set currentNode to currentNode.right, and return it
                // if currentNode.left exists and currentNode.right does not exist, set currentNode to currentNode.left, and return it
                // if both left and right chidlren exist, then find the right-most node of the currentNode.left
                //   set currentNode.data to that right-most node's data
                //   then remove that right-most node

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

                let replacer = currentNode.left;
                while (replacer.right !== null) {
                    replacer = replacer.right;
                }
                currentNode.data = replacer.data;
                currentNode.left = removeNode(currentNode.left, replacer.data);
            }
            return currentNode;
        }
    }

    // search / contains
    contains(data) {
        if (this.root === null) {
            return false;
        }

        let currentNode = this.root;
        while (currentNode !== null) {
            if (currentNode.data === data) {
                return true;
            }
            if (currentNode.data < data) {
                // look right
                currentNode = currentNode.right;
            } else {
                // look left
                currentNode = currentNode.left;
            }
        }
        return false;
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

     // postOrder (left -> right -> root)
     postOrder() {
        const visited = [];
        postOrderTraversal(this.root);
        return visited;

        function postOrderTraversal(currentNode) {
            if (currentNode !== null) {
                postOrderTraversal(currentNode.left);
                postOrderTraversal(currentNode.right);
                visited.push(currentNode.data);
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
// bst.insert(10);
// bst.insert(4);
// bst.insert(18);

for (let i=0; i < 17; i++) {
    const value = Math.ceil(Math.random() * 20);
    bst.insert(value);
    console.log(`INSERTED value = ${value}`);
}

const value = Math.ceil(Math.random() * 10);
console.log(`value '${value}' found = ${bst.contains(value)}`);
// console.log(`getMax() = ${bst.getMax()}`);
// console.log(`getMin() = ${bst.getMin()}`);
console.log(`removing '${value}'... = ${bst.remove(value)}`);

console.log('\n-----------   Breadth-First Traversal   -----------');
console.log(bst.breadthFirst());

console.log('\n-----------   In-Order Traversal   -----------');
console.log(bst.inOrder());

console.log('\n-----------   Pre-Order Traversal   -----------');
console.log(bst.preOrder());

console.log('\n-----------   Post-Order Traversal   -----------');
console.log(bst.postOrder());


console.log(bst.contains(17));

// console.log(JSON.stringify(bst, null, 4));


