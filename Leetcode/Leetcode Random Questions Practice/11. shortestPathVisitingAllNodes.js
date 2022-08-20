// You have an undirected, connected graph of n nodes labeled from 0 to n - 1. 
// You are given an array graph where graph[i] is a list of all the nodes 
// connected with node i by an edge.

// Return the length of the shortest path that visits every node. 
// You may start and stop at any node, you may revisit nodes multiple times, 
// and you may reuse edges.


// Example 1:
// Input: graph = [[1,2,3],[0],[0],[0]]
// Output: 4
// Explanation: One possible path is [1,0,2,0,3]

// Example 2:
// Input: graph = [[1],[0,2,4],[1,3,4],[2],[1,2]]
// Output: 4
// Explanation: One possible path is [0,1,4,2,3]


// Constraints:
// n == graph.length
// 1 <= n <= 12
// 0 <= graph[i].length < n
// graph[i] does not contain i.
// If graph[a] contains b, then graph[b] contains a.
// The input graph is always connected.


// Approach 1
var shortestPathLength = function(graph) {
    let n = graph.length, fullBitmask = (1 << n) - 1;
    let queue = [], visited = new Set();
      
    for (var i = 0; i < n; i++) 
    {
      queue.push([i, 1 << i]);
      visited.add(`${i},${1 << i}`);
    }
  
    let steps = 0;

    // Parallel BFS starting from all nodes 
    // For each level of bfs from current queue array nodes
    // In each while loop, we move to next level of bfs
    while(queue.length) 
    {
        let next = [];

        // while loop to move to next node for its updation as per current bfs level
        while(queue.length) 
        {
            let [node, bitmask] = queue.pop();

            // At previous loop bfs level, 
            // we visited all nodes from 1 path
            // return steps/length of path
            if (bitmask===fullBitmask)
            {
                return steps;
            }

            for(var neighbor of graph[node]) 
            {
                let newBitmask = bitmask | (1 << neighbor);
                
                // If this neighbour with corresponding nodes bitmask 
                // is not visited in past, only then add it to next
                // so that we do next level bfs from it

                // Otherwise it is an indication of loop/repition
                // Skip and don't add to next array a
                if (!visited.has(`${neighbor},${newBitmask}`)) 
                {
                    next.push([neighbor, newBitmask]);
                    visited.add(`${neighbor},${newBitmask}`);
                }
            }
        }

        queue = next;

        // Steps is equivalent to bfs level from all starting nodes
        steps++;
    }
};

console.log(shortestPathLength([[1],[0,2,4],[1,3,4],[2],[1,2]]))