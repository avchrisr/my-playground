/*
WHEN BALANCED:
// fast search = O(log n)
// fast insert = O(log n)
// fast delete = O(log n)

WHEN NOT BALANCED: O(n)

----------------
TREE TRAVERSALS
----------------
DEPTH-FIRST SEARCH (DFS)
- IN-ORDER
- PRE-ORDER
- POST-ORDER

BREADTH-FIRST SEARCH (BFS)

*/

class Node {
    data: any;
    left: Node = null;
    right: Node = null;

    constructor(data: any) {
        this.data = data;
    }
}

class BinarySearchTree {
    root: Node = null;
    constructor() {}

    getRoot(): Node {
        return this.root;
    }

    insertRecursively(data: any): void {
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

    insert(data: any): void {
        const newNode = new Node(data);
        if (this.root === null) {
            this.root = newNode;
        } else {
            let currentNode = this.root;
            let nodeAdded = false;
            while (nodeAdded === false) {
                if (data <= currentNode.data) {
                    if (currentNode.left === null) {
                        currentNode.left = newNode;
                        nodeAdded = true;
                    } else {
                        currentNode = currentNode.left;
                    }
                } else {
                    if (currentNode.right === null) {
                        currentNode.right = newNode;
                        nodeAdded = true;
                    } else {
                        currentNode = currentNode.right;
                    }
                }
            }
        }
    }


    removeRecursively(data: any): void {
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
            console.log(`${data} Found. removing...`);

            // if currentNode is a leaf node (no children), then set currentNode to null
            // if currentNode.right exists and currentNode.left does not, set currentNode to currentNode.right
            // if currentNode.left exists and currentNode.right does not, set currentNode to currentNode.left
            // if both left and right children exist, then find the right-most node of the currentNode.left
            //   set currentNode.data to that right-most node's data
            //   then remove that right-most node.

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

    remove(data: any): boolean {
        if (this.root === null) {
            return false;
        }

        let currentNode = this.root;
        let parentNode: Node = null;
        while (currentNode !== null) {
            if (data === currentNode.data) {
                // if currentNode is a leaf node (no children), then set currentNode to null
                // if currentNode.right exists and currentNode.left does not, set currentNode to currentNode.right
                // if currentNode.left exists and currentNode.right does not, set currentNode to currentNode.left
                // if both left and right children exist, then find the right-most node of the currentNode.left
                //   set currentNode.data to that right-most node's data
                //   then remove that right-most node.

                if (currentNode.left === null && currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = null;
                    } else {
                        if (parentNode.left && parentNode.left.data === currentNode.data) {
                            parentNode.left = null;
                        } else {
                            parentNode.right = null;
                        }
                    }
                    return true;
                }

                if (currentNode.left === null) {
                    if (parentNode === null) {
                        this.root = currentNode.right;
                    } else {
                        if (parentNode.left && parentNode.left.data === currentNode.data) {
                            parentNode.left = currentNode.right;
                        } else {
                            parentNode.right = currentNode.right;
                        }
                    }
                    return true;
                }

                if (currentNode.right === null) {
                    if (parentNode === null) {
                        this.root = currentNode.left;
                    } else {
                        if (parentNode.left && parentNode.left.data === currentNode.data) {
                            parentNode.left = currentNode.left;
                        } else {
                            parentNode.right = currentNode.left;
                        }
                    }
                    return true;
                }

                let replacer = currentNode.left;
                let replacerParentNode = null;
                while (replacer.right !== null) {
                    replacerParentNode = replacer;
                    replacer = replacer.right;
                }

                console.log(`####   replacer.data = ${replacer.data}`);

                currentNode.data = replacer.data;
                if (replacerParentNode === null) {
                    currentNode.left = null;
                } else {
                    replacerParentNode.right = null;
                }

                return true;
            }

            parentNode = currentNode;
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return false;
    }

    // search / find
    contains(data: any): boolean {
        if (this.root === null) {
            return false;
        }

        let currentNode = this.root;
        while (currentNode !== null) {
            if (data === currentNode.data) {
                return true;
            }
            if (data < currentNode.data) {
                currentNode = currentNode.left;
            } else {
                currentNode = currentNode.right;
            }
        }
        return false;
    }

    // the right-most node
    getMax(): any {
        if (this.root === null) {
            return null;
        }

        let currentNode = this.root;
        while (currentNode.right !== null) {
            currentNode = currentNode.right;
        }
        return currentNode.data;
    }

    // the left-most node
    getMin(): any {
        if (this.root === null) {
            return null;
        }

        let currentNode = this.root;
        while (currentNode.left !== null) {
            currentNode = currentNode.left;
        }
        return currentNode.data;
    }

    // -----------  BFS  --------------
    breadthFirstTraversal(): any[] {
        const queue = [];
        const visited = [];
        let node = this.root;
        queue.push(node);

        while (queue.length > 0) {
            node = queue.shift();       // FIFO
           
            if (node.left) {
                queue.push(node.left);
            }
            if (node.right) {
                queue.push(node.right);
            }

            visited.push(node.data);
        }
        return visited;
    }

    // ---------  DFS  -----------
    inOrderTraversal(): any[] {
        const visited = [];
        this.inOrder(this.root, visited);
        return visited;
    }

    private inOrder(currentNode: Node, visited: any[]): void {
        if (currentNode !== null) {
            this.inOrder(currentNode.left, visited);
            visited.push(currentNode.data);
            this.inOrder(currentNode.right, visited);
        }
    }

    preOrderTraversal(): any[] {
        const visited = [];
        this.preOrder(this.root, visited);
        return visited;
    }

    private preOrder(currentNode: Node, visited: any[]): void {
        if (currentNode !== null) {
            visited.push(currentNode.data);
            this.preOrder(currentNode.left, visited);
            this.preOrder(currentNode.right, visited);
        }
    }

    postOrderTraversal(): any[] {
        const visited = [];
        this.postOrder(this.root, visited);
        return visited;
    }

    private postOrder(currentNode: Node, visited: any[]): void {
        if (currentNode !== null) {
            this.postOrder(currentNode.left, visited);
            this.postOrder(currentNode.right, visited);
            visited.push(currentNode.data);
        }
    }

}

const bst = new BinarySearchTree();
// bst.insert(10);
// bst.insert(4);
// bst.insert(18);

for (let i=0; i < 17; i++) {
    const value: number = Math.ceil(Math.random() * 20);
    bst.insert(value);
    console.log(`INSERTED value = ${value}`);
}

const value = Math.ceil(Math.random() * 10);
console.log(`value '${value}' found = ${bst.contains(value)}`);
console.log(`getMax() = ${bst.getMax()}`);
console.log(`getMin() = ${bst.getMin()}`);
console.log(`removing '${value}'... = ${bst.remove(value)}`);

console.log('\n-----------   Breadth-First Traversal   -----------');
console.log(bst.breadthFirstTraversal());

console.log('\n-----------   In-Order Traversal   -----------');
console.log(bst.inOrderTraversal());

console.log('\n-----------   Pre-Order Traversal   -----------');
console.log(bst.preOrderTraversal());

console.log('\n-----------   Post-Order Traversal   -----------');
console.log(bst.postOrderTraversal());

// console.log(JSON.stringify(bst, null, 4));


export {};
