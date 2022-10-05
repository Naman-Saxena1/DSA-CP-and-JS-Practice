// Given the head of a singly linked list, 
// return true if it is a palindrome or false otherwise.

// Example 1:
// Input: head = [1,2,2,1]
// Output: true

// Example 2:
// Input: head = [1,2]
// Output: false
 

// Constraints:
// The number of nodes in the list is in the range [1, 105].
// 0 <= Node.val <= 9

// Follow up: Could you do it in O(n) time and O(1) space?

// Approach 1 - Brute Force Approach
// var isPalindrome = function(head) {
//     let p1 = head, str1 = "";
    
//     while(p1!=null)
//     {
//         str1 += p1.val,
//         p1 = p1.next
//     }
    
//     return str1===str1.split('').reverse().join('')
// };



// Approach 2
var isPalindrome = function(head) {
    var fast = head, slow = head
    var prev = null
    
    while(fast && fast.next)
    {
        let tmp = slow
        
        slow = slow.next
        fast = fast.next.next
        
        tmp.next = prev
        prev = tmp
    }
    
    // In case of Odd number of nodes
    if (fast) slow = slow.next
    
    while(slow)
    {
        if (slow.val != prev.val)
        {
            return false
        }
        slow = slow.next
        prev = prev.next
    }

    // Time Complexity  - O(n)
    // Space Complexity - O(1)
    
    return true
}

// Approach 3 using O(1) Space Complexity 
// var isPalindrome = function(head) {
//     let slow = head, fast = head, prev, temp;

//     // After this while loop
//     // For even length Linked List, slow will be at mid node
//     // For odd length Linked List, slow will be at beginning of next part
//     while(fast && fast.next)
//     {    
//         slow = slow.next, fast = fast.next.next
//     }
    
//     // Setting prev at node, which will be center for both side traversals
//     prev = slow, slow = slow.next, prev.next = null
    
//     // Reversing second half of Linked List
//     while(slow)
//     {
//         temp = slow.next, slow.next = prev, prev = slow, slow = temp
//     }

//     // Setting fast and slow at 1st node of both halves
//     // (slow will be at last node as 2nd half is now reversed)
//     fast = head, slow = prev
    
//     // Traversing slow and fast 1 node at a time
//     // If at any node, values don't match, it is NOT a palindromic Linked List
//     while(slow)
//     {
//         if (fast.val !== slow.val) return false
//         else fast = fast.next, slow = slow.next
//     }

//     return true
// };

// https://leetcode.com/problems/palindrome-linked-list/discuss/1137027/JS-Python-Java-C%2B%2B-or-Easy-Floyd's-%2B-Reversal-Solution-w-Explanation


// Approach 2 is more readable and intuitive