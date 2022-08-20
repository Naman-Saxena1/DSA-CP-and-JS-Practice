// Given the root of a binary tree, return its maximum depth.

// A binary tree's maximum depth is the number of nodes along the longest path 
// from the root node down to the farthest leaf node.

// Example 1:
// Input: root = [3,9,20,null,null,15,7]
// Output: 3

// Example 2:
// Input: root = [1,null,2]
// Output: 2
 

// Constraints:
// The number of nodes in the tree is in the range [0, 104].
// -100 <= Node.val <= 100


// Approach 1 - DFS
var maxDepth = function(root) {
    if(root===null)
    {
        return 0
    }
    
    function dfs(node)
    {
        let leftDepth=0, rightDepth=0;
        
        if(node.left)
        {
            ++leftDepth;
            leftDepth = dfs(node.left)
        }
        
        if(node.right)
        {
            ++rightDepth;
            rightDepth = dfs(node.right)
        }
        
        return Math.max(leftDepth+1,rightDepth+1)
    }
    
    return dfs(root)
};


// Approach 2 - Less lines DFS
var maxDepth = function(root) {
    if(root === undefined || root===null)
    {
        return 0;
    }
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;
};