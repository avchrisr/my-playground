/*

DIJKSTRA'S SHORTEST PATH ALGORITHM

- Graph
- Priority Queue with shortest distance vertex on top
  - min-heap -- O(log n)

- distanceTable
- previousTable

*/

class SimplePriorityQueue {
    // enqueue - O(n) because we're checking priority of items already in the queue
    // dequeue - O(1) remove the first

    storage: any[] = [];
    
    constructor() {}

    enqueue(item: any) {
        // item: ex) {task: 'task1', priority: 2}       // 1 highest, 5 lowest
        if (this.storage.length === 0) {
            this.storage.push(item);
            return;
        }

        let itemAdded = false;
        for (let i=0; i < this.storage.length; i++) {
            if (item.priority < this.storage[i].priority) {
                this.storage.splice(i, 0, item);
                itemAdded = true;
                i = this.storage.length;
            }
        }
        if (!itemAdded) {
            this.storage.push(item);
        }
    }

    dequeue(): any {
        return this.storage.shift();
    }

    getSize(): number {
        return this.storage.length;
    }
}

/*
    B -- D
  / | \  | \
 A  |  \ |  F
  \ |   \| /
    C -- E
*/

// directional graph
const graph_adjacencyList = {
    A: {B: 5, C: 2},
    B: {D: 4, E: 2},
    C: {B: 8, E: 7},
    D: {E: 6, F: 3},
    E: {F: 1},
    F: {}
};

const dijkstra = (start: string, finish: string): any => {
	const pq = new SimplePriorityQueue();
	const distances = {};
	const previous = {};
	
	const shortestPath = [];
	
	// set up the initial state
	for (let vertex in graph_adjacencyList) {
		if (vertex === start) {
			distances[vertex] = 0;
			pq.enqueue({vertex, priority: 0});
		} else {
			distances[vertex] = Infinity;
			pq.enqueue({vertex, priority: Infinity});
		}
		previous[vertex] = null;
	}
	
	// run, as long as there's something to visit
	while (pq.getSize() > 0) {
        let lowestCostVertex = pq.dequeue().vertex;
        
		if (lowestCostVertex === finish) {
            // We've arrived. Build the shortest path and return
			while (previous[lowestCostVertex]) {
				shortestPath.push(lowestCostVertex);
				lowestCostVertex = previous[lowestCostVertex];			
			}
            
            // add the 'start' vertex, which would have null value in the previous map table
            shortestPath.push(lowestCostVertex);      // pushing 'start' will work as well

            // note that even though we found the shortest path, there may still be items in the Priority Queue, which we don't care about
            // just return the shortest path found and exit the loop
			return {
                shortestPath: shortestPath.reverse(),
                distance: distances[finish]
            };
		}
        
        // proceed only if there is a known path to this vertex so far
		if (distances[lowestCostVertex] !== Infinity) {
			for (let neighbor in graph_adjacencyList[lowestCostVertex]) {
				// calculate new distance to the neighboring vertex
				const candidate = distances[lowestCostVertex] + graph_adjacencyList[lowestCostVertex][neighbor];
				if (candidate < distances[neighbor]) {
					// updating new shortest distance to neighbor
					distances[neighbor] = candidate;
					
					// updating 'previous' - how we got to the neighbor node
					previous[neighbor] = lowestCostVertex;
					
					// enqueue in Priority Queue with new priority
					pq.enqueue({vertex: neighbor, priority: candidate});
				}
			}
		}
	}
}


console.log(dijkstra('A', 'F'));
console.log(dijkstra('E', 'A'));


export {};
