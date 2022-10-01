// There is a tree (i.e. a connected, undirected graph with no cycles) 
// consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.

// You are given a 0-indexed integer array vals of length n where 
// vals[i] denotes the value of the ith node. 
// You are also given a 2D integer array edges where edges[i] = [ai, bi] 
// denotes that there exists an undirected edge connecting nodes ai and bi.

// A good path is a simple path that satisfies the following conditions:

// The starting node and the ending node have the same value.
// All nodes between the starting node and the ending node have 
// values less than or equal to the starting node 
// (i.e. the starting node's value should be the maximum value along the path).
// Return the number of distinct good paths.

// Note that a path and its reverse are counted as the same path. 
// For example, 0 -> 1 is considered to be the same as 1 -> 0. 
// A single node is also considered as a valid path.

 

// Example 1:
// Input: vals = [1,3,2,1,3], edges = [[0,1],[0,2],[2,3],[2,4]]
// Output: 6
// Explanation: There are 5 good paths consisting of a single node.
// There is 1 additional good path: 1 -> 0 -> 2 -> 4.
// (The reverse path 4 -> 2 -> 0 -> 1 is treated as the same as 1 -> 0 -> 2 -> 4.)
// Note that 0 -> 2 -> 3 is not a good path because vals[2] > vals[0].

// Example 2:
// Input: vals = [1,1,2,2,3], edges = [[0,1],[1,2],[2,3],[2,4]]
// Output: 7
// Explanation: There are 5 good paths consisting of a single node.
// There are 2 additional good paths: 0 -> 1 and 2 -> 3.

// Example 3:
// Input: vals = [1], edges = []
// Output: 1
// Explanation: The tree consists of only one node, so there is one good path.


// Constraints:
// n == vals.length
// 1 <= n <= 3 * 104
// 0 <= vals[i] <= 105
// edges.length == n - 1
// edges[i].length == 2
// 0 <= ai, bi < n
// ai != bi
// edges represents a valid tree.


// Approach 1 - Using DSU
var numberOfGoodPaths = function(vals, edges) {
    const n = vals.length;
    const map = new Map();
    const neighbour = Array.from({length: n}, () => []);

    // Setting map with node values (map keys) and all node indexes (map values)
    for(let i=0; i<n; i++)
    {
        if(!map.has(vals[i]))
        {
            map.set(vals[i], []);
        }

        map.get(vals[i]).push(i);
    }

    // Setting neighbour array to store neighbour nodes for each index
    for(const [u, v] of edges)
    {
        neighbour[u].push(v);
        neighbour[v].push(u);
    }

    // Ascending Sort and store node values in sorted array
    const sorted = Array.from(map.keys()).sort((a, b) => a - b);

    // Store parent of each index of our DSU
    // and is also used to union (change parent)
    const p = Array.from({length: n}).fill(-1);

    // Recursive function to return parent index of input index
    const root = (i) => {
        if (p[i] < 0) return i;
        p[i] = root(p[i]);
        return p[i];
    };

    // Function for Union
    const union = (i, j) => {
        const ri = root(i);
        const rj = root(j);
        
        if (ri === rj) return;
        p[ri] += p[rj];
        p[rj] = ri;
    };

    // Variable to store our final answer
    let ans = 0;

    // Iterating through all ascending order sorted node values
    for(const nodeVal of sorted)
    {
        // nodes is an array of indexes with values = s
        const nodes = map.get(nodeVal);

        // Iterating through indexes with nodeVal as value
        for(const u of nodes)
        {
            // Iterating through all neighbours of index u
            // to check if we need to Union (update parent) of neighbour index
            for(const v of neighbour[u])
            {
                if (vals[v] > nodeVal) continue;
                union(u, v);
            }
        }

        const count = new Map();

        // Iterating through all indexes with value = s
        // and maintaining count of parent node index of each index
        for(const node of nodes)
        {
            const np = root(node);
            if (!count.has(np)) count.set(np, 1);
            else count.set(np, count.get(np) + 1);
        }

        // First c for all nodes individually
        // We can have c*(c-1)/2 paths for c nodes
        // Ex- c = 4
        // +4 for all nodes individually
        // Then for paths, it will be 
        // 3+2+1 -> (c-1)*(c+1-1)/2  -> (c-1)*(c)/2
        for(const c of count.values())
        {
            ans += c + c * (c - 1) / 2;
        }
    }
    return ans;
};

console.log(numberOfGoodPaths([1,3,2,1,3], [[0,1],[0,2],[2,3],[2,4]]))