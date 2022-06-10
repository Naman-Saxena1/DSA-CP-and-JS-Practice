// You are given an integer array nums and an integer k. 
// You may partition nums into one or more subsequences 
// such that each element in nums appears in exactly one of the subsequences.

// Return the minimum number of subsequences needed such that the difference 
// between the maximum and minimum values in each subsequence is at most k.

// A subsequence is a sequence that can be derived from another sequence 
// by deleting some or no elements without changing the order 
// of the remaining elements.

// Example 1:
// Input: nums = [3,6,1,2,5], k = 2
// Output: 2
// Explanation:
// We can partition nums into the two subsequences [3,1,2] and [6,5].
// The difference between the maximum and minimum value in the first subsequence is 3 - 1 = 2.
// The difference between the maximum and minimum value in the second subsequence is 6 - 5 = 1.
// Since two subsequences were created, we return 2. It can be shown that 2 is the minimum number of subsequences needed.

// Example 2:
// Input: nums = [1,2,3], k = 1
// Output: 2
// Explanation:
// We can partition nums into the two subsequences [1,2] and [3].
// The difference between the maximum and minimum value in the first subsequence is 2 - 1 = 1.
// The difference between the maximum and minimum value in the second subsequence is 3 - 3 = 0.
// Since two subsequences were created, we return 2. Note that another optimal solution is to partition nums into the two subsequences [1] and [2,3].

// Example 3:
// Input: nums = [2,2,4,5], k = 0
// Output: 3
// Explanation:
// We can partition nums into the three subsequences [2,2], [4], and [5].
// The difference between the maximum and minimum value in the first subsequences is 2 - 2 = 0.
// The difference between the maximum and minimum value in the second subsequences is 4 - 4 = 0.
// The difference between the maximum and minimum value in the third subsequences is 5 - 5 = 0.
// Since three subsequences were created, we return 3. It can be shown that 3 is the minimum number of subsequences needed.


// Constraints:

// 1 <= nums.length <= 105
// 0 <= nums[i] <= 105
// 0 <= k <= 105


// Approach 1 - Basic version - Creating all partition arrays and then returning count
var partitionArray = function(nums, k) {
    nums.sort((a,b)=>a-b)
    if(nums[nums.length-1]-nums[0]<=k)
    {
        return 1
    }
    else
    {
        let allSubsequences = [[nums[0]]]
        if(nums[1]!==undefined)
        {
            for(let i=1, j=0; i<nums.length; i++)
            {
                if(nums[i]-allSubsequences[j][0]<=k)
                {
                    allSubsequences[j].push(nums[i])
                }
                else
                {
                    allSubsequences[j+1] = [nums[i]]
                    j++
                }
            }
        }
        // Time complexity - O(n^2logn)
        // Sorting - O(nlogn)
        // Traversing - O(n)
        // Space complexity - O(n)

        return allSubsequences.length
    }
};

// Approach 2 - Much Optimal - Counting while iterating
var partitionArray = function(nums, k) {
    nums.sort((a,b)=>a-b)
    if(nums[nums.length-1]-nums[0]<=k)
    {
        return 1
    }
    else
    {
        let count = 1
        let currentLowest = nums[0]
        if(nums[1]!==undefined)
        {
            for(let i=1; i<nums.length; i++)
            {
                if(nums[i]-currentLowest<=k)
                {
                    continue;
                }
                count += 1
                currentLowest = nums[i]
            }
        }
        // Time complexity - O(n^2logn)
        // Sorting - O(nlogn)
        // Traversing - O(n)
        // Space complexity - O(1)

        return count
    }
};