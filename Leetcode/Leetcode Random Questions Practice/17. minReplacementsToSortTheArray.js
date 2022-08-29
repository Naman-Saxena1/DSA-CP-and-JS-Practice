// You are given a 0-indexed integer array nums. 
// In one operation you can replace any element of the array with any two elements that sum to it.

// For example, consider nums = [5,6,7]. In one operation, we can replace nums[1] with 2 and 4 and convert nums to [5,2,4,7].
// Return the minimum number of operations to make an array that is sorted in non-decreasing order.

 

// Example 1:
// Input: nums = [3,9,3]
// Output: 2
// Explanation: Here are the steps to sort the array in non-decreasing order:
// - From [3,9,3], replace the 9 with 3 and 6 so the array becomes [3,3,6,3]
// - From [3,3,6,3], replace the 6 with 3 and 3 so the array becomes [3,3,3,3,3]
// There are 2 steps to sort the array in non-decreasing order. Therefore, we return 2.

// Example 2:
// Input: nums = [1,2,3,4,5]
// Output: 0
// Explanation: The array is already in non-decreasing order. Therefore, we return 0. 
 

// Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109


// Approach 1 - Brute Force Approach
// Wrong Answer because doing some logical error in code :/
// 
// Incrementally manual split doesn't work because we are already using max num2 during splitting,
// hence when we reach last split, num1 might not be largest,
// as in other possiblity we can level out all splitted nos. and increase num1 
// Having incorrect num1 (not largest), leads to incorrect calculations in further traversal
// Eg. [260, 346, 22] will not give most optimal result using this algo
// 
// var minimumReplacement = function(nums) {
//     let noOfOp = 0, lastNum;
    
//     for(let i=nums.length-2; i>=0; i--)
//     {
//         function numSplit(num1,num2)
//         {
//             if(num1>num2)
//             {
//                 noOfOp += 1
//                 return numSplit(num1-num2,num2)
//             }
//             else
//             {
//                 if(num1!==num2 && num2-num1!==1)
//                 {
//                     num1 = Math.floor((num1+num2)/2)
//                 }
//             }
//             return num1
//         }
        
//         if(i == nums.length-2)
//         {
//             lastNum = nums[i+1]
//         }
        
//         if(nums[i]>lastNum)
//         {
//             if(lastNum == 1)
//             {
//                 noOfOp += nums[i]-1
//             }
//             else
//             {
//                 lastNum = numSplit(nums[i],lastNum)
//             }
//         }
//         else
//         {
//             lastNum = nums[i]
//         }
//     }
    
//     return noOfOp
// };


// Approach 2
var minimumReplacement = function(nums) {
    const n = nums.length;
    let ans = 0;
    
    for(let i=n-2 ; i>=0 ; i--)
    {
        if(nums[i]>nums[i+1])
        {
            const temp = Math.ceil(nums[i]/nums[i+1]);
            ans += temp - 1;
            nums[i] = Math.floor(nums[i]/temp);
        }
    }
    return ans;
};


console.log(minimumReplacement([3,9,3]))

// https://leetcode.com/problems/minimum-replacements-to-sort-the-array/discuss/2388143/Python-Google-interview-problem-why-strategy-beats-implementation