// You are given an integer array nums and an integer threshold.
// Find any subarray of nums of length k such that every element in the subarray is greater than threshold / k.
// Return the size of any such subarray. If there is no such subarray, return -1.
// A subarray is a contiguous non-empty sequence of elements within an array.

 


// Example 1:
// Input: nums = [1,3,4,3,1], threshold = 6
// Output: 3
// Explanation: The subarray [3,4,3] has a size of 3, and every element is greater than 6 / 3 = 2.
// Note that this is the only valid subarray.

// Example 2:
// Input: nums = [6,5,6,5,8], threshold = 7
// Output: 1
// Explanation: The subarray [8] has a size of 1, and 8 > 7 / 1 = 7. So 1 is returned.
// Note that the subarray [6,5] has a size of 2, and every element is greater than 7 / 2 = 3.5. 
// Similarly, the subarrays [6,5,6], [6,5,6,5], [6,5,6,5,8] also satisfy the given conditions.
// Therefore, 2, 3, 4, or 5 may also be returned.
 

// Constraints:
// 1 <= nums.length <= 105
// 1 <= nums[i], threshold <= 109



// Approach 1 - Brute Force Approach
// 38 / 68 test cases passed
// Gives TLE for big inputs
// var validSubarraySize = function(nums, threshold) {
//     let elementThreshold, isValidSubArr;
    
//     for(let i=0; i<nums.length; i++)
//     {
//         for(let j=i; j<nums.length; j++)
//         {
//             elementThreshold = threshold/(j-i+1)
//             isValidSubArr = true
            
//             for(let k=i; k<=j; k++)
//             {
//                 if(nums[k] <= elementThreshold)
//                 {
//                     isValidSubArr = false
//                 }
//             }
            
//             if(isValidSubArr === true)
//             {
//                 return j-i+1
//             }
//         }
//     }
    
//     return -1

//     // Time Complexity  - O(n**3)
//     // Space Complexity - O(1)
// };



// Approach 2 - Litte Optimised Approach
// 54 / 68 test cases passed
// Gives TLE for big inputs
// var validSubarraySize = function(nums, threshold) {
//     let elementThreshold, subArrMin;
    
//     for(let i=0; i<nums.length; i++)
//     {
//         subArrMin = nums[i]
//         for(let j=i; j<nums.length; j++)
//         {
//             if(nums[j]<subArrMin)
//             {
//                 subArrMin = nums[j]
//             }

//             elementThreshold = threshold/(j-i+1)
            
//             if(elementThreshold < subArrMin)
//             {
//                 return j-i+1
//             }
//         }
//     }
    
//     return -1

//     // Time Complexity  - O(n**2)
//     // Space Complexity - O(1)
// };



// Approach 3 - Using DS (Disjoint Set)
// class DisjointSet {
//     constructor() 
//     {
//         this.par = []
//         this.subArrLengthSums = []
//         this.rank = []
//     }
    
//     activateCurrentIndex(i) 
//     {
//         if(this.par[i] == undefined)
//         {
//             this.par[i] =  i
//             this.subArrLengthSums[i] = 1
//             this.rank[i] = 0

//             if(this.par[i-1] != undefined)
//             {
//                 this.union(i, i-1)
//             }

//             if(this.par[i+1] != undefined)
//             {
//                 this.union(i, i+1)
//             }
//         }

//         return this.subArrLengthSums[this.par[i]]
//     }
    
//     find(x) 
//     {
//         if(x == this.par[x])
//         {
//             return x
//         }
        
//         this.par[x] = this.find(this.par[x])
//         return this.par[x]
//     }
    
//     union(x, y) 
//     {
//         const xPar = this.find(x)
//         const yPar = this.find(y)

//         if(xPar == yPar)
//         {
//             return;
//         }

//         if(this.rank[xPar] < this.rank[yPar])
//         {
//             this.subArrLengthSums[yPar] = this.subArrLengthSums[xPar] + this.subArrLengthSums[yPar]
//             this.par[xPar] = this.par[yPar]
//         }
//         else
//         {
//             if(this.rank[xPar] === this.rank[yPar])
//             {
//                 this.rank[xPar] =  this.rank[xPar] + 1
//             }

//             this.subArrLengthSums[xPar] = this.subArrLengthSums[xPar] + this.subArrLengthSums[yPar]
//             this.par[yPar] = this.par[xPar]
//         }
//     }
// }

// var validSubarraySize = function(nums, threshold) {
    
//     let sortedNums = []
    
//     for(let j=0; j<nums.length; j++) 
//     {
//         sortedNums.push([nums[j],j]) 
//     }
    
//     sortedNums.sort((a,b)=> b[0]-a[0]) 
    
//     const ds = new DisjointSet() 
//     let last = 0;
    
//     for(let k=1; k<=nums.length; k++)
//     {
//         currentLenThreshold = threshold/k;
        
//         while(
//             last<nums.length 
//             && currentLenThreshold<sortedNums[last][0]
//         ) 
//         {
//             currentRes = ds.activateCurrentIndex(sortedNums[last][1]) 
//             if(currentRes>=k)
//             {
//                 return currentRes
//             }
//             ++last;
//         }
//     }
    
//     return -1
// };


// Approach 4 - Using Monotonic Stack
var validSubarraySize = function(nums, threshold) {
    
    let stack = [];
    
    for(let i=0; i<nums.length; i++)
    {
        let start = i;

        while(stack.length>0 && stack[stack.length-1][0]>nums[i])
        {
            let popped = stack.pop();
            let min = popped[0];
            let len = i-popped[1];

            if(min>threshold/len)
            {
                return len;
            }
            start = popped[1];
        }
        stack.push([nums[i],start]);
    }
    
    let end = nums.length-1;
    
    for(let i=0; i<stack.length; i++)
    {
        let min = stack[i][0];
        let len = end - stack[i][1] + 1;
        
        if(min>threshold/len)
        {
            return len;
        }
    }
    return -1;
};



console.log(validSubarraySize([4,6,5,6,5,6,3,8],15))