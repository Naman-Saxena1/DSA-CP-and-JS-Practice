// Given the head of a linked list, reverse the nodes of the list k at a time, and return the modified list.

// k is a positive integer and is less than or equal to the length of the linked list. 
// If the number of nodes is not a multiple of k then left-out nodes, in the end, should remain as it is.

// You may not alter the values in the list's nodes, only nodes themselves may be changed.

 

// Example 1:
// Input: head = [1,2,3,4,5], k = 2
// Output: [2,1,4,3,5]

// Example 2:
// Input: head = [1,2,3,4,5], k = 3
// Output: [3,2,1,4,5]
 

// Constraints:
// The number of nodes in the list is n.
// 1 <= k <= n <= 5000
// 0 <= Node.val <= 1000
 

// Follow-up: Can you solve the problem in O(1) extra memory space?


// Approach 1
// var reverseKGroup = function(head, k) {
//     let newHead = head, p1 = head, p2 = head;
//     let count = 0, i = 0, prevListNode;
    
//     while(p2!==null)
//     {
//         ++count;
//         if(count==k)
//         {
//             let nextListNode = p2.next;
//             if(i==0)
//             {
//                 newHead = p2;
//                 ++i
//             }
//             else
//             {
//                 prevListNode.next = p2;
//             }
            
//             let [prev,current] = [nextListNode,p1]
            
//             while(current!=p1.next && current!=null)
//             {
//                 [current.next, prev, current] = [prev, current, current.next]
//             }
//             prevListNode = p1;
//             p2 = p1.next;
//             p1 = p1.next;
//             count = 0;
//         }
//         else
//         {
//             p2 = p2.next;
//         }
//     }
    
//     return newHead
// };


// Approach 2
var reverseKGroup = function(head, k) {
    if(k == 1) return head
    
    let nodes = {}
    
    let len = 1
    while(head)
    {
        nodes[len] = head
        head = head.next
        len++
    }
    len--
    
    let result = null
    let mod = len % k
    let step = k
    let node
    
    // If some extra nodes are getting left
    // directly add them to result in original order
    if(mod>0)
    {
        len-=mod
        result = nodes[len + 1]
    }

    // Remaining length which is multiple of k
    for(let i=len; i>0; i-=k)
    {
        // Keep adding nodes in reverse order for current last group
        for(let j = step; j > 0; j--)
        {
            node = nodes[i - j + 1]
            node.next = result
            result = node
        }
    }

    return result
};

let head = {
    val  : 1,
    next : {
        val  : 2,
        next : {
            val : 3,
            next: {
                val : 4,
                next: {
                    val : 5,
                    next: null
                }
            }
        }
    }
}

console.log(reverseKGroup(head))