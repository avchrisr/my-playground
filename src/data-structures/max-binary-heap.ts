class MaxBinaryHeap {
    values: any[];
    constructor() {
        this.values = [];
    }

    insert(value: any): void {
        this.values.push(value);

        // this.bubbleUp();
        this.bubbleUpRecursively(this.values.length - 1, Math.floor((this.values.length - 1 - 1) / 2));
    }

    private bubbleUp(): void {
        let currentNode = this.values.length - 1;
        let parentNode = Math.floor((currentNode - 1) / 2);
        while (parentNode >= 0 && (this.values[currentNode] > this.values[parentNode])) {
            const temp = this.values[currentNode];
            this.values[currentNode] = this.values[parentNode];
            this.values[parentNode] = temp;

            currentNode = parentNode;
            parentNode = Math.floor((currentNode - 1) / 2);   
        }
    }

    private bubbleUpRecursively(currentNode: number, parentNode: number): void {
        // base base
        if (parentNode >= 0 && (this.values[currentNode] > this.values[parentNode])) {
            const temp = this.values[currentNode];
            this.values[currentNode] = this.values[parentNode];
            this.values[parentNode] = temp;

            // currentNode = parentNode;
            // parentNode = Math.floor((currentNode - 1) / 2);
            // this.bubbleUpRecursively(currentNode, parentNode);

            // simplifying the above 3 commented out lines in a single line of code
            this.bubbleUpRecursively(parentNode, Math.floor((parentNode - 1) / 2));
        }
    }

    removeMax(): number {
        // remove and return the index 0 item
        // replace it with the most recently added (very last index item)
        // bubble-down until it finds the correct position

        if (this.values.length <= 1) {
            return this.values.pop();
        }

        const max = this.values[0];

        this.values[0] = this.values.pop();
        // this.bubbleDown();
        this.bubbleDownRecursively(0, 1, 2);

        return max;
    }

    private bubbleDown(): void {
        // find children.  left: 2n + 1   |  right: 2n + 2
        // if no children. exit
        // if both left and right exist, swap it with whichever child that's larger, if both children are greater than current
        // if left exists and if left > current, swap and repeat
        // else if right exists and if right > current, swap and repeat

        let currentNode = 0;
        let left = (currentNode * 2) + 1;
        let right = (currentNode * 2) + 2;
        let continueWhile = true;

        while (continueWhile && (left < this.values.length || right < this.values.length)) {
            if (left < this.values.length && this.values[left] > this.values[currentNode] && 
                right < this.values.length && this.values[right] > this.values[currentNode]) {
                
                if (this.values[left] > this.values[right]) {
                    this.swapItems(currentNode, left);
                    currentNode = left;
                } else {
                    this.swapItems(currentNode, right);
                    currentNode = right;
                }
            } else if (left < this.values.length && this.values[left] > this.values[currentNode]) {
                this.swapItems(currentNode, left);
                currentNode = left;
            } else if (right < this.values.length && this.values[right] > this.values[currentNode]) {
                this.swapItems(currentNode, right);
                currentNode = right;
            } else {
                continueWhile = false;
            }
            left = (currentNode * 2) + 1;
            right = (currentNode * 2) + 2;
        }
    }

    private bubbleDownRecursively(currentNode: number, left: number, right: number): void {
        if (left < this.values.length && this.values[left] > this.values[currentNode] && 
            right < this.values.length && this.values[right] > this.values[currentNode]) {
            
            if (this.values[left] > this.values[right]) {
                this.swapItems(currentNode, left);
                this.bubbleDownRecursively(left, (left * 2) + 1, (left * 2) + 2);
            } else {
                this.swapItems(currentNode, right);
                this.bubbleDownRecursively(right, (right * 2) + 1, (right * 2) + 2);
            }
        } else if (left < this.values.length && this.values[left] > this.values[currentNode]) {
            this.swapItems(currentNode, left);

            // currentNode = left;
            // left = (currentNode * 2) + 1;
            // right = (currentNode * 2) + 2;
            // this.bubbleDownRecursively(currentNode, left, right);

            // simplifying the above 4 commented out lines in a single line of code
            this.bubbleDownRecursively(left, (left * 2) + 1, (left * 2) + 2);
        } else if (right < this.values.length && this.values[right] > this.values[currentNode]) {
            this.swapItems(currentNode, right);

            // currentNode = right;
            // left = (currentNode * 2) + 1;
            // right = (currentNode * 2) + 2;
            // this.bubbleDownRecursively(currentNode, left, right);

            // simplifying the above 4 commented out lines in a single line of code
            this.bubbleDownRecursively(right, (right * 2) + 1, (right * 2) + 2);
        }
    }

    private swapItems(i: number, j: number): void {
        const temp = this.values[i];
        this.values[i] = this.values[j];
        this.values[j] = temp;
    }
}

const mbh = new MaxBinaryHeap();
mbh.insert(3);
mbh.insert(7);
mbh.insert(11);
mbh.insert(50);
mbh.insert(50);
mbh.insert(2);
mbh.insert(21);


console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);


console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);
console.log(mbh.removeMax());
console.log(mbh);


export {};
