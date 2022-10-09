// We run a preorder depth-first search (DFS) on the root of a binary tree.

// At each node in this traversal, we output D dashes 
// (where D is the depth of this node), then we output the value of this node.  
// If the depth of a node is D, the depth of its immediate child is D + 1.  
// The depth of the root node is 0.

// If a node has only one child, that child is guaranteed to be the left child.

// Given the output traversal of this traversal, recover the tree and return its root.

 

// Example 1:
// Input: traversal = "1-2--3--4-5--6--7"
// Output: [1,2,5,3,4,6,7]

// Example 2:
// Input: traversal = "1-2--3---4-5--6---7"
// Output: [1,2,5,3,null,6,null,4,null,7]

// Example 3:
// Input: traversal = "1-401--349---90--88"
// Output: [1,401,null,349,88,90]


// Constraints:
// The number of nodes in the original tree is in the range [1, 1000].
// 1 <= Node.val <= 109


// Definition for a binary tree node.
function TreeNode(val, left, right){
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

// Approach 1 - Morris Traversal
// https://leetcode.com/problems/recover-a-tree-from-preorder-traversal/discuss/2032407/O(1)-space-using-Morris-Traversal-JavaScript
// https://www.youtube.com/watch?v=80Zug6D1_r4
// var recoverFromPreorder = function(traversal) {
//     const dummy = new TreeNode();
//     let curr = dummy;
//     let depth = -1;
    
//     for(let i = 0; i < traversal.length;)
//     {
//         let nextDepth = 0;
//         let nextVal = 0;
        
//         // Processing current Depth and storing in nextDepth
//         while(traversal[i] === "-")
//         {
//             nextDepth++;
//             ++i;
//         }
        
//         // Processing whole number from String to Number with proper 10 powers
//         // And storing it into nextVal
//         while(traversal[i] && traversal[i] !== "-")
//         {
//             nextVal = (nextVal * 10) + Number(traversal[i]);
//             ++i;
//         }

//         // If depth of node to be inserted is less than or equal to
//         // depth of the previous node inserted
//         // remove right pointers till parent of new node to be inserted
//         // and decrease depth
//         while(nextDepth <= depth)
//         {
//             const ancestor = curr.right;
            
//             let numAbove = 0;

//             for(let node=ancestor.left; node!==ancestor; node=node.right)
//             {
//                 numAbove++;
//             }
            
//             curr.right = null; 
//             curr = ancestor;
//             depth -= numAbove;
//         }
        
//         // Node to be inserted to its ancestor (curr)
//         const next = new TreeNode(nextVal);

//         // If curr's left is empty, insert in left else right
//         // And update new node's right pointer to according next non-complete parent
//         if(!curr.left)
//         {
//             next.right = curr; 
//             curr.left = next;
//         }
//         else
//         {
//             next.right = curr.right; 
//             curr.right = next;
//         }
        
//         curr = next;
//         depth = nextDepth;
//     }
    
//     // Removing pointer joining last rightmost bottom node to its parent
//     while(curr.right)
//     {
//         const ancestor = curr.right;
//         curr.right = null;
//         curr = ancestor;
//     }
    
//     return dummy.left;
// }


// Approach 2 - Using Stack
var recoverFromPreorder = function(traversal) {
    let i=0, level, val, stack = [];

    while(i<traversal.length)
    {
        level = 0;
        while(traversal[i] == '-')
        {
            level++;
            i++;
        }
        
        val = 0;
        while( (i<traversal.length) && (traversal[i]!='-') )
        {
            val = val * 10 + Number(traversal[i]);
            i++;
        }

        while(stack.length > level)
        {
            stack.pop();
        }

        let node = new TreeNode(val);

        if(stack.length!=0)
        {
            if(stack[stack.length-1].left == null)
            {
                stack[stack.length-1].left = node;
            }
            else
            {
                stack[stack.length-1].right = node;
            }
        }

        stack.push(node);
    }

    while(stack.length > 1)
    {
        stack.pop();
    }

    return stack.pop();
}

console.log(recoverFromPreorder("1-2--3--4-5--6--7"))