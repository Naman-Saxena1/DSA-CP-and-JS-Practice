// You are given a 0-indexed integer array nums. 
// You have to partition the array into one or more contiguous subarrays.

// We call a partition of the array valid if each of the obtained subarrays 
// satisfies one of the following conditions:

// The subarray consists of exactly 2 equal elements. For example, the subarray [2,2] is good.
// The subarray consists of exactly 3 equal elements. For example, the subarray [4,4,4] is good.
// The subarray consists of exactly 3 consecutive increasing elements, that is, 
// the difference between adjacent elements is 1. For example, 
// the subarray [3,4,5] is good, but the subarray [1,3,5] is not.
// Return true if the array has at least one valid partition. Otherwise, return false.

 

// Example 1:
// Input: nums = [4,4,4,5,6]
// Output: true
// Explanation: The array can be partitioned into the subarrays [4,4] and [4,5,6].
// This partition is valid, so we return true.

// Example 2:
// Input: nums = [1,1,1,2]
// Output: false
// Explanation: There is no valid partition for this array.


// Constraints:
// 2 <= nums.length <= 105
// 1 <= nums[i] <= 106

// Approach 1 - Self attempt
// var validPartition = function(nums) {
//     let n = nums.length, finalResult, dp = [];
    
//     function checkValidPartition(lastEndIndex)
//     {
//         let front = lastEndIndex+1
//         let result1=false, result2=false;
        
//         if(dp[front]==true){return true}
//         if(dp[front]==false){return false}
        
//         if(nums[front] == nums[front+1])
//         {
//             if(front+1 == n-1)
//             {
//                 return true
//             }

//             if(dp[front+1])
//             {
//                 return true
//             }
//             else
//             {
//                 if(front+3<n)
//                 {
//                     result1 = checkValidPartition(front+1)
//                 }
//             }

//             if(result1)
//             {
//                 return true
//             }
//         }
        
//         if(
//             nums[front] == nums[front+1] && nums[front+1] == nums[front+2]
//             || nums[front]+1 == nums[front+1] && nums[front+1]+1 == nums[front+2]
//         )
//         {
//             if(front+2 == n-1)
//             {
//                 return true
//             }

//             if(dp[front+2])
//             {
//                 return true
//             }
//             else
//             {
//                 if(front+4<n)
//                 {
//                     result2 = checkValidPartition(front+2)
//                 }
//             }
            
//             if(result2)
//             {
//                 return true
//             }
//         }
        
//         finalResult =  (result1||result2)?true:false
        
//         dp[front] = finalResult
//         return finalResult
//     }
    
//     let res =  checkValidPartition(-1)
//     return res
// };


// Approach 2 - Recursion with Memoization
// var validPartition = function(nums) {
//     let n = nums.length, memo = Array(n).fill(-1);
//     return dp(0);
  
//     // Memoize each dp(i), 
//     // where dp(i) = whether it is possible to have a valid partition 
//     // from index i to n
    
//     function dp(i) 
//     {
//         if (i === n) return true;
//         if (i === n - 1) return false;
//         if (memo[i] !== -1) return memo[i];
    
//         if (nums[i] === nums[i + 1] && dp(i + 2)) return memo[i] = true;
        
//         if (i < n - 2) 
//         {
//             if (!dp(i + 3)) return memo[i] = false;
//             let hasThreeEqual = nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2];
//             let hasThreeConsecutive = nums[i] + 1 === nums[i + 1] && nums[i + 1] + 1 === nums[i + 2];
//             if (hasThreeEqual || hasThreeConsecutive) return memo[i] = true;
//         }
//         return memo[i] = false;
//     }  
// };


// Approach 3 - DP
var validPartition = function(nums) 
{
    let n = nums.length, dp = Array(n + 1).fill(false);
    dp[n] = true;

    for (let i = n - 2; i >= 0; i--) 
    {
        if (nums[i] === nums[i + 1] && dp[i + 2]) dp[i] = true;
        else
        { 
            if (i < n - 2) 
            {
                if (!dp[i + 3]) continue;
                let hasThreeEqual = nums[i] === nums[i + 1] && nums[i + 1] === nums[i + 2];
                let hasThreeConsecutive = nums[i] + 1 === nums[i + 1] && nums[i + 1] + 1 === nums[i + 2];
                if (hasThreeEqual || hasThreeConsecutive) dp[i] = true;
            }
        }
    }
    return dp[0];
};

console.log(validPartition([1,1,1,1,2,3]))
// console.log(validPartition([4,4,4,5,6]))

// Approach 2 and 3
// https://leetcode.com/problems/check-if-there-is-a-valid-partition-for-the-array/discuss/2390463/Javascript-Two-Approaches-DP-and-Recursion-w-Memoization