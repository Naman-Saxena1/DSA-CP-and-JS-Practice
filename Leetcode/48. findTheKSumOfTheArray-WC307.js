// You are given an integer array nums and a positive integer k. 
// You can choose any subsequence of the array and sum all of its elements together.

// We define the K-Sum of the array as the kth largest subsequence sum that can be obtained (not necessarily distinct).
// Return the K-Sum of the array.

// A subsequence is an array that can be derived from another array by 
// deleting some or no elements without changing the order of the remaining elements.
// Note that the empty subsequence is considered to have a sum of 0.

 

// Example 1:
// Input: nums = [2,4,-2], k = 5
// Output: 2
// Explanation: All the possible subsequence sums that we can obtain are the following sorted in decreasing order:
// - 6, 4, 4, 2, 2, 0, 0, -2.
// The 5-Sum of the array is 2.

// Example 2:
// Input: nums = [1,-2,3,4,-10,12], k = 16
// Output: 10
// Explanation: The 16-Sum of the array is 10.


// Constraints:
// n == nums.length
// 1 <= n <= 105
// -109 <= nums[i] <= 109
// 1 <= k <= min(2000, 2n)


// Approach 1 - Max Priority Queue
var kSum = function(nums, k) {
    let pq = new MaxPriorityQueue(), sum = 0, n = nums.length;
    
    nums.sort((a,b) => Math.abs(a) - Math.abs(b));
    
    for(let i = 0 ; i < n ; i++)
    {
        if(nums[i] > 0) sum += nums[i];
    }
    
    
    pq.enqueue(0, sum);
    let q;
    
    while(k--)
    {
        q = pq.dequeue();
        
        if(q.element < n)
        {
            pq.enqueue(q.element+1, q.priority - Math.abs(nums[q.element]));
            
            if(q.element>0)
            {
                pq.enqueue(q.element+1, q.priority + Math.abs(nums[q.element-1]) - Math.abs(nums[q.element]));
            }
        }
    }
    return q.priority;

    // Time complexity  - O(nlogn + klogk)
    // Space complexity - O(n + k)
};

console.log(kSum([2,4,-2]))


// Read notes and re-practice this question
// https://leetcode.com/problems/find-the-k-sum-of-an-array/discuss/2465961/Decreasing-Subsequence-Sums
// https://leetcode.com/problems/find-the-k-sum-of-an-array/discuss/2458006/Javascript-or-explanation-or-PriorityQueue-or-O(NlogN-%2B-klogk)
// https://leetcode.com/problems/find-the-k-sum-of-an-array/discuss/2456675/Python3-priority-queue
// https://leetcode.com/problems/find-the-k-sum-of-an-array/discuss/2457741/Simple-solution-with-a-detailed-proof-or-Heap-or-NlogN-%2B-klogK