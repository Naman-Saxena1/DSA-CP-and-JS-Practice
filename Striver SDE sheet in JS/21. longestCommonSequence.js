// Given an unsorted array of integers nums, 
// return the length of the longest consecutive elements sequence.

// You must write an algorithm that runs in O(n) time.

 

// Example 1:
// Input: nums = [100,4,200,1,3,2]
// Output: 4
// Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. 
// Therefore its length is 4.

// Example 2:
// Input: nums = [0,3,7,2,5,8,4,6,0,1]
// Output: 9
 

// Constraints:
// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109

// Approach 1
// var longestConsecutive = function(nums) {
//     let left, right, longestLength = 1, sequenceArr = []
//     nums = Array.from(new Set(nums))
    
//     if(nums.length<2){ return nums.length }
    
//     for(let i=0; i<nums.length; i++)
//     {
//         if(sequenceArr[nums[i]]==undefined)
//         {
//             sequenceArr[nums[i]] = [ 
//                 sequenceArr[nums[i]-1]==undefined? 1 :  sequenceArr[nums[i]-1][0] + 1,
//                 sequenceArr[nums[i]+1]==undefined? 1 :  sequenceArr[nums[i]+1][1] + 1,
//             ]
            
//             left  = sequenceArr[nums[i]][0]
//             right = sequenceArr[nums[i]][1]
//             if(longestLength < left + right - 1)
//             {
//                 longestLength = left + right - 1
//             }
//             chainLeftMostIndex  = nums[i] - (left-1)
//             chainRightMostIndex = nums[i] + (right-1)

//             if(chainLeftMostIndex!=nums[i])
//             {
//                 sequenceArr[chainLeftMostIndex][1] = left + right - 1
//             }
//             if(chainRightMostIndex!=nums[i])
//             {
//                 sequenceArr[chainRightMostIndex][0] = left + right - 1
//             }
//         }
//     }
    
//     return longestLength
// };

// Approach 2
var longestConsecutive = function(nums) {
    var set = new Set(nums)
    var max = 0;
    
    for(var n of set)
    {
        if(!set.has(n-1))
        {
            let y = n+1
            while(set.has(y))
            {
                set.delete(y)
                y++
            }
            max = Math.max(max,y-n)
        }
    }
    return max

    // Time complexity  - O(3n)
    // O(n) -> To push elements in the Set
    // O(n) -> To find smallest number
    // O(n) -> To iterate from smallest to largest and get max
    // Space complexity - O(n)
};

console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1,11,12,20,13,14,15,16,17,18,19,20,21,22,23]))