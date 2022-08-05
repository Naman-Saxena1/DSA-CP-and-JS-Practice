// Given a string s, return the longest palindromic substring in s.
 

// Example 1:
// Input: s = "babad"
// Output: "bab"
// Explanation: "aba" is also a valid answer.

// Example 2:
// Input: s = "cbbd"
// Output: "bb"
 

// Constraints:
// 1 <= s.length <= 1000
// s consist of only digits and English letters.





// Approach 1 - Brute Force Approach
// Gives TLE
// var longestPalindrome = function(s) {
//     let longestLen = 0, longestSubStr = '', currentSubStr;
//     if(s.length == 1)
//     {
//         return s
//     }
        
    
//     for(let i=s.length-1; i>=0; i--)
//     {
//         for(let j=i; j>=0; j--)
//         {
//             currentSubStr = s.substring(i, j+1)
//             if(longestLen < currentSubStr.length)
//             {
//                 if(currentSubStr == currentSubStr.split('').reverse().join(''))
//                 {
//                     longestSubStr = currentSubStr
//                     longestLen = currentSubStr.length
//                 }
//             }
//         }
//     }
    
//     return longestSubStr
// };



// Approach 2
// Gives TLE
// var longestPalindrome = function(s) {
//     let j, k;
//     if(s.length == 1 || s == s.split('').reverse().join(''))
//     {
//         return s
//     }
        
    
//     for(let i=1; i<s.length-1; i++)
//     {
//         j = 0
//         k = s.length-i-1

//         for(let startIndex=j,endIndex=k; endIndex<s.length; startIndex++,endIndex++)
//         {
//             subStr = s.substring(startIndex, endIndex+1)
//             subStrReverse = s.substring(startIndex, endIndex+1)

//             if(subStr == subStrReverse.split('').reduce((reversed, character) => character + reversed, ''))
//             {
//                 return subStr
//             }
//         }
//     }
    
//     return s[0]
// };




// Approach 3 - Using dp matrix
// var longestPalindrome = function(s) {
//     let n = s.length , maxlength = 0, ans;
//     if(n == 1)
//     {
//         return s
//     }
    
//     let dp = []
    
//     for(let i=0; i<n; i++)
//     {
//         dp.push(Array(n).fill(0))
//     }
        
//     for(let diff = 0; diff<n; diff++) 
//     {
//         for(let i=0,j=i+diff; j<n; i++, j++)
//         {
//             if(i==j)
//             {
//                 dp[i][j]=1;
//             }
//             else
//             {  
//                 if(diff==1)
//                 {
//                     dp[i][j] = (s[i]==s[j])?2:0;
//                 }
//                 else 
//                 {
//                     if(s[i]==s[j] && dp[i+1][j-1])
//                     {
//                         dp[i][j] = dp[i+1][j-1]+2;
//                     }
//                 }
//             }
                
//             if(dp[i][j]) 
//             { 
//                 if(j-i+1>maxlength) 
//                 {
//                     maxlength = j+1-i;
//                     ans = s.substring(i,j+1); 
//                 } 
//             } 
//         } 
//     }
    
//     return ans;

//     // Time Complexity  - O(n**2)
//     // Space Complexity - O(n**2)
// };


// Approach 4 - Expand around center
// var longestPalindrome = function(s) {
//     let longest = '';
//     const findLongestPalindrome = (str, i, j) => 
//     {
//         while(i >= 0 && j < str.length && str[i] === str[j]) 
//         {
//             i -= 1;
//             j += 1;
//         }
        
//         return str.slice(i + 1, j);
//     }
    
//     for(let i = 0; i < s.length; i++) 
//     {    
//         const current1 = findLongestPalindrome(s, i, i);
//         const current2 = findLongestPalindrome(s, i, i + 1);
//         console.log("current1: ",current1)
//         console.log("current2: ",current2,"\n\n")

//         const longerPalindrome = 
//               current1.length > current2.length ? current1 : current2;
        
//         if (longerPalindrome.length > longest.length) 
//         {
//             longest = longerPalindrome;
//         } 
//     }

//     return longest;

//     // Time Complexity  - O(n**2)
//     // Space Complexity - O(1)
// };


// Approach 5 - Manacher's Algorithm
var longestPalindrome = function(s) {
    var newStr = "#" + s.split("").join("#") + "#";
    
    var dp = [], friendCenter = 0, friendRadius = 0, lpsCenter = 0, lpsRadius = 0;
    
    for (var i = 0; i < newStr.length; i++) 
    {
        // Checking if we can use precomputed palindrome to skip some expansion steps
        dp[i] = friendCenter + friendRadius > i 
            ? Math.min(dp[friendCenter * 2 - i], (friendCenter + friendRadius) - i) 
            : 1;

        // Expanding whenever after adding new letters from both side still make Palindrome
        while (
                i + dp[i] < newStr.length 
                && i - dp[i] >= 0 
                && newStr[i + dp[i]] == newStr[i - dp[i]]
        ) 
        {
            dp[i]++;
        }
        
        // Updating if we found new rightmost palindrome
        friendRadius = friendCenter + friendRadius < i + dp[i] ? 
                       (function () {friendCenter = i; return dp[i];})() 
                       : friendRadius;
        
        // Updating if we found new longest palindrome
        lpsRadius = lpsRadius < dp[i] ? 
                    (function () {lpsCenter = i; return dp[i];})() 
                    : lpsRadius;

    }

    // Returning output after taking absence of # in s into consideration
    return s.substring((lpsCenter - lpsRadius + 1) / 2, (lpsCenter + lpsRadius - 1) / 2);

    // Time Complexity  - O(n)
    // Space Complexity - O(n)
};

console.log(longestPalindrome("aabaa"))


// https://www.youtube.com/watch?v=kbUiR5YWUpQ