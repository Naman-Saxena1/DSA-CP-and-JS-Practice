// You are given the heads of two sorted linked lists list1 and list2.

// Merge the two lists in a one sorted list. 
// The list should be made by splicing together the nodes 
// of the first two lists.
// Return the head of the merged linked list.

// Example 1:
// Input: list1 = [1,2,4], list2 = [1,3,4]
// Output: [1,1,2,3,4,4]

// Example 2:
// Input: list1 = [], list2 = []
// Output: []

// Example 3:
// Input: list1 = [], list2 = [0]
// Output: [0]
 

// Constraints:
// The number of nodes in both lists is in the range [0, 50].
// -100 <= Node.val <= 100
// Both list1 and list2 are sorted in non-decreasing order.


// Approach 1 - Brute Force Attempt
// var mergeTwoLists = function(list1, list2) {
//     let mergedList = null, current = null;
    
    
//     if(!list1 && !list2)
//     {
//        return null
//     }
//     else
//     {
//         if(!list1)
//         {
//            return list2
//         }
//         else
//         {
//             if(!list2)
//             {
//                return list1
//             }
//         }
//     }
    
//     while(list1!=null || list2!=null)
//     {
//         if(list1==null || list2==null)
//         {
//             current.next = list1==null? list2: list1
//             break;
//         }
        
//         if(list1.val<=list2.val)
//         {
//             if(current!=null)
//             {
//                 current.next = list1
//                 list1 = list1.next
//                 current = current.next
//             }
//             else
//             {
//                 current = list1
//                 list1 = list1.next
//                 current.next = null
//             }
//         }
//         else
//         {
//             if(current!=null)
//             {
//                 current.next = list2
//                 list2 = list2.next
//                 current = current.next
//             }
//             else
//             {
//                 current = list2
//                 list2 = list2.next
//                 current.next = null
//             }
//         }
        
//         if(mergedList==null)
//         {
//             mergedList = current
//         }
//     }
    
//     return mergedList
// };

function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}

// Approach 2 - Using Extra Space
// var mergeTwoLists = function(list1, list2) 
// {  
//     let resList = new ListNode(0,null)
//     let head = resList
    
//     while(list1 && list2)
//     {
//       if(list1.val <= list2.val)
//       {
//         resList.next = new ListNode(list1.val,null)
//         list1 = list1.next
//       }
//       else
//       {
//         resList.next = new ListNode(list2.val,null)
//         list2 = list2.next
//       }
//       resList = resList.next
//     }

//     resList.next = new ListNode(list1?.val || list2?.val,null)
//     return head.next

//     // Time Complexity  - O(N)
//     // Space Complexity - O(N)
// };

// Approach 3 - Optimised
var mergeTwoLists = function(list1, list2) 
{  
    let resList = new ListNode(0,null)
    let head = resList
    
    while(list1 && list2)
    {
      if(list1.val <= list2.val)
      {
        resList.next = list1
        list1 = list1.next
      }
      else
      {
        resList.next = list2
        list2 = list2.next
      }
      resList = resList.next
    }

    resList.next = list1 || list2
    return head.next

    // Time Complexity  - O(N)
    // Space Complexity - O(1)
};

let list1 = {
    val  : 1,
    next : {
        val  : 2,
        next : {
            val  : 4,
            next : null
        }
    }
}

let list2 = {
    val  : 1,
    next : {
        val  : 3,
        next : {
            val  : 4,
            next : null
        }
    }
}

console.log(JSON.stringify(mergeTwoLists(list1, list2)))