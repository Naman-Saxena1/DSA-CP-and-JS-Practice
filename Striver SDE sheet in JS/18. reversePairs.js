// Given an integer array nums, return the number of reverse pairs in the array.

// A reverse pair is a pair (i, j) 
// where 0 <= i < j < nums.length and nums[i] > 2 * nums[j].

// Example 1:
// Input: nums = [1,3,2,3,1]
// Output: 2

// Example 2:
// Input: nums = [2,4,3,5,1]
// Output: 3
 

// Constraints:
// 1 <= nums.length <= 5 * 104
// -231 <= nums[i] <= 231 - 1

// Approach 1 - Brute Force Approach
// Gives TLE
var reversePairs = function(nums) {
    let count = 0;
    for(let i=0; i<nums.length; i++)
    {
        for(let j=i+1; j<nums.length; j++)
        {
            if(nums[i]>2*nums[j])
            {
                count++
            }
        }
    }
    // Time complexity - O(n**2)
    // Space complexity - O(1)
    return count
};


// Approach 2
var reversePairs2 = function(nums) {
    let count = 0;
    function merge(left, right)
    {
        let arr = []
        
        let i=0, j=0;
        while(i<left.length)
        {
            if(left[i]<=2*right[j])
            {
                count += j
                i++
            }
            else
            {
                if(j!==right.length)
                {
                    j++
                }
                else
                {
                    count += right.length
                    i++
                }
            }
        }

        while(left.length && right.length)
        {
            if(left[0]<=right[0])
            {
                arr.push(left.shift())
            }
            else
            {
                arr.push(right.shift())
            }
        }
        return [...arr,...left,...right]
    }
    
    function mergeSort(inputArr)
    {
        let half = inputArr.length/2
        
        if(inputArr.length<2)
        {
            return inputArr
        }
        
        let left = inputArr.splice(0, half)
        return merge(mergeSort(left), mergeSort(inputArr))
    }
    mergeSort(nums)
    // Time complexity - O(nlogn) + O(n) + O(n)
    // O(n logn) - For merge sort
    // O(n) - For merge
    // O(n) - For counting operation
    // Space complexity - O(n)

    return count
};

console.log(reversePairs2([2,4,3,5,1]))

// Solution to took too much run time
// Other solutions to study in future:
// https://leetcode.com/problems/reverse-pairs/discuss/1202344/javascript-fenwick
// https://leetcode.com/problems/reverse-pairs/discuss/826256/Javascript-Solution-using-inversion(merge-sort)-logic.-90-faster
// https://leetcode.com/problems/reverse-pairs/discuss/324283/JavaScript-BIT-Solution-with-explanation-sources-links