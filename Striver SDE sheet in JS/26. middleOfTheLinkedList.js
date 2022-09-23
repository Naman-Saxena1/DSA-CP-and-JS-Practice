// Given the head of a singly linked list, 
// return the middle node of the linked list.
// If there are two middle nodes, return the second middle node.


// Approach 1 - Slow and Fast Pointer
var middleNode = function(head) 
{
    let fast = slow = head;
    while (fast && fast.next) 
    {
        fast = fast.next.next;
        slow = slow.next;
    }
    return slow;

    // Time Complexity  - O(N)
    // Space Complexity - O(1)
};

let head = {
    val  : 10,
    next : {
        val  : 20,
        next : {
            val  : 30,
            next : {
                val  : 40,
                next : null
            }
        }
    }
}

console.log(middleNode(head))