// Given an array nums of n integers, 
// return an array of all the unique quadruplets 
// [nums[a], nums[b], nums[c], nums[d]] such that:

// 0 <= a, b, c, d < n
// a, b, c, and d are distinct (in a sense of distinct indexes)
// nums[a] + nums[b] + nums[c] + nums[d] == target
// You may return the answer in any order.



// Example 1:
// Input: nums = [1,0,-1,0,-2,2], target = 0
// Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]

// Example 2:
// Input: nums = [2,2,2,2,2], target = 8
// Output: [[2,2,2,2]]
 

// Constraints:
// 1 <= nums.length <= 200
// -109 <= nums[i] <= 109
// -109 <= target <= 109


// Approach 1 - Brute Force Approach
var fourSum = function(nums, target) {
    let low, high, mid, currentSum;
    let quadArr = []
    
    nums.sort((a,b)=>a-b)
    
    for(let i=0; i<nums.length-3; i++)
    {
        for(let j=i+1; j<nums.length-2; j++)
        {
            for(let k=j+1; k<nums.length-1; k++)
            {
                low = k+1;
                high = nums.length-1;
                
                while(low<=high)
                {
                    mid = Math.floor((low+high)/2)
                    currentSum = nums[i]+nums[j]+nums[k]+nums[mid]
                    if(currentSum===target)
                    {
                        quadArr.push([nums[i],nums[j],nums[k],nums[mid]])
                        break;
                    }
                    else
                    {
                        if(currentSum<target)
                        {
                            low = mid+1
                        }
                        else
                        {
                            high = mid-1
                        }
                    }
                }
            }
        }
    }

    // Not working on Leetcode for some reason
    let uniqueArr = Array.from(new Set(quadArr.map(JSON.stringify)), JSON.parse);

    return uniqueArr

    // Time complexity  -> O(N log N + N³ logN)
    // Space complexity -> O(M * 4), where M is the number of quads
};


// Approach 2
var fourSum = function(nums, target) {
    let quadArr = []
    
    nums.sort((a,b)=>a-b)
    
    let targetFor3Nums, targetFor2Nums, front, back;
    
    for(let i=0; i<nums.length-3; i++)
    {
        targetFor3Nums = target - nums[i]
        
        for(let j=i+1; j<nums.length-2; j++)
        {
            targetFor2Nums = targetFor3Nums - nums[j]
            front = j+1
            back  = nums.length-1 
            
            while(front < back) 
            {
                let two_sum = nums[front] + nums[back];
                
                if(two_sum < targetFor2Nums) 
                {
                    front++
                }
                else if (two_sum > targetFor2Nums) 
                     {
                         back--;
                     }
                     else 
                     {
                        let quadruplet = [nums[i], nums[j], nums[front], nums[back]]
                        quadArr.push(quadruplet)
                        
                        while (front < back && nums[front] == quadruplet[2]) { ++front }
                    
                        while (front < back && nums[back]  == quadruplet[3]) { --back }
                    }
            }
            
            while(j+1<nums.length-2 && nums[j]===nums[j+1]) { j++ }
        }
        
        while(i+1<nums.length-3 && nums[i]===nums[i+1]) { i++ }
    }
    
    return quadArr

    // Time complexity  -> O(N³)
    // Space complexity -> O(1)
};

console.log(fourSum([2,2,2,2,2],8))


// https://leetcode.com/problems/4sum/discuss/8549/My-16ms-c%2B%2B-code
// https://leetcode.com/problems/4sum/discuss/8609/My-solution-generalized-for-kSums-in-JAVA