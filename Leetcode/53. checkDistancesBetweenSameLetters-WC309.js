// You are given a 0-indexed string s consisting of only lowercase English letters, 
// where each letter in s appears exactly twice. You are also given a 0-indexed integer 
// array distance of length 26.

// Each letter in the alphabet is numbered from 0 to 25 (i.e. 'a' -> 0, 'b' -> 1, 'c' -> 2, ... , 'z' -> 25).

// In a well-spaced string, the number of letters between the two occurrences 
// of the ith letter is distance[i]. If the ith letter does not appear in s, then distance[i] can be ignored.

// Return true if s is a well-spaced string, otherwise return false.

 

// Example 1:
// Input: s = "abaccb", distance = [1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// Output: true
// Explanation:
// - 'a' appears at indices 0 and 2 so it satisfies distance[0] = 1.
// - 'b' appears at indices 1 and 5 so it satisfies distance[1] = 3.
// - 'c' appears at indices 3 and 4 so it satisfies distance[2] = 0.
// Note that distance[3] = 5, but since 'd' does not appear in s, it can be ignored.
// Return true because s is a well-spaced string.

// Example 2:
// Input: s = "aa", distance = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// Output: false
// Explanation:
// - 'a' appears at indices 0 and 1 so there are zero letters between them.
// Because distance[0] = 1, s is not a well-spaced string.


// Constraints:
// 2 <= s.length <= 52
// s consists only of lowercase English letters.
// Each letter appears in s exactly twice.
// distance.length == 26
// 0 <= distance[i] <= 50


// Approach 1
var checkDistances = function(s, distance) {
    let letterIdxMap = new Map()
    
    for(let i=0; i<s.length; i++)
    {
        if(letterIdxMap.get(s[i]) == undefined)
        {
            letterIdxMap.set(s[i],i)
        }
        else
        {
            if(i-letterIdxMap.get(s[i])-1 != distance[s.charCodeAt(i)-97])
            {
                return false
            }
        }
    }
    
    return true
};


// Approach 2
// Only if question is modified for single occurences
// https://leetcode.com/problems/check-distances-between-same-letters/discuss/2527292/Track-First-vs.-Check-Second
// In this approach we first check if the next occurence at required distance is present or not
// 
// var checkDistances = function(s, distance) {

//     for(let i=0; i<s.length; ++i)
//     {
//         let d = distance[s[i].charCodeAt(0) - 97];
//  
//         if(i + d + 1 >= s.length || s[i + d + 1] != s[i])
//         {
//             return false;
//         }
// 
//         distance[s[i].charCodeAt(0) - 97] = -1;          // For the second occurence, so it compares with itself
//     }
// 
//     return true; 
// }


console.log(checkDistances("abaccb",[1,3,0,5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]))