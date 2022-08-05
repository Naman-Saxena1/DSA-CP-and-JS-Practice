// You are given a directed graph of n nodes numbered from 0 to n - 1, 
// where each node has at most one outgoing edge.

// The graph is represented with a given 0-indexed array edges of size n, 
// indicating that there is a directed edge from node i to node edges[i]. 
// If there is no outgoing edge from i, then edges[i] == -1.

// You are also given two integers node1 and node2.

// Return the index of the node that can be reached from both node1 and node2, 
// such that the maximum between the distance from node1 to that node, 
// and from node2 to that node is minimized. 
// If there are multiple answers, return the node with the smallest index, 
// and if no possible answer exists, return -1.

// Note that edges may contain cycles.

 

// Example 1:
// Input: edges = [2,2,3,-1], node1 = 0, node2 = 1
// Output: 2
// Explanation: The distance from node 0 to node 2 is 1, and the distance from node 1 to node 2 is 1.
// The maximum of those two distances is 1. It can be proven that we cannot get a node with a smaller maximum distance than 1, so we return node 2.

// Example 2:
// Input: edges = [1,2,-1], node1 = 0, node2 = 2
// Output: 2
// Explanation: The distance from node 0 to node 2 is 2, and the distance from node 2 to itself is 0.
// The maximum of those two distances is 2. It can be proven that we cannot get a node with a smaller maximum distance than 2, so we return node 2.


// Constraints:
// n == edges.length
// 2 <= n <= 105
// -1 <= edges[i] < n
// edges[i] != i
// 0 <= node1, node2 < n


// Approach 1
var closestMeetingNode = function (edges, node1, node2) {
  
  const set1 = new Set();
  const set2 = new Set();
  set1.add(node1);
  set2.add(node2);
  let p1 = node1;
  let p2 = node2;
  let result = Infinity;
      
  while (edges[p1] !== -1 || edges[p2] !== -1) 
  {
    // Check if current node visited by both
    if (set1.has(p2)) result = p2;
    if (set2.has(p1)) result = result < p1 ? result : p1;   // return smaller node
    if (result !== Infinity) return result;
      
    // Next node
    if (edges[p1] !== -1) p1 = edges[p1];
    if (edges[p2] !== -1) p2 = edges[p2];
      
    // Exit in case of loop
    if ( set1.has(p1) && set2.has(p2) && !(edges[p1] === -1 && edges[p2] === -1) ) break;
    
    // Add new current nodes to sets
    set1.add(p1);
    set2.add(p2);
  }
  
  return p1 === p2 ? p1 : -1;
}

console.log(closestMeetingNode([1,2,-1],0,2))


// Later try with DFS or BFS