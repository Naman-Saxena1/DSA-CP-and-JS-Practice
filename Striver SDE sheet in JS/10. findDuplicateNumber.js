// Given an array of integers nums containing n + 1 integers 
// where each integer is in the range [1, n] inclusive.

// There is only one repeated number in nums, return this repeated number.
// You must solve the problem without modifying the array nums and 
// uses only constant extra space.

// Example 1:
// Input: nums = [1,3,4,2,2]
// Output: 2

// Example 2:
// Input: nums = [3,1,3,4,2]
// Output: 3
 

// Constraints:
// 1 <= n <= 105
// nums.length == n + 1
// 1 <= nums[i] <= n
// All the integers in nums appear only once except for precisely 
// one integer which appears two or more times.

// Follow up:
// How can we prove that at least one duplicate number must exist in nums?
// Can you solve the problem in linear runtime complexity?

// Approach 1 - Sort and then find repeating numbers
var findDuplicate = function(nums) {
    nums.sort((a,b)=>a-b)
    let result = 0;
    for(let i = 0; i<nums.length; i++)
    {
        if(nums[i]===nums[i+1])
        {
            result = nums[i]
            break;
        }
    }
    // Time complexity - O(nlogn) + O(n)
    // Space complexity - O(1)

    return result
};


// Approach 2 - Use another array to keep frequency count of numbers
// Result is the number whose frequency we have to increment more than 1

// Approach 3 - Linked List cycle method (Floyd's tortoise hare method)
var findDuplicate = function(nums) {
    let slow = nums[0]
    let fast = nums[0]
    
    do{
        slow = nums[slow]
        fast = nums[nums[fast]]
    } while (slow!=fast)
        
    fast = nums[0]
    while(slow!=fast)
    {
        slow = nums[slow]
        fast = nums[fast]
    }
    // Time complexity - O(n)
    // Space complexity - O(1)

    return slow
};