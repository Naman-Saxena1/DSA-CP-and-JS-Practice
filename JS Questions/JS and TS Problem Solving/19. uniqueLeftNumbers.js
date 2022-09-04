// Given an integer array nums, for each number return 
// no. of unique nos.to the left of that number that are 
// neither present to right nor equal to current number.

// Example 1
// Input : nums   = [1,2,3,4,5]
// Output: result = [0,1,2,3,4]

// Example 2
// Input : nums   = [1,2,1,3,1,4,5]
//                   0 1 2 3 4 5 6
// Output: result = [0,0,1,1,2,3,4]

function uniqueNumbersToTheLeft(nums)
{
    let result = [], indexMap = new Map(), leftSet = new Set();
    let tempArr, currentSum;

    // O(N)
    for(let i=0; i<nums.length; i++)
    {
        indexMap.set(nums[i],i);
    }


    for(let j=0; j<nums.length; j++)
    {
        currentSum = 0
        tempArr = Array.from(leftSet)

        // Iterate through all distinct nos. on left side
        // and check if they exist on current index or on right side
        // If not, consider them in count
        tempArr.forEach(num=>{
            if(indexMap.get(num)<j){
                currentSum++;
            }
        })
        result.push(currentSum)
        leftSet.add(nums[j])
    }

    return result
} 

console.log(uniqueNumbersToTheLeft([1,2,3,4,5]))
console.log(uniqueNumbersToTheLeft([1,2,1,3,1,4,5]))