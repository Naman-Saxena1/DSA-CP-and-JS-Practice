// Given an integer array nums, return the most frequent even element.

// If there is a tie, return the smallest one. If there is no such element, return -1.

 

// Example 1:
// Input: nums = [0,1,2,2,4,4,1]
// Output: 2
// Explanation:
// The even elements are 0, 2, and 4. Of these, 2 and 4 appear the most.
// We return the smallest one, which is 2.

// Example 2:
// Input: nums = [4,4,4,9,2,4]
// Output: 4
// Explanation: 4 is the even element appears the most.

// Example 3:
// Input: nums = [29,47,21,41,13,37,25,7]
// Output: -1
// Explanation: There is no even element.
 

// Constraints:
// 1 <= nums.length <= 2000
// 0 <= nums[i] <= 105


// Approach 1
// var mostFrequentEven = function(nums) {
//     let freqMap = new Map(), freqCount;
//     let resultNum, maxFreq = 0;
    
//     for(let i=0; i<nums.length; i++)
//     {
//        if(nums[i]%2==0)
//        {
//            freqCount = freqMap.get(nums[i])
//            if(freqCount==undefined)
//            {
//               freqMap.set(nums[i],1)
//            }
//            else
//            {
//                freqMap.set(nums[i],freqCount+1)
//            }
//        }
//     }
    
//     for(let j=nums.length-1; j>=0; j--)
//     {
//         if(nums[j]%2==0)
//         {
//             freqCount = freqMap.get(nums[j])
            
//             if(resultNum==undefined || maxFreq<freqCount || (maxFreq===freqCount && nums[j]<resultNum))
//             {
//                 resultNum = nums[j]
//                 maxFreq = freqCount
//             }
//         }
//     }
    
//     if(maxFreq == 0)
//     {
//         return -1
//     }

//     // Time Complexity  - O(N) + O(N) -> O(N)
//     // Space Complexity - O(N)
    
//     return resultNum
// };


// Approach 2 - Single loop
var mostFrequentEven = function(nums) {
    let freqMap = new Map(), freqCount;
    let resultNum, maxFreq = 0;
    
    for(let i=0; i<nums.length; i++)
    {
       if(nums[i]%2==0)
       {
            freqCount = freqMap.get(nums[i])
            if(freqCount==undefined)
            {
              freqMap.set(nums[i],1)
            }
            else
            {
               freqMap.set(nums[i],freqCount+1)
            }

            freqCount = freqMap.get(nums[i])
            
            if(resultNum==undefined || maxFreq<freqCount || (maxFreq===freqCount && nums[i]<resultNum))
            {
                resultNum = nums[i]
                maxFreq = freqCount
            }
       }
    }
    
    if(maxFreq == 0)
    {
        return -1
    }

    // Time Complexity  - O(N)
    // Space Complexity - O(N)
    
    return resultNum
};

console.log(mostFrequentEven([0,1,2,2,4,4,1]))