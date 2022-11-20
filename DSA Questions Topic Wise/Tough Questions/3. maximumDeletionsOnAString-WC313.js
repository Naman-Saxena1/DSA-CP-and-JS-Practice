// You are given a string s consisting of only lowercase English letters. In one operation, you can:

// Delete the entire string s, or
// Delete the first i letters of s if the first i letters of s are equal to the following i letters in s, for any i in the range 1 <= i <= s.length / 2.
// For example, if s = "ababc", then in one operation, 
// you could delete the first two letters of s to get "abc", 
// since the first two letters of s and the following two letters of s are both equal to "ab".

// Return the maximum number of operations needed to delete all of s.

// Example 1:
// Input: s = "abcabcdabc"
// Output: 2
// Explanation:
// - Delete the first 3 letters ("abc") since the next 3 letters are equal. Now, s = "abcdabc".
// - Delete all the letters.
// We used 2 operations so return 2. It can be proven that 2 is the maximum number of operations needed.
// Note that in the second operation we cannot delete "abc" again because the next occurrence of "abc" does not happen in the next 3 letters.

// Example 2:
// Input: s = "aaabaab"
// Output: 4
// Explanation:
// - Delete the first letter ("a") since the next letter is equal. Now, s = "aabaab".
// - Delete the first 3 letters ("aab") since the next 3 letters are equal. Now, s = "aab".
// - Delete the first letter ("a") since the next letter is equal. Now, s = "ab".
// - Delete all the letters.
// We used 4 operations so return 4. It can be proven that 4 is the maximum number of operations needed.

// Example 3:
// Input: s = "aaaaa"
// Output: 5
// Explanation: In each operation, we can delete the first letter of s.


// Constraints:
// 1 <= s.length <= 4000
// s consists only of lowercase English letters.


// "aaabaab"
//  "aabaab"    // 1st operation
//     "aab"    // 2nd operation
//      "ab"    // 3rd operation
//        ""    // 4th operation


// Approach 1 - Top-Down (Pruning)
// Gives TLE 
// var deleteString = function(s, i=0) {
//     let dp = [];
    
//     if(dp[i] == undefined)
//     {
//         dp[i] = 1;
    
//         for(let len = 1; dp[i] <= s.length-i-len; ++len)
//         {
//             let s1 = s.substring(i, i+len), s2 = s.substring(i+len,i+len+len)

//             if (s1 == s2)
//             {
//                 dp[i] = Math.max(dp[i], 1 + deleteString(s, i + len));
//             }
//         }
//     }
    
//     return dp[i];
// };


// Approach 2 - Bottom-Up (Longest Prefix Suffix - KMP)
// Revisit - https://leetcode.com/problems/maximum-deletions-on-a-string/solutions/2648927/Top-Down-(Pruning)-vs.-Bottom-Up-(LPS)
var deleteString = function(s) { 
    let dp = [], lps = [];

    for(let k=s.length-1; k>=0; --k)
    {
        dp[k] = 1;

        for(let i=1, j=0; dp[k]<=s.length-i-k+1; ++i)
        {
            while(j && s[i + k] != s[j + k])
            {
                j = Math.max(0, lps[j] - 1);
            }

            j += s[i + k] == s[j + k];
            
            lps[i] = j;
            
            // If i is odd number
            if(i % 2)
            {
                let len = (i + 1) / 2;

                if (lps[i] == len)
                {
                    dp[k] = Math.max(dp[k], 1 + dp[k + len]);   
                }   
            }
        }
    }
    return dp[0];
}

console.log(deleteString("aaabaab"))