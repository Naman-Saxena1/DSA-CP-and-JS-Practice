// Given an integer array of size n, 
// find all elements that appear more than ⌊ n/3 ⌋ times.


// Example 1:
// Input: nums = [3,2,3]
// Output: [3]

// Example 2:
// Input: nums = [1]
// Output: [1]

// Example 3:
// Input: nums = [1,2]
// Output: [1,2]
 

// Constraints:
// 1 <= nums.length <= 5 * 104
// -109 <= nums[i] <= 109

// Approach 1 - Brute Force Approach
var majorityElement = function(nums) {
    let result = []
    let count = 0
    let currentNum;
    
    if(nums.length===1)
    {
        return [nums[0]]
    }
    
    nums.sort((a,b)=>a-b)
    
    for(let i=0; i<nums.length; i++)
    { 
        if(currentNum == undefined)
        {
            currentNum = nums[i]
        }
        
        if(currentNum == nums[i])
        {
            count += 1
        }
        else
        {
            if(count > Math.floor(nums.length/3))
            {
                result.push(currentNum)
            }
            currentNum = nums[i]
            count = 1
        }
        
        if(i==nums.length-1 && count > Math.floor(nums.length/3))
        {
            result.push(currentNum)
        }
    }
    // Time complexity - O(n logn) + O(n)
    // Space complexity - O(1)
    
    return result
};

// Approach 2 - Using Map or frequency array
// Initialize empty result array = []
// Iterate through input array
// Store count of each number in a Map
// If count for any number > n/3, push that number in result array
// return result array
// Time Complexity - O(n)
// Space Complexity - O(n)

// Approach 3 - Boyer-Moore Majority Voting Algorithm
var majorityElement = function(nums) {
    let num1 = -1, num2 = -1, count1 = 0, count2 = 0;
    let result = []

    for(let i = 0; i<nums.length; i++)
    {
        if (nums[i] == num1)
        {
            count1++;
        }
        else if (nums[i] == num2)
            {
                count2++;
            }
            else if (count1 == 0) 
                {
                    num1 = nums[i];
                    count1 = 1;
                } 
                else if (count2 == 0) 
                        {
                            num2 = nums[i];
                            count2 = 1;
                        } 
                        else 
                        {
                            count1--;
                            count2--;
                        }
    }

    count1 = count2 = 0;
    for (i = 0; i < nums.length; i++) 
    {
        if (nums[i] == num1)
        {
            count1++;
        }
        else 
        {
            if (nums[i] == num2)
            {
                count2++;
            }
        }
    }

    if (count1 > nums.length / 3)
    {
        result.push(num1);
    }
    if (count2 > nums.length / 3)
    {
        result.push(num2);
    }
    // Time complexity - O(n) + O(n) -> O(n)
    // Space complexity - O(1)

    return result;
};