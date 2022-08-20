// Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
// determine if the input string is valid.

// An input string is valid if:
// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
 

// Example 1:
// Input: s = "()"
// Output: true

// Example 2:
// Input: s = "()[]{}"
// Output: true

// Example 3:
// Input: s = "(]"
// Output: false


// Constraints:
// 1 <= s.length <= 104
// s consists of parentheses only '()[]{}'.


// Approach 1
// var isValid = function(s) {
//     let stack = []
    
//     for(let i=0; i<s.length; i++)
//     {
//         if(s[i]=='(' || s[i]=='{' || s[i]=='[')
//         {
//             stack.push(s[i])
//         }
//         else
//         {
//             if(s[i]==')')
//             {
//                 if(stack[stack.length-1]==='(')
//                 {
//                     stack.pop()
//                 }
//                 else
//                 {
//                     return false
//                 }
//             }
//             else
//             {
//                 if(s[i]=='}')
//                 {
//                     if(stack[stack.length-1]==='{')
//                     {
//                         stack.pop()
//                     }
//                     else
//                     {
//                         return false
//                     }
//                 }
//                 else
//                 {
//                     if(s[i]==']')
//                     {
//                         if(stack[stack.length-1]==='[')
//                         {
//                             stack.pop()
//                         }
//                         else
//                         {
//                             return false
//                         }
//                     }
//                 }
//             }
//         }
//     }
    
//     if(stack.length===0)
//     {
//         return true
//     }
//     return false
// };


// Approach 2
var isValid = function(s) {   
    const stack = [];
    
    for (let i = 0 ; i < s.length ; i++) 
    {
        let c = s.charAt(i);
        switch(c) {
            case '(': stack.push(')');
                break;
            case '[': stack.push(']');
                break;
            case '{': stack.push('}');
                break;
            default:
                if (c !== stack.pop()) 
                {
                    return false;
                }
        }
    }
    
    return stack.length === 0;
};

console.log(isValid('()[]{}(]'))