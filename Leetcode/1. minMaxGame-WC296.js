// You are given a 0-indexed integer array nums whose length is a power of 2.

// Apply the following algorithm on nums:

// Let n be the length of nums. If n == 1, end the process. Otherwise, create a new 0-indexed integer array newNums of length n / 2.
// For every even index i where 0 <= i < n / 2, assign the value of newNums[i] as min(nums[2 * i], nums[2 * i + 1]).
// For every odd index i where 0 <= i < n / 2, assign the value of newNums[i] as max(nums[2 * i], nums[2 * i + 1]).
// Replace the array nums with newNums.
// Repeat the entire process starting from step 1.
// Return the last number that remains in nums after applying the algorithm.

// Example 1:
// Input: nums = [1,3,5,2,4,8,2,2]
// Output: 1
// Explanation: The following arrays are the results of applying the algorithm repeatedly.
// First: nums = [1,5,4,2]
// Second: nums = [1,4]
// Third: nums = [1]
// 1 is the last remaining number, so we return 1.

// Example 2:
// Input: nums = [3]
// Output: 3
// Explanation: 3 is already the last remaining number, so we return 3.


// Approach 1 - Using Recursion
var minMaxGame = function(nums) {
    let n = nums.length
    if(n==1)
    {
        return nums[0];
    }
    let newNums = []
    
    for(let i = 0; i<n/2; i++)
    {
        if(i%2==0)
        {
            newNums[i] = nums[2*i]<nums[2*i+1]?nums[2*i]:nums[2*i+1]
        }
        else
        {
            newNums[i] = nums[2*i]<nums[2*i+1]?nums[2*i+1]:nums[2*i]
        }
    }
    
    if(newNums.length!==1)
    {
        return minMaxGame(newNums)
    }
    // Time complexity - O(n)
    // Space complexity - O(n)

    return newNums[0]
};


// Approach 2 - Using Iteration
var minMaxGame = function(nums) {
    let n = nums.length
    let newNums = [...nums]
    while(n>1)
    {
        let currentArray = [].fill(0,0,Math.floor(n/2))   
        let f = true;
        let j=0;
            
        for(let i=0;i<n;i+=2)
        {
            if(f)
            {        
                currentArray[j]= newNums[i]<newNums[i+1]?newNums[i]:newNums[i+1]
            }
            else
            {        
                currentArray[j]= newNums[i]<newNums[i+1]?newNums[i+1]:newNums[i]
            }
                f=!f;
                j++;
        }
        newNums=currentArray;
        n/=2;
    }
    // Time complexity - O(n)
    // Space complexity - O(n)
    
    return newNums[0]
};