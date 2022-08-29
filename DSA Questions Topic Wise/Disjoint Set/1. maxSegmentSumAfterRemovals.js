// You are given two 0-indexed integer arrays nums and removeQueries,
// both of length n. For the ith query, the element in nums at the index
// removeQueries[i] is removed, splitting nums into different segments.

// A segment is a contiguous sequence of positive integers in nums.
// A segment sum is the sum of every element in a segment.

// Return an integer array answer, of length n, where answer[i] is the maximum
// segment sum after applying the ith removal.

// Note: The same index will not be removed more than once.

// Example 1:
// Input: nums = [1,2,5,6,1], removeQueries = [0,3,2,4,1]
// Output: [14,7,2,2,0]
// Explanation: Using 0 to indicate a removed element, the answer is as follows:
// Query 1: Remove the 0th element, nums becomes [0,2,5,6,1] and the maximum segment sum is 14 for segment [2,5,6,1].
// Query 2: Remove the 3rd element, nums becomes [0,2,5,0,1] and the maximum segment sum is 7 for segment [2,5].
// Query 3: Remove the 2nd element, nums becomes [0,2,0,0,1] and the maximum segment sum is 2 for segment [2].
// Query 4: Remove the 4th element, nums becomes [0,2,0,0,0] and the maximum segment sum is 2 for segment [2].
// Query 5: Remove the 1st element, nums becomes [0,0,0,0,0] and the maximum segment sum is 0, since there are no segments.
// Finally, we return [14,7,2,2,0].

// Example 2:
// Input: nums = [3,2,11,1], removeQueries = [3,2,1,0]
// Output: [16,5,3,0]
// Explanation: Using 0 to indicate a removed element, the answer is as follows:
// Query 1: Remove the 3rd element, nums becomes [3,2,11,0] and the maximum segment sum is 16 for segment [3,2,11].
// Query 2: Remove the 2nd element, nums becomes [3,2,0,0] and the maximum segment sum is 5 for segment [3,2].
// Query 3: Remove the 1st element, nums becomes [3,0,0,0] and the maximum segment sum is 3 for segment [3].
// Query 4: Remove the 0th element, nums becomes [0,0,0,0] and the maximum segment sum is 0, since there are no segments.
// Finally, we return [16,5,3,0].

// Constraints:
// n == nums.length == removeQueries.length
// 1 <= n <= 105
// 1 <= nums[i] <= 109
// 0 <= removeQueries[i] < n
// All the values of removeQueries are unique.

// Approach 1 - Brute Force Approach
// Gives TLE for bigger testcases
// var maximumSegmentSum = function (nums, removeQueries) {
//   let n = nums.length,
//     answer = [];
//   let currentNums;

//   if (n == 1) {
//     return [0];
//   }

//   for (let i = 0; i < removeQueries.length; i++) {
//     nums[removeQueries[i]] = 0;
//     let currentSegmentSum = 0,
//       currentSegmentMaxSum = 0;

//     currentNums = [...nums];

//     currentNums.forEach((num) => {
//       if (num == 0) {
//         if (currentSegmentMaxSum < currentSegmentSum) {
//           currentSegmentMaxSum = currentSegmentSum;
//         }
//         currentSegmentSum = 0;
//       }
//       currentSegmentSum += num;
//     });

//     if (currentSegmentMaxSum < currentSegmentSum) {
//       currentSegmentMaxSum = currentSegmentSum;
//     }

//     answer.push(currentSegmentMaxSum);
//   }

//   return answer;
// };


// Approach 2 - Reverse Union Find 
class UnionFind {
    constructor() 
    {
        this.par = new Map()
        this.segmentSums = new Map()
        this.max = 0
    }
    
    addNumAndMergeSegments(i, num) 
    {
        this.par[i] = i
        this.segmentSums[i] = num
        this.max = Math.max(this.max, num)

        // If left is present, union newly inserted item to the left
        if(i-1 in this.par)
        {
            this.union(i, i-1)
        }

        // If right is present, union newly inserted item to the right
        if(i+1 in this.par)
        {
            this.union(i, i+1)
        }
    }
    
    // Returning parent
    find(x) 
    {
        // Recursion
        // If x is the parent of itself, return x
        // Else find parent of returned element
        return x == this.par[x] ? x : this.find(this.par[x])
    }
    
    // Union by getting indexes as input
    union(x, y) 
    {
        const xPar = this.find(x)
        const yPar = this.find(y)

        // If same parent, they are already in same group, no operation required
        if (xPar == yPar)
        {
            return
        }

        // Else xPar sum gets incremented by yPar sum
        // Parent of yPar = Parent of xPar
        // If our new Union segment sum > max, update max
        this.segmentSums[xPar] += this.segmentSums[yPar]
        this.par[yPar] = this.par[xPar]
        this.max = Math.max(this.max, this.segmentSums[xPar])
    }
}

const maximumSegmentSum = (nums, removeQueries) => {
    // nums          = [1,2,5,6,1]
    // removeQueries = [0,3,2,4,1]

    const N = nums.length      // 5

    // UnionFind { 
    //     par          : Map(0) {}, 
    //     segmentSums  : Map(0) {}, 
    //     max          : 0 
    // }
    const uf = new UnionFind()              

    // [undefined, undefined, undefined, undefined, undefined]
    const ans = new Array(N)                
    
    // Traversing from last to 0th query (backwards traversal)
    for(let i=N-1; i>=0; i--)
    {
        ans[i] = uf.max
        const numsIdx = removeQueries[i]
        uf.addNumAndMergeSegments(numsIdx, nums[numsIdx])
    }
    
    return ans
}


console.log(maximumSegmentSum([1,2,5,6,1],[0,3,2,4,1]))




// nums          = [1,2,5,6,1]
// removeQueries = [0,3,2,4,1]
//                  0 1 2 3 4

// ans           = [ , , , , ]

// Filling ans[4] (last) as 0 because after last query, all elements will be 0
// nums          = [0,0,0,0,0]      // nums after removeQueries[4]
// ans           = [ , , , ,0]

// Traversing removeQueries backwards

// Since above we already got answer for removeQueries index 4,
// We should reverse that operation to get nums state after removeQueries index 3
// removeQueries[4] = 1
// Make nums[1] = 2 as nums[1] = 0
// That means removal of 2 from index 1 made ans[4] = 0 
// So if we reverse it, we get an array nums which 
// was after removeQueries[3] 
// nums          = [0,2,0,0,0]      // nums after removeQueries[3]

// Using Union find on above nums, we find ans[3] = 2
// ans           = [ , , ,2,0]


// removeQueries[3] = 4
// Make nums[4] = 1 as nums[4] = 0
// That means removal of 5 from index 4 made ans[3] = 2 
// So if we reverse it, we get an array nums which 
// was after removeQueries[2] 
// nums          = [0,2,0,0,1]      // nums after removeQueries[2]
// ans           = [ , ,2,2,0]


// removeQueries[2] = 2
// Make nums[2] = 5 as nums[2] = 0
// That means removal of 5 from index 2 made ans[2] = 2 
// So if we reverse it, we get an array nums which 
// was after removeQueries[1] 
// nums          = [0,2,5,0,1]      // nums after removeQueries[1]
// ans           = [ ,7,2,2,0]


// removeQueries[1] = 3
// Make nums[3] = 6 as nums[2] = 0
// That means removal of 6 from index 3 made ans[1] = 7 
// So if we reverse it, we get an array nums which 
// was after removeQueries[0] 
// nums          = [0,2,5,6,1]      // nums after removeQueries[0]
// ans           = [14,7,2,2,0]

// removeQueries[0] = 0
// nums          = [1,2,5,6,1]

// Explaination
// https://leetcode.com/problems/maximum-segment-sum-after-removals/discuss/2461035/Python-Reverse-Union-Find-Clean-and-Concise