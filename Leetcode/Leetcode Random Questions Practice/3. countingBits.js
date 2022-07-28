// Given an integer n, return an array ans of length 
// n + 1 such that for each i (0 <= i <= n), 
// ans[i] is the number of 1's in the binary representation of i.


// Example 1:
// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10

// Example 2:
// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101


// Constraints:

// 0 <= n <= 105
 

// Follow up:
// It is very easy to come up with a solution with a runtime of O(n log n). 
// Can you do it in linear time O(n) and possibly in a single pass?
// Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?

// Approach 1 - Using Kernighan's Algorithm
// var countBits = function(n) {
//     const counts = new Array(n + 1);

//     function countSetBits(n)
//     {
//         let count = 0

//         while(n)
//         {
//             let rsb = n & -n;
//             n -= rsb
//             count++
//         }

//         return count
//     }

//     for (let i = 0; i <= n; i++) 
//     {
//         counts[i] = countSetBits(i)
//     }

//     return counts;

//     // Time Complexity - O(n logn)
//     // Space Complexity - O(n)
// };


// Approach 2
var countBits = function(n) {
    const counts = new Uint8Array(n + 1).fill(0);

    for (let i = 0; i <= n; i++) 
    {
        if(i%2==0)
        {
            counts[i] = counts[Math.floor(i/2)]
        }
        else
        {
            counts[i] = counts[Math.floor(i/2)] + 1
        }
    }

    return counts;

    // Time Complexity - O(n)
    // Space Complexity - O(n)
};

console.log(countBits(11))