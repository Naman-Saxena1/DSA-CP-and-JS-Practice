// Given a string s, partition the string into one or more substrings 
// such that the characters in each substring are unique. 
// That is, no letter appears in a single substring more than once.

// Return the minimum number of substrings in such a partition.

// Note that each character should belong to exactly one substring in a partition.


// Example 1:
// Input: s = "abacaba"
// Output: 4
// Explanation:
// Two possible partitions are ("a","ba","cab","a") and ("ab","a","ca","ba").
// It can be shown that 4 is the minimum number of substrings needed.

// Example 2:
// Input: s = "ssssss"
// Output: 6
// Explanation:
// The only valid partition is ("s","s","s","s","s","s").
 

// Constraints:
// 1 <= s.length <= 105
// s consists of only English lowercase letters.


// Approach 1
var partitionString = function(s) {
    let bitmask = 0, partitionsCount=0, charBitmask;
    
    for(let i=0; i<s.length; i++)
    {
        charBitmask = s[i].charCodeAt()-97
        if((bitmask >> charBitmask) & 1 == 1)
        {
            partitionsCount++
            bitmask = 1 << charBitmask
        }
        else
        {
            bitmask = bitmask | (1<<charBitmask)
        }
    }

    // Time Complexity  - O(N)
    // Space Complexity - O(1)
    
    return partitionsCount+1
};


console.log(partitionString("abacaba"))


// Alternate approach
// Track all letters pos (index+1) and index of last partition (index+1)
// If letters pos appears again 2nd times after partition, 
// increase partition count and update last partition index
// https://leetcode.com/problems/optimal-partition-of-string/discuss/2560159/Greedy