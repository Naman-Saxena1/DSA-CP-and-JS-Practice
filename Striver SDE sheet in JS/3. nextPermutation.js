// Given an array Arr[] of integers, 
// rearrange the numbers of the given array into the lexicographically 
// next greater permutation of numbers.

// If such an arrangement is not possible, 
// it must rearrange it as the lowest possible order 
// (i.e., sorted in ascending order).

// Input format: Arr[] = [1,3,2]

// Output: Arr[] = [2,1,3]

// Explanation: All permutations of [1,2,3] are 
// {[1,2,3] , [1,3,2], [2,1,3], [2,3,1] , [3,1,2] , [3,2,1]}. 

// So, the next permutation just after [1,3,2] is [2,1,3].

const nextPermutation = (nums) => {

    if(nums==null || nums.length<=1)
    {
        return;
    }

    let i = nums.length-2
    while(i>=0 && nums[i]>=nums[i+1])
    {
        i--
    }

    if(i>=0)
    {
        let j = nums.length-1
        while(nums[j] <= nums[i])
        {
            j--
        }
        let swapVar = nums[i]
        nums[i] = nums[j]
        nums[j] = swapVar
    }

    let m = i+1
    let n = nums.length-1

    while(m<n)
    {
        let swapVar = nums[m]
        nums[m] = nums[n]
        nums[n] = swapVar
        
        m++
        n--
    }
    // Time complexity = O(n) + O(n) + O(n) ≅ O(n)
    // Space complexity = O(1)

    return nums
}

console.log(nextPermutation([1,3,5,4,2,1]))