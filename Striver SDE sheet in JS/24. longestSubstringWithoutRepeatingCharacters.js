// Given a string s, 
// find the length of the longest substring without repeating characters.


// Example 1:
// Input: s = "abcabcbb"
// Output: 3
// Explanation: The answer is "abc", with the length of 3.

// Example 2:
// Input: s = "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.

// Example 3:
// Input: s = "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3.
// Notice that the answer must be a substring, 
// "pwke" is a subsequence and not a substring.
 

// Constraints:
// 0 <= s.length <= 5 * 104
// s consists of English letters, digits, symbols and spaces.

// Approach 1 - Brute Force Approach
// var lengthOfLongestSubstring = function(s) {
//     let maxLen = 0, currentLength, substringMap;
    
//     for(let i=0; i<s.length; i++)
//     {
//         currentLength = 0
//         substringMap = new Map();
//         substringMap.set(s[i],1)
        
//         if(currentLength<substringMap.get(s[i]))
//         {
//             currentLength = substringMap.get(s[i])
//         }
        
//         for(let j=i+1; j<s.length; j++)
//         {
//             if(substringMap.has(s[j]))
//             {
//                 break;
//             }
//             substringMap.set(s[j],1)
//             currentLength += 1 
//         }

//         if(maxLen<currentLength)
//         {
//             maxLen = currentLength
//         }
//     }
    
//     return maxLen
// };


// Approach 2
// var lengthOfLongestSubstring = function(s) 
// {
//     let k=0;
//     let maxLen = 0;
//     for(let i=0; i<s.length; i++)
//     {
//         for(let j=k; j<i; j++)
//         {
//             if(s[i]===s[j])
//             {
//                 k=j+1;
//                 break;
//             }
//         }
//         if(i+1 - k > maxLen)
//         {
//             maxLen = i+1 - k;
//         }
//     }
//     return maxLen;
// };


// Approach 3
var lengthOfLongestSubstring = function(s) 
{
    let letterMap = new Map()
    let left = 0, right = 0;
    let n = s.length;
    let len = 0;
    
    while (right < n) 
    {
        if (letterMap.get(s[right]) != undefined)
        {
            left = Math.max(letterMap.get(s[right]) + 1, left);
        }
        
        letterMap.set(s[right],right)

        len = Math.max(len, right - left + 1);
        right++;
    }
    
    return len;

    // Time complexity  - O(N)
    // Space complexity - O(N)
};

console.log(lengthOfLongestSubstring("bacabdbb"))