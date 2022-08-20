// Given an integer array nums of unique elements, 
// return all possible subsets (the power set).

// The solution set must not contain duplicate subsets. 
// Return the solution in any order.

 

// Example 1:
// Input: nums = [1,2,3]
// Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

// Example 2:
// Input: nums = [0]
// Output: [[],[0]]


// Constraints:
// 1 <= nums.length <= 10
// -10 <= nums[i] <= 10
// All the numbers of nums are unique.

// Approach 1 - Iterating through 2**n permuntations of subsets
// var subsets = function(nums) {
//     let res = [];
//     let n = nums.length;
//     let N = 2 ** n;
    
//     for (let i = 0; i < N; i++) 
//     {
//         let currentSubsets = [];
        
//         for (let j = 0; j < n; j++) 
//         {
//             if (i & (1 << j)) 
//             {
//                 currentSubsets.push(nums[j]);
//             }
//         }
//         res.push(currentSubsets);
//     }
//     return res;
// };

// Approach 2 - Backtracking/DFS
var subsets = function(nums) {
    if (nums.length === 1)
    {
        return [[], [nums[0]]];
    }
    
    const output = [];
    const subset = [];
    
    nums.sort();
    
    const backtrack = (idx) => {        
        output.push([...subset]);
        
        for (let i = idx; i < nums.length; i++) 
        {
            if (i > 0 && nums[i] === nums[i-1]) continue;
            
            subset.push(nums[i]);
            backtrack(i + 1);
            subset.pop();
        }
    }
    
    backtrack(0);
    return output;
};

console.log(subsets([1,2,3]))