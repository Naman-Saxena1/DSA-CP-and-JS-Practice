// You are given an array of integers nums, 
// there is a sliding window of size k which is moving from the 
// very left of the array to the very right. 
// You can only see the k numbers in the window. 
// Each time the sliding window moves right by one position.

// Return the max sliding window.

 

// Example 1:
// Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
// Output: [3,3,5,5,6,7]
// Explanation: 
// Window position                Max
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// Example 2:
// Input: nums = [1], k = 1
// Output: [1]
 

// Constraints:
// 1 <= nums.length <= 105
// -104 <= nums[i] <= 104
// 1 <= k <= nums.length


// Approach 1
var maxSlidingWindow = function(nums, k) {
    let maxSlidingWindow = [], left=0, right=Math.min(k-1,nums.length-1);
    let pq = new MaxPriorityQueue({
        compare: (a, b) => nums[b] - nums[a],
    });
    
    for(let i=left; i<=right; i++)
    {
        pq.enqueue(i)
    }
    
    maxSlidingWindow.push(nums[pq.front()])
    
    while(right+1<=nums.length-1)
    {
        ++left;
        ++right;
        pq.enqueue(right)
        
        while(pq.size() && (pq.front()<left))
        {
            pq.dequeue()
        }
        
        maxSlidingWindow.push(nums[pq.front()])
    }
    
    return maxSlidingWindow
};

console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7]))