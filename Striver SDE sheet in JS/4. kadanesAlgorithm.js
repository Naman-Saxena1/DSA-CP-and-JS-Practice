// Maximum Subarray Sum in an Array
// Given an integer array arr, 
// find the contiguous subarray (containing at least one number) which
// has the largest sum and return its sum and print the subarray.

// Example 1:

// Input: arr = [-2,1,-3,4,-1,2,1,-5,4] 
// Output: 6 
// Explanation: [4,-1,2,1] has the largest sum = 6. 

// Examples 2: 

// Input: arr = [1] 
// Output: 1 
// Explanation: Array has only one element and which is giving positive sum of 1.


// Approch 1 -  Brute Force Approach
const maxSubArrayBruteForce = (nums) => {

    let largestSumSubArray = []
    let largestSum = 0

    for(let i=0; i<nums.length; i++)
    {
        for(let j=i; j<nums.length; j++)
        {
            let subArray = [], subArraySum = 0

            for(let k=i; k<=j; k++)
            {
                subArraySum += nums[k]
                subArray.push(nums[k])
            }

            if(subArraySum>largestSum)
            {
                largestSum = subArraySum
                largestSumSubArray = []
                largestSumSubArray.push(...subArray)
            }
        }
    }
    // return { largestSum, largestSumSubArray }
    // Time complexity - O(n^3)
    // Space complexity - O(2n) - n for largestSumSubArray + n for subArray

    return largestSum
}

console.log(maxSubArrayBruteForce([-2,1,-3,4,-1,2,1,-5,4]))





// Approch 2 - Better Approach
const maxSubArrayBetter = (nums) => {

    let largestSumSubArray = []
    let largestSum = 0

    for(let i=0; i<nums.length; i++)
    {
        let subArraySum = 0, subArray = []
        for(let j=i; j<nums.length; j++)
        {
            subArraySum += nums[j]
            subArray.push(nums[j])

            if(subArraySum>largestSum)
            {
                largestSum = subArraySum
                largestSumSubArray = []
                largestSumSubArray.push(...subArray)
            }
        }
    }
    return { largestSum, largestSumSubArray }
    // Time complexity - O(n^2)
    // Space complexity - O(2n) - n for largestSumSubArray + n for subArray

    // return largestSum
}

console.log(maxSubArrayBetter([-2,1,-3,4,-1,2,1,-5,4]))





// Approch 3 - Optimal Solution: Kadane’s Algorithm 
const maxSubArray = (nums) => {
    let sum = 0;
    let maximum = nums[0]
    
    nums.forEach(num=>{
        sum += num
        if(sum>maximum)
        {
            maximum = sum
        }
        if(sum<0)
        {
            sum = 0
        }
    })
    // Time complexity - O(n)
    // Space complexity - O(1)

    return maximum
}

console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))





// Approch 3 - Optimal Solution: Kadane’s Algorithm
// Plus subarray printing 
const maxSubArrayAndAlsoPrintIt = (nums) => {
    let sum = 0;
    let maximum = nums[0]
    let subArrayEndIndex = 0
    
    for(let i=0; i<nums.length; i++)
    {
        sum += nums[i]
        if(sum>maximum)
        {
            maximum = sum
            subArrayEndIndex = i
        }
        if(sum<0)
        {
            sum = 0
        }
    }
    let subArrayStartIndex = subArrayEndIndex
    let maximumValueCopy = maximum

    while(subArrayStartIndex>=0)
    {
        maximumValueCopy -= nums[subArrayStartIndex]
        if(maximumValueCopy==0)
        {
            break;
        }
        subArrayStartIndex--
    }

    let subArray = []
    for(subArrayStartIndex; subArrayStartIndex<=subArrayEndIndex; subArrayStartIndex++)
    {
        subArray.push(nums[subArrayStartIndex])
    }
    console.log(subArray)
    
    return maximum
}

console.log(maxSubArrayAndAlsoPrintIt([-2,1,-3,4,-1,2,1,-5,4]))