// Given the head of a linked list, 
// remove the nth node from the end of the list and return its head.

// Example 1:
// Input: head = [1,2,3,4,5], n = 2
// Output: [1,2,3,5]

// Example 2:
// Input: head = [1], n = 1
// Output: []

// Example 3:
// Input: head = [1,2], n = 1
// Output: [1]
 

// Constraints:
// The number of nodes in the list is sz.
// 1 <= sz <= 30
// 0 <= Node.val <= 100
// 1 <= n <= sz


// Approach 1 - Brute Force Approach
// var removeNthFromEnd = function(head, n) {
//     let pointer1 = head, prev = head, next, count=1;
//     head.count = 1
    
//     while(pointer1.next!=null)
//     {
//         pointer1.count = count;
//         pointer1 = pointer1.next;
//         ++count;
//     }
//     pointer1.count = count;
    
//     if((count-prev.count)!==0)
//     {
//         while(prev!==null && (count-prev.count)>n)
//         {
//             prev = prev.next;
//         }
//     }
    
//     if((count==1 && prev == head) || (count-prev.count+1)==n)
//     {
//         let targetNode = prev;
//         head = head.next;
//         targetNode.next = null
//     }
//     else
//     {
//         let targetNode = prev.next
//         prev.next = prev.next.next;
//         targetNode.next = null
//     }
    
//     // Time Complexity  - O(2N) -> O(N)
//     // Space Complexity - O(1)

//     return head
// };



// Approach 2 - More Optimised Solution
var removeNthFromEnd = function(head, n) {
    let temp = {next: head};
    let fast = temp, slow = temp;
    let dist = n;
    
    while(dist)
    {
        fast = fast.next;
        --dist;
    }
    
    while(fast.next!==null)
    {
        slow = slow.next;
        fast = fast.next;
    }
    
    let target = slow.next;
    if(target==head)
    {
        head = head.next
        target.next = null;
        return head
    }
    
    slow.next = slow.next.next;
    target.next = null;
    
    // Time Complexity  - O(N)
    // Space Complexity - O(1) 

    return head
};


// Input 1
head1 = {
    val  : 1,
    next : {
        val  : 2,
        next : {
            val  : 3,
            next : {
                val  : 4,
                next : {
                    val  : 5,
                    next : null
                }
            }
        }
    }
}

// Input 2
head2 = {
    val  : 1,
    next : null
}


// Input 3
head3 = {
    val  : 1,
    next : {
        val  : 2,
        next : null
    }
}

console.log(JSON.stringify(removeNthFromEnd(head1,2)))