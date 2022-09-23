// You are given two non-empty linked lists representing two non-negative integers. 
// The digits are stored in reverse order, and each of their nodes contains a single digit. 
// Add the two numbers and return the sum as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

 

// Example 1:
// Input: l1 = [2,4,3], l2 = [5,6,4]
// Output: [7,0,8]
// Explanation: 342 + 465 = 807.

// Example 2:
// Input: l1 = [0], l2 = [0]
// Output: [0]

// Example 3:
// Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// Output: [8,9,9,9,0,0,0,1]
 

// Constraints:
// The number of nodes in each linked list is in the range [1, 100].
// 0 <= Node.val <= 9
// It is guaranteed that the list represents a number that does not have leading zeros.




// Approach 1
// Passes 1564/1568 testcases
// Doesn't work for extremely big inputs
// var addTwoNumbers = function(l1, l2) {
//     let l3 = {val: 0, next: null}
//     let multiplier = 10, sum = l1.val+l2.val;
    
//     while(l1?.next!=null || l2?.next!=null)
//     {
//         if(l1!==null)
//         {
//             l1 = l1.next;
//         }
            
//         if(l2!==null)
//         {
//             l2 = l2.next;
//         }
//         sum += ( (l1==null?0:l1.val) + (l2==null?0:l2.val) )*multiplier
//         multiplier *= 10
//     }
    
//     let result = l3;
//     while(sum)
//     {
//         l3.val = sum%10;
//         sum = Math.trunc(sum/10)
//         if(sum)
//         {
//             l3.next = {val:0,next:null}
//         }
//         else
//         {
//             l3.next = null;
//         }
//         l3 = l3.next;
//     }
    
//     return result
// };



// Approach 2
var addTwoNumbers = function(l1, l2) {
    if(l1 === null || l2 === null) return null;
    let dummyHead = new ListNode(0);
    let cur1 = l1;
    let cur2 = l2;
    let cur = dummyHead;
    let carry = 0
    
    while(cur1!= null || cur2!= null)
    {
        let val1 = cur1 !== null ? cur1.val : 0;
        let val2 = cur2 !== null ? cur2.val : 0;
        let sum = val1 + val2 + carry;
        let newNode = new ListNode(sum % 10)
        carry = sum >= 10 ? 1:0;
        cur.next = newNode;
        cur = cur.next
        
        if(cur1 !== null)
        {
            cur1 = cur1.next
        }

        if(cur2 !== null)
        {
            cur2 = cur2.next
        }
    }

    if(carry > 0)
    {
        cur.next = new ListNode(carry)
    }
    return dummyHead.next
};