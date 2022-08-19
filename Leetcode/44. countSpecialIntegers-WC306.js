// We call a positive integer special if all of its digits are distinct.

// Given a positive integer n, 
// return the number of special integers that belong to the interval [1, n].

// Example 1:
// Input: n = 20
// Output: 19
// Explanation: All the integers from 1 to 20, except 11, are special. 
// Thus, there are 19 special integers.

// Example 2:
// Input: n = 5
// Output: 5
// Explanation: All the integers from 1 to 5 are special.

// Example 3:
// Input: n = 135
// Output: 110
// Explanation: There are 110 integers from 1 to 135 that are special.
// Some of the integers that are not special are: 22, 114, and 131.

// Constraints:
// 1 <= n <= 2 * 109


// Approach 1 - Digit DP

// index - Current position
// mask  - Current usage of existing numbers
// limit - Whether the current location has restrictions, 
//         true means there are restrictions, 
//         false means no restrictions
// prev  - Whether the previous position uses a number, 
//         true means used and the current position can start from 0, 
//         false means not used and the current position can start from 1

// function calc(dp, arr, index, mask, limit, prev)
// {
//     let res = 0;
    
//     // Whether the search has been completed
//     if(index === arr.length)
//     {
//         // Whether a number is used in the previous position, 
//         // if it is used, it means that the current position satisfies the condition; 
//         // if it is not used, it means that the current position does not meet the condition
//         res = prev ? 1 : 0;
//         return res;
//     }
    
//     // Determine whether the same situation has been calculated
//     if(!limit && prev && dp[index][mask] >= 0)
//     {
//         res = dp[index][mask];
//         return res;
//     }
    
//     // Skip current position
//     if(!prev)
//     {
//         res = calc(dp, arr, index+1, mask, false, false);
//     }

//     // Determine the range of numbers for the current location
//     let left = prev ? 0 : 1;
//     let right = limit ? parseInt(arr[index]) : 9;

//     for(let i=left; i<=right; i++)
//     {
//         // Determine whether the number has been used, 
//         // if not, set the current position to the number, 
//         // and continue to search for the next digit
//         if(((mask >> i) & 1) === 0)
//         {
//             // Update the next digit limit
//             let l = limit && (i === right);

//             // Update already used numbers
//             let m = mask | (1 << i);

//             // Grand total
//             res += calc(dp, arr, index+1, m, l ,true);
//         }
//     }
    
//     // Save results
//     if(!limit && prev)
//     {
//         dp[index][mask] = res;
//     }

//     return res;
// }

// var countSpecialNumbers = function(n) {
//     let finalResult = 0;
//     let str = n.toString();
//     let len = str.length;
//     let arr = str.split('');
    
//     // dp[i][j] Indicates the ith bit from left to right, 
//     // when all numbers are j, 
//     // the number of numbers that satisfy the condition
//     let dp = [];
//     for(let i=0; i<len; i++)
//     {
//         // 0-9 Numbers, a total of 2^10 options = 1024 options
//         dp[i] = new Array(1 << 10).fill(-1);
//     }

//     // Count of numbers without repeating digits

//     // dp    - [ [ -1, -1, -1, ... 1021 more items ], [ -1, -1, -1, ... 1021 more items ]]
//     // arr   - ['1','2']
//     // index - Current position -> 0
//     // mask  - Current usage of existing numbers
//     // limit - Whether the current location has restrictions, 
//     //         true means there are restrictions, 
//     //         false means no restrictions
//     // prev  - Whether the previous position uses a number, 
//     //         true means used and the current position can start from 0, 
//     //         false means not used and the current position can start from 1

//     //            calc(dp, arr, index, mask, limit,  prev);
//     finalResult = calc(dp, arr,     0,    0,  true, false);
//     return finalResult;    
// };


// Approach 2 - Permutations
var countSpecialNumbers = function(n) 
{
    const arr = []
    let count = 0
    let temp = n+1
    
    while(temp !== 0) 
    {
        arr.unshift(temp%10)
        temp = Math.floor(temp/10)
    }

    function permutation(n, right)
    {
        let nonRepeatingNums = 1
        
        for(let i = 0; i < right; i++) 
        {
            nonRepeatingNums*=n
            n--
        }
        
        return nonRepeatingNums
    }
    
    for(let i = 0; i < arr.length - 1; i++) 
    {
        count += 9*permutation(9,i)
    }
   
    const set = new Set()
    
    for(let i = 0; i < arr.length; i++) 
    {
        for(let j = i===0?1:0; j < arr[i]; j++) 
        {
            // Digit is already used
            if(set.has(j)) continue

            count += permutation(10-(i+1), arr.length - 1 - i)
        }
        
        if(set.has(arr[i])) break
        set.add(arr[i])
    }
    
    return count
};

console.log(countSpecialNumbers(323))