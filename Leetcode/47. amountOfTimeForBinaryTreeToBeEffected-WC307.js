// You are given the root of a binary tree with unique values, 
// and an integer start. At minute 0, 
// an infection starts from the node with value start.

// Each minute, a node becomes infected if:

// The node is currently uninfected.
// The node is adjacent to an infected node.
// Return the number of minutes needed for the entire tree to be infected.

 

// Example 1:
// Input: root = [1,5,3,null,4,10,6,9,2], start = 3
// Output: 4
// Explanation: The following nodes are infected during:
// - Minute 0: Node 3
// - Minute 1: Nodes 1, 10 and 6
// - Minute 2: Node 5
// - Minute 3: Node 4
// - Minute 4: Nodes 9 and 2
// It takes 4 minutes for the whole tree to be infected so we return 4.

// Example 2:
// Input: root = [1], start = 1
// Output: 0
// Explanation: At minute 0, the only node in the tree is infected so we return 0.
 


// Constraints:
// The number of nodes in the tree is in the range [1, 105].
// 1 <= Node.val <= 105
// Each node has a unique value.
// A node with a value of start exists in the tree.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
// /**
//  * @param {TreeNode} root
//  * @param {number} start
//  * @return {number}
//  */


// Approach 1 - Simultaneous BFS from infected nodes
// Bitmask not working for nodeArr indexes above 32 bits
// Use Map instead to maintain visited nodes
// var amountOfTime = function(root, start) {
//     let minutes = -1, nodeArr = [], startIndex, visitedBitMask = 1;
    
//     function generateNodeArray(node,index)
//     {
//         if(node.val != 0)
//         {
//             nodeArr[index] = node.val
//             if(node.val == start)
//             {
//                 startIndex = index
//             }
//         }
//         else
//         {
//             return;
//         }
        
//         if(node.left)
//         {
//             generateNodeArray(node.left,index*2)
//         }
        
//         if(node.right)
//         {
//             generateNodeArray(node.right,(index*2)+1)
//         }
//     }
    
//     generateNodeArray(root,1)
//     if(nodeArr.length == 2)
//     {
//         return 0
//     }
    
//     let currentBfsIndexes = [startIndex], nextBfsIndexes, parent, leftChild, rightChild;
    
//     visitedBitMask = visitedBitMask | 1<<startIndex
    
//     while(currentBfsIndexes.length && nodeArr.length)
//     {
//         ++minutes
//         nextBfsIndexes = []
        
//         for(let i=0; i<currentBfsIndexes.length; i++)
//         {
//             parent     = Math.floor(currentBfsIndexes[i]/2)
//             leftChild  = currentBfsIndexes[i]*2
//             rightChild = currentBfsIndexes[i]*2 + 1
            
//             if( ((visitedBitMask>>parent) & 1) == 0 && nodeArr[parent]!=undefined)
//             {
//                 nextBfsIndexes.push(parent)
//                 visitedBitMask = visitedBitMask | (1<<parent)
//             }
            
//             if( ((visitedBitMask>>leftChild) & 1) == 0 && nodeArr[leftChild]!=undefined)
//             {
//                 nextBfsIndexes.push(leftChild)
//                 visitedBitMask = visitedBitMask | (1<<leftChild)
//             }
            
//             if( ((visitedBitMask>>rightChild) & 1) == 0 && nodeArr[rightChild]!=undefined)
//             {
//                 nextBfsIndexes.push(rightChild)
//                 visitedBitMask = visitedBitMask | (1<<rightChild)
//             }
//         }
        
//         currentBfsIndexes = [...nextBfsIndexes]
//     }
    
//     return minutes
// };



// Approach 2
// Doesn't work for large inputs
// because nodeArr length is exceeding 2**32 items
// var amountOfTime = function(root, start) {
//     let minutes = -1, nodeArr = [], startIndex;
//     let visitedIndexesMap = new Map()
//     visitedIndexesMap.set(0,true)
    
//     function generateNodeArray(node,index)
//     {
//         if(node.val != 0)
//         {
//             nodeArr[index] = node.val
//             if(node.val == start)
//             {
//                 startIndex = index
//             }
//         }
//         else
//         {
//             return;
//         }
        
//         if(node.left)
//         {
//             generateNodeArray(node.left,index*2)
//         }
        
//         if(node.right)
//         {
//             generateNodeArray(node.right,(index*2)+1)
//         }
//     }
    
//     generateNodeArray(root,1)
//     if(nodeArr.length == 2)
//     {
//         return 0
//     }
    
//     let currentBfsIndexes = [startIndex], nextBfsIndexes, parent, leftChild, rightChild;
    
//     visitedIndexesMap.set(startIndex,true)
    
//     while(currentBfsIndexes.length && nodeArr.length)
//     {
//         ++minutes
//         nextBfsIndexes = []
        
//         for(let i=0; i<currentBfsIndexes.length; i++)
//         {
//             parent     = Math.floor(currentBfsIndexes[i]/2)
//             leftChild  = currentBfsIndexes[i]*2
//             rightChild = currentBfsIndexes[i]*2 + 1

//             if( visitedIndexesMap.has(parent) == false && nodeArr[parent]!=undefined)
//             {
//                 nextBfsIndexes.push(parent)
//                 visitedIndexesMap.set(parent,true)
//             }
            
//             if( visitedIndexesMap.has(leftChild) == false && nodeArr[leftChild]!=undefined)
//             {
//                 nextBfsIndexes.push(leftChild)
//                 visitedIndexesMap.set(leftChild,true)
//             }
            
//             if( visitedIndexesMap.has(rightChild) == false && nodeArr[rightChild]!=undefined)
//             {
//                 nextBfsIndexes.push(rightChild)
//                 visitedIndexesMap.set(rightChild,true)
//             }
//         }
        
//         currentBfsIndexes = [...nextBfsIndexes]
//     }
    
//     return minutes
// };


// Approach 3 Solution 1
// Stores whole object in visited set
// DFS to create map for each node as { node obj -> parent obj }
// BFS from start node and then do simultaneous BFS from next nodes in queue q
// var amountOfTime = function(root, start) {
//     const parentMap = new Map();
//     let startNode;

//     function dfs(node, pa)
//     {
//         if(node === null) 
//         {
//             return;
//         }

//         if(node.val === start) 
//         {
//             startNode = node;
//         }

//         if(!parentMap.has(node))
//         {
//             parentMap.set(node, pa);
//         }

//         dfs(node.left, node);
//         dfs(node.right, node);
//     }
//     dfs(root, null);

//     // bfs count time/level
//     const q = [startNode];
//     const visited = new Set();
//     let step = 0;

//     while(q.length > 0)
//     {
//         const size = q.length;

//         for(let i =0; i<size;i++) 
//         {
//             const cur = q.shift();
//             visited.add(cur);

//             if(cur.left && !visited.has(cur.left)) 
//             {
//                 q.push(cur.left);
//             }

//             if(cur.right && !visited.has(cur.right)) 
//             {
//                 q.push(cur.right);
//             }

//             const parent = parentMap.get(cur);

//             if( parent && !visited.has(parent)) 
//             {
//                 q.push(parent);
//             }
//         }
//         step++;
//     }
//     return step-1;
// };



// root = [1,5,3,null,4,10,6,9,2]
// start = 3

// Approach 3 Solution 2
// Stores node value in visited set
// DFS to create map for each node as { node val -> parent obj }
// BFS from start node and then do simultaneous BFS from next nodes in array queue
var amountOfTime = function(root, start) {
    let parent = new Map(), startNode = null;
    
    function dfs(node) 
    {
        if(node.val === start)
        {
            startNode = node;
        }

        if(node.left) 
        {
            parent.set(node.left.val, node);
            dfs(node.left);
        }

        if(node.right) 
        {
            parent.set(node.right.val, node);
            dfs(node.right);
        } 
    } 
    dfs(root);

    let visited = new Set([startNode.val]), queue = [startNode], time = 0;

    while(queue.length) 
    {
        for(let i=queue.length-1; i >= 0; i--) 
        {
            let node = queue.shift();
            
            if(parent.has(node.val)) 
            {
                let nodeParent = parent.get(node.val);

                if(!visited.has(nodeParent.val)) 
                {
                    queue.push(nodeParent);
                    visited.add(nodeParent.val);
                }
            }

            if(node.left && !visited.has(node.left.val)) 
            {
                queue.push(node.left);
                visited.add(node.left.val);
            }

            if(node.right && !visited.has(node.right.val)) 
            {
                queue.push(node.right);
                visited.add(node.right.val);
            }
        }
        time++;
    }
    
    // Last time increment was extra, so reverting back
    return time - 1; 
};


// https://leetcode.com/problems/amount-of-time-for-binary-tree-to-be-infected/discuss/2456601/BFS-after-Creating-Graph-Full-Explanation