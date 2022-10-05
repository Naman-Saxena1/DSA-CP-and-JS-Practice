// Given a Linked List of size N, where every node represents a sub-linked-list and contains two pointers:
// (i) a next pointer to the next node,
// (ii) a bottom pointer to a linked list where this node is head.
// Each of the sub-linked-list is in sorted order.
// Flatten the Link List such that all the nodes appear in a single level while maintaining the sorted order. 
// Note: The flattened list will be printed using the bottom pointer instead of next pointer. 
// For more clearity have a look at the printList() function in the driver code.

// Example 1:
// Input:
// 5 -> 10 -> 19 -> 28
// |     |     |     | 
// 7     20    22   35
// |           |     | 
// 8          50    40
// |                 | 
// 30               45
// Output:  5-> 7-> 8- > 10 -> 19-> 20->
// 22-> 28-> 30-> 35-> 40-> 45-> 50.
// Explanation:
// The resultant linked lists has every 
// node in a single level.
// (Note: | represents the bottom pointer.)
 

// Example 2:
// Input:
// 5 -> 10 -> 19 -> 28
// |          |                
// 7          22   
// |          |                 
// 8          50 
// |                           
// 30              
// Output: 5->7->8->10->19->22->28->30->50
// Explanation:
// The resultant linked lists has every
// node in a single level.

// (Note: | represents the bottom pointer.)

// Your Task:
// You do not need to read input or print anything. 
// Complete the function flatten() that takes the head of the linked list 
// as input parameter and returns the head of flattened link list.


// Expected Time Complexity: O(N*M)
// Expected Auxiliary Space: O(1)

// Constraints:
// 0 <= N <= 50
// 1 <= Mi <= 20
// 1 <= Element of linked list <= 103

// Approach 1
class Node {
    constructor(val)
    {
        this.data = val;
        this.down = null;
        this.next = null;
    }
}

function merge(Node1, Node2) {
    let temp = new Node(-1);
    let head = temp;
        
    while(Node1 && Node2)
    {
        if(Node1.data < Node2.data)
        {
            Node1.next = null
            temp.bottom = Node1;
            Node1 = Node1.bottom;
        }
        else
        {
            Node2.next = null
            temp.bottom = Node2;
            Node2 = Node2.bottom;
        }
        temp = temp.bottom;
    }
    
    if(Node1 !== null)
    {
        Node1.next = null
        temp.bottom = Node1;
    }
    else
    {
        Node2.next = null
        temp.bottom = Node2;
    }
    
    return head.bottom;
}

function flatten(head)
{
    if(head === null || head.next === null)
    {
        return head;
    }

    head.next = flatten(head.next);

    head = merge(head,head.next);
    
    return head;
}

// head1
// 5 -> 10 -> 19 -> 28
// |          |                
// 7          22   
// |          |                 
// 8          50 
// |                           
// 30   

let head1 = {
    data: 5,
    next: {
        data : 10,
        next : {
            data : 19,
            next : {
                data : 28,
                next : null,
                bottom : null
            },
            bottom : {
                data : 22,
                next : null,
                bottom : {
                    data : 50,
                    next : null,
                    bottom : null
                }
            }
        },
        bottom : null
    },
    bottom : {
        data : 7,
        next : null,
        bottom: {
            data : 8,
            next : null,
            bottom: {
                data : 30,
                next : null,
                bottom: null
            }
        }
    }
}

// let head2 = {
//     data: 5,
//     next: {
//         data : 10,
//         next: null,
//         bottom: null
//     },
//     bottom : {
//         data : 7,
//         next : null,
//         bottom: null
//     }
// }

console.log(JSON.stringify(flatten(head1),null,2))