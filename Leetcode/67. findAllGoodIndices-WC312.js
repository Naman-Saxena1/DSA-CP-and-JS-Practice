// You are given a 0-indexed integer array nums of size n and a positive integer k.

// We call an index i in the range k <= i < n - k good if the following conditions are satisfied:

// The k elements that are just before the index i are in non-increasing order.
// The k elements that are just after the index i are in non-decreasing order.
// Return an array of all good indices sorted in increasing order.

 

// Example 1:
// Input: nums = [2,1,1,1,3,4,1], k = 2
// Output: [2,3]
// Explanation: There are two good indices in the array:
// - Index 2. The subarray [2,1] is in non-increasing order, and the subarray [1,3] is in non-decreasing order.
// - Index 3. The subarray [1,1] is in non-increasing order, and the subarray [3,4] is in non-decreasing order.
// Note that the index 4 is not good because [4,1] is not non-decreasing.

// Example 2:
// Input: nums = [2,1,1,2], k = 2
// Output: []
// Explanation: There are no good indices in this array.
 

// Constraints:
// n == nums.length
// 3 <= n <= 105
// 1 <= nums[i] <= 106
// 1 <= k <= n / 2


// Approach 1
// Gives TLE for large testcases
// var goodIndices = function(nums, k) {
//     let indexRange = [k,nums.length-k-1]
//     let noOfElements, leftFlag, rightFlag;
//     let prevIdxLeftFlag = false, prevIdxRightFlag = false;
//     let j, goodIndices = [];
    
//     for(let targetIdx=k; targetIdx<=indexRange[1]; targetIdx++)
//     {
//         noOfElements = k-1;
//         leftFlag = true;
//         rightFlag = true;
//         j = 2;
        
//         if(k==1)
//         {
//             goodIndices.push(targetIdx);
//             continue;
//         }
        
//         if(prevIdxLeftFlag&&prevIdxRightFlag)
//         {
//             if(
//                 (nums[targetIdx-2]>=nums[targetIdx-1])
//                 && (nums[targetIdx+k-1]<=nums[targetIdx+k])
//             )
//             {
//                 goodIndices.push(targetIdx);
//                 continue;
//             }
//         }
        
//         while(noOfElements)
//         {
//             if(nums[targetIdx-j]<nums[targetIdx-j+1])
//             {
//                leftFlag = false;
//             }
            
//             if(nums[targetIdx+j-1]>nums[targetIdx+j])
//             {
//                rightFlag = false;
//             }
            
//             if(!leftFlag&&!rightFlag)
//             {
//                break;
//             }
//             ++j;
//             --noOfElements;
//         }
         
//         if(leftFlag&&rightFlag)
//         {
//             goodIndices.push(targetIdx);
//         }
//         prevIdxLeftFlag = leftFlag;
//         prevIdxRightFlag = rightFlag;
//     }
    
//     return goodIndices;
// };



// Approach 2
var goodIndices = function(nums, k) {
    const N = nums.length;
    const nonIncreasing = Array(N).fill(1);
    
    for(let i=1; i<N; i++)
    {
        if(nums[i-1] >= nums[i])
        {
            nonIncreasing[i] = 1 + nonIncreasing[i-1];
        }
    }
    
    const nonDecreasing = Array(N).fill(1);

    for(let i=N-2; i>=0; i--)
    {
        if(nums[i] <= nums[i+1])
        {
            nonDecreasing[i] = 1 + nonDecreasing[i+1];
        }
    }

    const result = [];

    for(let i=k; i<N-k; i++)
    {
        if(nonIncreasing[i-1] >= k && nonDecreasing[i+1] >= k)
        {
            result.push(i);
        }
    }

    return result;
};

console.log(goodIndices([2,1,1,1,3,4,1],2))