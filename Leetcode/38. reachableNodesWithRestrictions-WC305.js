// There is an undirected tree with n nodes labeled from 
// 0 to n - 1 and n - 1 edges.

// You are given a 2D integer array edges of length n - 1 
// where edges[i] = [ai, bi] indicates that there is an edge between 
// nodes ai and bi in the tree. You are also given an integer array 
// restricted which represents restricted nodes.

// Return the maximum number of nodes you can reach from node 0 without 
// visiting a restricted node.

// Note that node 0 will not be a restricted node.
 

// Example 1:
// Input: n = 7, edges = [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]], restricted = [4,5]
// Output: 4
// Explanation: The diagram above shows the tree.
// We have that [0,1,2,3] are the only nodes that can be reached from node 0 without visiting a restricted node.

// Example 2:
// Input: n = 7, edges = [[0,1],[0,2],[0,5],[0,4],[3,2],[6,5]], restricted = [4,2,1]
// Output: 3
// Explanation: The diagram above shows the tree.
// We have that [0,5,6] are the only nodes that can be reached from node 0 without visiting a restricted node.


// Constraints:
// 2 <= n <= 105
// edges.length == n - 1
// edges[i].length == 2
// 0 <= ai, bi < n
// ai != bi
// edges represents a valid tree.
// 1 <= restricted.length < n
// 1 <= restricted[i] < n
// All the values of restricted are unique.


// Approach 1 - Brute Force Approach
// var reachableNodes = function(n, edges, restricted) {
//     let count = 0, currentNumsDestArr, currentNumsDestArr2;
//     let edgesMap = new Map()
    
//     if(edges.length<1)
//     {
//         return 0
//     }
    
//     for(let i=0; i<n-1; i++)
//     { 
//         if(edges[i][0]<edges[i][1])
//         {
//             currentNumsDestArr = edgesMap.get(edges[i][0])
            
//             if(currentNumsDestArr == undefined)
//             {
//                 edgesMap.set(edges[i][0],[edges[i][1]])
//             }
//             else
//             {
//                 currentNumsDestArr.push(edges[i][1])
//             }
            
//             currentNumsDestArr2 = edgesMap.get(edges[i][1])
            
//             if(currentNumsDestArr2 == undefined)
//             {
//                 edgesMap.set(edges[i][1],[edges[i][0]])
//             }
//             else
//             {
//                 currentNumsDestArr2.push(edges[i][0])
//             }
            
            
//         }
//         else
//         {
//             if(edges[i][0]>edges[i][1])
//             {
//                 currentNumsDestArr = edgesMap.get(edges[i][1])

//                 if(currentNumsDestArr == undefined)
//                 {
//                     edgesMap.set(edges[i][1],[edges[i][0]])
//                 }
//                 else
//                 {
//                     currentNumsDestArr.push(edges[i][0])
//                 }
            
//                 currentNumsDestArr2 = edgesMap.get(edges[i][0])

//                 if(currentNumsDestArr2 == undefined)
//                 {
//                     edgesMap.set(edges[i][0],[edges[i][1]])
//                 }
//                 else
//                 {
//                     currentNumsDestArr2.push(edges[i][1])
//                 }
//             }
//         }
//     }
    
//     function BFS(num, currentCount, path)
//     {
//         let neighBourNodesArr = edgesMap.get(num)
        
//         if( neighBourNodesArr != undefined)
//         {
//             for(let j=0; j<neighBourNodesArr.length; j++)
//             {
//                 if(neighBourNodesArr[j]!==0 && !restricted.includes(neighBourNodesArr[j]) && !path.includes(neighBourNodesArr[j]))
//                 {
//                     path.push(neighBourNodesArr[j])
//                     BFS(neighBourNodesArr[j],currentCount,path)
//                 }
//             }
//         }
//         else
//         {
//             return 1
//         }
        
//         return currentCount+1
//     }
//     let path = []
//     BFS(0,count,path)
    
//     return path.length+1
// };


// Approach 2 
// Better BFS Solution
// var reachableNodes = function (n, edges, restricted) 
// {
//     let res = 0;
//     const newVisitMap = {}
//     edges.forEach(([l, r]) => 
//     {
//         newVisitMap[l] ? newVisitMap[l].add(r) : newVisitMap[l] = new Set([r]);
//         newVisitMap[r] ? newVisitMap[r].add(l) : newVisitMap[r] = new Set([l]);
//     })

//     const map = new Set(restricted);
    
//     function bfs(node) 
//     {
//         if (map.has(node)) return;
//         map.add(node)
//         res++;
//         newVisitMap[node].forEach(e => bfs(e))
//     }
//     bfs(0);
//     return res;
// };


// Approach 3
// Using DFS
var reachableNodes = function(n, edges, restricted) {
    const adj = {};
    
    for (const [u, v] of edges) 
    {
        if (adj[u]) 
        {
            adj[u].add(v);
        } 
        else 
        {
            adj[u] = new Set().add(v);
        }
        
        if (adj[v]) 
        {
            adj[v].add(u);
        } 
        else 
        {
            adj[v] = new Set().add(u);
        }
    }
    
    const restrictedSet = new Set(restricted);
    const visited = new Set(restricted);
    
    let ans = 0;
    
    function dfs(node) 
    {
        if (restrictedSet.has(node) || visited.has(node)) 
        {
            return;
        }
        
        ans++;
        visited.add(node);
        
        for (const adjNode of adj[node]) 
        {
            dfs(adjNode);
        }
    }
    
    dfs(0);
    
    return ans;
};

console.log(reachableNodes(
    7,
    [[0,1],[1,2],[3,1],[4,0],[0,5],[5,6]],
    [4,5]
))