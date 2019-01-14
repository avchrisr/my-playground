class GraphWeighted {
    adjacencyList: object;
    constructor() {
        this.adjacencyList = {};
    }

    // O(1) time
    addVertex(vertex: string) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }

    // O(1) time
    addEdge(vertex1: string, vertex2: string, weight: number) {
        // UNDIRECTED (add both directions)
        // add vertex2 to vertex1's list. And add vertex1 to vertex2's list
        this.adjacencyList[vertex1].push({
            node: vertex2,
            weight
        });
        this.adjacencyList[vertex2].push({
            node: vertex1,
            weight
        });
    }

    // O(E) time
    removeEdge(vertex1: string, vertex2: string) {
        // UNDIRECTED. remove from both directions

        // using array.splice() method
        // for (let i=0; i < this.adjacencyList[vertex1].length; i++) {
        //     if (this.adjacencyList[vertex1][i] === vertex2) {
        //         this.adjacencyList[vertex1].splice(i, 1);
        //     }
        // }
        // for (let i=0; i < this.adjacencyList[vertex2].length; i++) {
        //     if (this.adjacencyList[vertex2][i] === vertex1) {
        //         this.adjacencyList[vertex2].splice(i, 1);
        //     }
        // }

        // using array.filter() method
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((v: any) => v.node !== vertex2);
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((v: any) => v.node !== vertex1);
    }

    // O(V + E) time
    removeVertex(vertex: string) {
        // get the edges for the vertex and delete them from the connected vertices
        for (let edge of this.adjacencyList[vertex]) {
            this.removeEdge(vertex, edge.node);
        }

        // remove the vertex
        delete this.adjacencyList[vertex];
    }

    // -----------------
    // GRAPH TRAVERSALS
    // -----------------

    // DEPTH-FIRST SEARCH

    DFS_Recursive(startVertex: string): string[] {
        const output = [];
        const visited = {};
        visited[startVertex] = true;

        // using this fat arrow function declaraction keeps the context of 'this'
        const dfs = (vertex: string): void => {
            if (this.adjacencyList[vertex]) {
                output.push(vertex);

                this.adjacencyList[vertex].forEach((neighbor: any) => {
                    if (!visited[neighbor.node]) {
                        visited[neighbor.node] = true;
                        dfs(neighbor.node);
                    }
                });
            }
        };

        dfs(startVertex);
        return output;

        // function dfs(vertex: string) {
        //     if (this.adjacencyList[vertex]) {   // TypeError: Cannot read property 'adjacencyList' of undefined
        //         output.push(vertex);

        //         this.adjacencyList[vertex].forEach((neighbor: any) => {
        //             if (!visited[neighbor.node]) {
        //                 visited[neighbor.node] = true;
        //                 dfs(neighbor.node);
        //             }
        //         });
        //     }
        // }
    }

    // compared to DFS_Recursive output, DFS_Iterative output may have different order even though it's still DFS, because it's using Stack
    // so whichever was last added to the stack is visited first.
    DFS_Iterative(startVertex: string): string[] {
        if (!this.adjacencyList[startVertex]) {
            return [];
        }

        const output = [];
        const visited = {};
        
        const stack = [startVertex];
        visited[startVertex] = true;

        while (stack.length > 0) {
            const currentVertex = stack.pop();
            output.push(currentVertex);

            this.adjacencyList[currentVertex].forEach((neighbor: any) => {
                if (!visited[neighbor.node]) {
                    visited[neighbor.node] = true;
                    stack.push(neighbor.node);
                }
            });
        }

        return output;
    }


    // BREADTH-FIRST SEARCH  --  same code as DFS_Iterative, but using a Queue instead of a Stack

    BFS(startVertex: string): string[] {
        if (!this.adjacencyList[startVertex]) {
            return [];
        }

        const output = [];
        const visited = {};

        const queue = [startVertex];
        visited[startVertex] = true;

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            output.push(currentVertex);

            this.adjacencyList[currentVertex].forEach((neighbor: any) => {
                if (!visited[neighbor.node]) {
                    visited[neighbor.node] = true;
                    queue.push(neighbor.node);
                }
            });
        }

        return output;
    }


}


const g = new GraphWeighted();
g.addVertex('Tokyo');
g.addVertex('Seoul');
g.addVertex('San Francisco');
g.addVertex('New York');

g.addEdge('Seoul', 'New York', 20);
g.addEdge('San Francisco', 'Seoul', 12);
g.addEdge('Tokyo', 'Seoul', 2);
console.log(g.adjacencyList);

// g.removeEdge('Seoul', 'San Francisco');
// console.log(g.adjacencyList);

// g.removeVertex('New York');
// console.log(g.adjacencyList);

console.log('--------   DFS_Recursive   ---------');
console.log(g.DFS_Recursive('Seoul'));

console.log('--------   DFS_Iterative   ---------');
console.log(g.DFS_Iterative('Seoul'));

console.log('--------   BFS   ---------');
console.log(g.BFS('Seoul'));

export {};
