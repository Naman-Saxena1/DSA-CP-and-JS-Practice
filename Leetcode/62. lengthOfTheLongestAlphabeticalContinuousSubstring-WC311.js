// An alphabetical continuous string is a string consisting of consecutive letters in the alphabet. 
// In other words, it is any substring of the string "abcdefghijklmnopqrstuvwxyz".

// For example, "abc" is an alphabetical continuous string, while "acb" and "za" are not.
// Given a string s consisting of lowercase letters only, 
// return the length of the longest alphabetical continuous substring.

 

// Example 1:
// Input: s = "abacaba"
// Output: 2
// Explanation: There are 4 distinct continuous substrings: "a", "b", "c" and "ab".
// "ab" is the longest continuous substring.

// Example 2:
// Input: s = "abcde"
// Output: 5
// Explanation: "abcde" is the longest continuous substring.
 

// Constraints:
// 1 <= s.length <= 105
// s consists of only English lowercase letters.


// Approach 1 - Brute Force Sliding Window solution
// var longestContinuousSubstring = function(s) {
//     if(s.length==1){return 1}
//     let left=0, right=1,max=1;
    
//     while(right<s.length)
//     {
//         if(s[right-1].charCodeAt()+1 === s[right].charCodeAt())
//         {
//             max=Math.max(max,right-left+1);
//             ++right;
//         }
//         else
//         {
//             while(left!==right && s[right-1].charCodeAt()+1 !== s[right].charCodeAt())
//             {
//                 left=right
//             }
//             ++right;
//         }
//     }
    
//     return max
// };


// Approach 2 - Most optimised O(N) solution 
var longestContinuousSubstring = function(s) {
    let n = s.length, count = 1, ans = 1, prevCharcode, currCharcode;
  
    for(let i=1; i<n; i++)
    {
        prevCharcode = s.charCodeAt(i - 1);
        currCharcode = s.charCodeAt(i);
        
        if(currCharcode - prevCharcode === 1)
        {
            count++;
        }
        else
        {
            count = 1;
        }
        ans = Math.max(ans, count);
    }
    // Time Complexity  - O(N)
    // Space Complexity - O(1)

    return ans;
};

console.log(longestContinuousSubstring("abacaba"))