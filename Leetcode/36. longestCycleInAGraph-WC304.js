// You are given a directed graph of n nodes numbered from 0 to n - 1, 
// where each node has at most one outgoing edge.

// The graph is represented with a given 0-indexed array edges of size n, 
// indicating that there is a directed edge from node i to node edges[i]. 
// If there is no outgoing edge from node i, then edges[i] == -1.

// Return the length of the longest cycle in the graph. 
// If no cycle exists, return -1.

// A cycle is a path that starts and ends at the same node.



// Example 1:
// Input: edges = [3,3,4,2,3]
// Output: 3
// Explanation: The longest cycle in the graph is the cycle: 2 -> 4 -> 3 -> 2.
// The length of this cycle is 3, so 3 is returned.

// Example 2:
// Input: edges = [2,-1,3,1]
// Output: -1
// Explanation: There are no cycles in this graph.


// Constraints:
// n == edges.length
// 2 <= n <= 105
// -1 <= edges[i] < n
// edges[i] != i



// Approach 1
function dfs(node,path,visited,edges)
{
    console.log("\n\n\nNode:",node)
    if(node==-1) return -1;
    let count=-1;
    console.log("count: ",count)

    if(visited[node])
    {
        // If node is visited in THIS DFS path only, we calculate loop length
        // And update count
        // Else we just return count = -1
        for(let i=0;i<path.length;i++)
        {
            if(path[i]==node)
            {
                // Loop takes path.length-i steps
                count=Math.max(count,path.length-i);
                break;
            }
        }
        return count;
    }
    
    visited[node]=1;
    path.push(node);
    let res=dfs(edges[node],path,visited,edges);
    path.pop();
    return Math.max(res,count);
}

var longestCycle = function(edges) 
{    
    let visited=Array(edges.length).fill(0);
    let path=[];
    let ans=-1;
    
    for(let i=0;i<edges.length;i++)
    {    
        if(!visited[i])
        {
            let res=dfs(i,path,visited,edges);
            ans=Math.max(ans,res);
        }
    }
    
    return ans;
};

console.log(longestCycle([3,3,4,2,3]))


// Further read:
// Tarjan algorithm 
// Kosaraju's algorithm

// https://leetcode.com/problems/longest-cycle-in-a-graph/discuss/2357790/Python-Linear-DFS-with-clean-thought-process-when-being-asked-during-interviews