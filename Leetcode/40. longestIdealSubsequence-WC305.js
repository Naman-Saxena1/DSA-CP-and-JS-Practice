// You are given a string s consisting of lowercase letters and an integer k. 
// We call a string t ideal if the following conditions are satisfied:

// t is a subsequence of the string s.
// The absolute difference in the alphabet order of every two adjacent letters 
// in t is less than or equal to k.
// Return the length of the longest ideal string.

// A subsequence is a string that can be derived from another string 
// by deleting some or no characters without changing the order of the 
// remaining characters.

// Note that the alphabet order is not cyclic. 
// For example, the absolute difference in the alphabet order of 'a' and 'z' 
// is 25, not 1.


// Example 1:
// Input: s = "acfgbd", k = 2
// Output: 4
// Explanation: The longest ideal string is "acbd". 
// The length of this string is 4, so 4 is returned.
// Note that "acfgbd" is not ideal because 'c' and 'f' have a 
// difference of 3 in alphabet order.

// Example 2:
// Input: s = "abcd", k = 3
// Output: 4
// Explanation: The longest ideal string is "abcd". 
// The length of this string is 4, so 4 is returned.


// Constraints:
// 1 <= s.length <= 105
// 0 <= k <= 25
// s consists of lowercase English letters.


// Approach 1 - Self attempt - Gives TLE
// var longestIdealString = function(s, k) {
//     if(s.length==1){return 1}
//     let maxLength = 1, dp = []

//     for(let i=0; i<s.length; i++)
//     {
//         if(i==0)
//         {
//             dp[i] = 1
//             continue;
//         }
        
//         let count = 1
//         for(let j=0; j<i; j++)
//         {
//             if( Math.abs(s.charCodeAt(j)-s.charCodeAt(i))<=k && count<dp[j]+1)
//             {
//                 count = dp[j] + 1
//             }
//         }
//         maxLength = maxLength<count?count:maxLength
//         dp[i] = count
//     }
//     return maxLength
// };


// Approach 2 - Better approach
// Only check dp of 2 elements before, current element and 2 elements after 
var longestIdealString = function(s, k) {
    let res = 0, n = s.length, dp = Array(150).fill(0);

    for(let ci = 0; ci<n; ++ci) 
    {
        let i = s.charCodeAt(ci);
        
        for(let j=i-k; j<=i+k; ++j)
        {
            dp[i] = Math.max(dp[i], dp[j]);
        }     
        dp[i] += 1
        res = Math.max(res, dp[i]);
    }
    return res;
};

console.log(longestIdealString("acfgbd",2))