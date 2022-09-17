// You are given an integer array nums and an integer k.

// Find the longest subsequence of nums that meets the following requirements:

// The subsequence is strictly increasing and
// The difference between adjacent elements in the subsequence is at most k.
// Return the length of the longest subsequence that meets the requirements.

// A subsequence is an array that can be derived from another array by 
// deleting some or no elements without changing the order of the remaining 
// elements.

 

// Example 1:
// Input: nums = [4,2,1,4,3,4,5,8,15], k = 3
// Output: 5
// Explanation:
// The longest subsequence that meets the requirements is [1,3,4,5,8].
// The subsequence has a length of 5, so we return 5.
// Note that the subsequence [1,3,4,5,8,15] does not meet the requirements because 15 - 8 = 7 is larger than 3.

// Example 2:
// Input: nums = [7,4,5,1,8,12,4,7], k = 5
// Output: 4
// Explanation:
// The longest subsequence that meets the requirements is [4,5,8,12].
// The subsequence has a length of 4, so we return 4.

// Example 3:
// Input: nums = [1,5], k = 1
// Output: 1
// Explanation:
// The longest subsequence that meets the requirements is [1].
// The subsequence has a length of 1, so we return 1.


// Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i], k <= 105


// Approach 1 - Using Segment Tree
class SegmentTree
{
    constructor(n)
    {
        this.size = n;
        this.segTree = new Uint32Array(n * 2);
    }

    update(index, val)
    {
        let n = this.size, idx = index + n;
        this.segTree[idx] = Math.max(this.segTree[idx], val);
        idx >>= 1;
    
        while(idx > 0)
        {
            this.segTree[idx] = Math.max(this.segTree[idx * 2], this.segTree[idx * 2 + 1]);
            idx >>= 1;
        }
    }

    maxInRange(left, right)
    {
        let n = this.size, max = 0;
        let left_idx = left + n, right_idx = right + n;

        // left must be even, right must be odd
        // when left is odd or right is even, this indicates partial coverage. 
        // in other words, the parent node will be covering a range outside of the range we are looking for.
        // so, we need to take the partial sum and move the pointers so that it has full coverage.
        while (left_idx <= right_idx)
        {
            if(left_idx & 1)
            {
                max = Math.max(max, this.segTree[left_idx]);
                left_idx++;
            }

            if ((right_idx & 1) === 0)
            {
                max = Math.max(max, this.segTree[right_idx]);
                right_idx--;
            }
            
            left_idx >>= 1;
            right_idx >>= 1;
        }

        return max;
    }
}

var lengthOfLIS = function(nums, k) 
{
    let max = Math.max(...nums), segTree = new SegmentTree(max + 1), ans = 0;

    for(let num of nums)
    {
        const maxLength = segTree.maxInRange(Math.max(num - k, 0), num - 1) + 1;
        segTree.update(num, maxLength);
        ans = Math.max(ans, maxLength);
    }
    return ans;
};


console.log(lengthOfLIS([4,2,1,4,3,4,5,8,15],3))

// Further reading:
// https://leetcode.com/problems/longest-increasing-subsequence-ii/discuss/2560085/Python-Explanation-with-pictures-Segment-Tree
// https://codeforces.com/blog/entry/18051