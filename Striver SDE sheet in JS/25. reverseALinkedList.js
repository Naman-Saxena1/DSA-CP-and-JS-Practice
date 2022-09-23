// Given the head of a singly linked list,
// reverse the list, and return the reversed list.

// Approach 1 - Iterative
var reverseList = function(head)
{  
    var tmp = null;
    var newHead = null;
    
    while(head !== null)
    {
      tmp = head;
      head = head.next;
      tmp.next = newHead;
      newHead = tmp;
    }
    
    return newHead;

    // Time Complexity  - O(n)
    // Space Complexity - O(1) 
}

// Approach 2 - Recursive
function reverseList(head) 
{
    if (!head || !head.next) 
    {
        return head;
    }
    var newHead = reverseList(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

// ES6 Syntax
var reverseList = function(head) 
{
    let [prev, current] = [null, head]
    while(current) 
    {
        [current.next, prev, current] = [prev, current, current.next]
    }
    return prev
}

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

console.log(reverseList(head))