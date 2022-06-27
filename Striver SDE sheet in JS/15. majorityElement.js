// Given an array nums of size n, return the majority element.
// The majority element is the element that appears more than ⌊n / 2⌋ times. 
// You may assume that the majority element always exists in the array.

// Example 1:
// Input: nums = [3,2,3]
// Output: 3

// Example 2:
// Input: nums = [2,2,1,1,1,2,2]
// Output: 2

// Constraints:
// n == nums.length
// 1 <= n <= 5 * 104
// -109 <= nums[i] <= 109

// Follow-up: Could you solve the problem in linear time and in O(1) space?


// Approach 1
var majorityElement = function(nums) {
    let majorityCount = Math.ceil(nums.length/2)
    let currentCount = 0
    
    nums.sort((a,b)=>a-b)
    
    for(let i=0; i<nums.length; i++)
    {
        if(nums[i-1]===nums[i])
        {
            currentCount += 1
        }
        else
        {
            currentCount = 1
        }
        
        if(currentCount == majorityCount)
        {
            return nums[i]
        }
    }

    // Time complexity - O(nlogn) + O(n)
    // Space complexity - O(1) 
};





// Approach 2 - Using Map
var majorityElement = function(nums) {
    let numCountMap = new Map()

    for(let i=0; i<nums.length; i++)
    {
        if(numCountMap.get(nums[i]) == undefined)
        {
            numCountMap.set(nums[i],1)
        }
        else
        {
            numCountMap.set(nums[i],numCountMap.get(nums[i])+1)
        }
        
        if(numCountMap.get(nums[i]) == Math.ceil(nums.length/2))
        {
            return nums[i]
        }
    }

    // Time complexity - O(n)
    // Space complexity - O(n)
}





// Approach 3 - Boyer-Moore Majority Voting Algorithm
var majorityElement = function(nums) {
    let count = 0
    let candidate = 0

    nums.forEach(num=>{
        if(count == 0)
        {
            candidate = num
        }

        if(num == candidate)
        {
            count += 1
        }
        else
        {
            count -= 1
        }
    })
    // Time complexity - O(n)
    // Space complexity - O(1)

    return candidate
}


console.log(majorityElement([3,2,3]))