// Given an array containing both positive and negative integers, 
// we have to find the length of the longest subarray with the 
// sum of all elements equal to zero.

// Approach 1 - Brute Force Approach
// TLE
// function maxLen(arr,n)
// {
//     let longestLength = 0;
//     let sum = 0
//    
//     for(let i=0; i<arr.length; i++)
//     {
//         for(let j=i+1; j<arr.length; j++)
//         {
//             sum = 0
//             for(let k=i; k<=j; k++)
//             {
//                 sum += arr[k]
//                 if(sum==0 && longestLength<k-i+1)
//                 {
//                     longestLength = k-i+1
//                 }
//             }
//         }
//     }
//     return longestLength
// }


// Approach 2
function maxLen(arr,n)
{
    let longestLength = 0;
    let sum = 0;
    let lastIndex;
    let sumIndexMap = new Map()
    
    for(let i=0; i<arr.length; i++)
    {
        sum += arr[i]

        if(sum==0)
        {
            longestLength = i+1
        }
        else
        {
            if(sumIndexMap.has(sum))
            {
                lastIndex = sumIndexMap.get(sum) 
                longestLength = longestLength<i-lastIndex? i-lastIndex : longestLength
            }
            else
            {
                sumIndexMap.set(sum,i)
            }
        }
    }
    
    return longestLength

    // Time Complexity  - O(N), as we are traversing the array only once
    // Space Complexity - O(N), in the worst case we would insert all array elements prefix sum into our map
}

console.log(maxLen([1, -1, 3, 2, -2, -8, 1, 7, 10, 23]))