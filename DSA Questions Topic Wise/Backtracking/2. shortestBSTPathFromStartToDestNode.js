// You are given the root of a binary tree with n nodes. 
// Each node is uniquely assigned a value from 1 to n. 
// You are also given an integer startValue representing the value 
// of the start node s, and a different integer destValue 
// representing the value of the destination node t.

// Find the shortest path starting from node s and ending at node t. 
// Generate step-by-step directions of such path as a string 
// consisting of only the uppercase letters 'L', 'R', and 'U'. 
// Each letter indicates a specific direction:

// 'L' means to go from a node to its left child node.
// 'R' means to go from a node to its right child node.
// 'U' means to go from a node to its parent node.
// Return the step-by-step directions of the shortest path from node s to node t.

// Example 1:
// Input: root = [5,1,2,3,null,6,4], startValue = 3, destValue = 6
// Output: "UURL"
// Explanation: The shortest path is: 3 → 1 → 5 → 2 → 6.

// Example 2:
// Input: root = [2,1], startValue = 2, destValue = 1
// Output: "L"
// Explanation: The shortest path is: 2 → 1.
 

// Constraints:
// The number of nodes in the tree is n.
// 2 <= n <= 105
// 1 <= Node.val <= n
// All the values in the tree are unique.
// 1 <= startValue, destValue <= n
// startValue != destValue

var getDirections = function(root, startValue, destValue) {
    const startPath = getPath(root, startValue);
    const destPath = getPath(root, destValue);
    
    // Remove common prefix - this is the path to the LCA
    while (startPath[0] === destPath[0]) {
        startPath.shift();
        destPath.shift();
    }
    
    // The path from start to LCA is just "U" the path length times
    const startStr = "U".repeat(startPath.length);
    const destStr = destPath.join("");
    
    return startStr + destStr;
};

function getPath(root, target) {
    const path = [];
    
    const backtrack = node => {
        if (!node) {
            return false;
        }
        
        if (node.val === target) {
            return true;
        }
        
        // Try left subtree
        path.push("L");
        if (backtrack(node.left)) {
            return true;
        }
        path.pop();
        
        // Try right subtree
        path.push("R");
        if (backtrack(node.right)) {
            return true;
        }
        path.pop();
    };
    
    backtrack(root);
    
    return path;
}

// function TreeNode(val, left, right) {
//     this.val = (val===undefined ? 0 : val)
//     this.left = (left===undefined ? null : left)
//     this.right = (right===undefined ? null : right)
// }
    
let inputlinkedListArr = [5,1,2,3,null,6,4]
let head = {}
function buildBST(head, index)
{
    head.val = inputlinkedListArr[index]==null?0:inputlinkedListArr[index]
    
    if(head.val!=null)
    {
        head.left = index*2+1<inputlinkedListArr.length?buildBST({},index*2+1):null
        head.right = index*2+2<inputlinkedListArr.length?buildBST({},index*2+2):null
    }

    return head
}

buildBST(head,0)
console.log(getDirections(head,3,6))