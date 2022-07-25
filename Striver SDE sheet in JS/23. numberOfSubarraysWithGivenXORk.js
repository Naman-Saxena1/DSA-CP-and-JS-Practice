// Given an array of integers A and an integer B. 
// Find the total number of subarrays having bitwise 
// XOR of all elements equal to B.

// Example 1
// Input Format:  A = [4, 2, 2, 6, 4] , B = 6
// Result: 4
// Explanation: The subarrays having XOR of their elements 
// as 6 are  [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], [6]

// Example 2
// Input Format: A = [5, 6, 7, 8, 9], B = 5
// Result: 2
// Explanation:The subarrays having XOR of their elements 
// as 2 are [5] and [5, 6, 7, 8, 9]


// Approach 1
// Gives TLE
// function xorSubarraysCount(A, B)
// {
//     let count = 0
    
//     for(let i=0; i<A.length; i++)
//     {
//         let xor = A[i];
//         if(xor==B)
//         {
//             count++
//         }
//         for(let j=i+1; j<A.length; j++)
//         {
//             xor ^= A[j]
//             if(xor==B)
//             {
//                 count++
//             }
//         }
//     }
    
//     return count

//     // Time complexity  - O(n^2)
//     // Space complexity - O(1)
// }

// Approach 2
function xorSubarraysCount(A, B)
{
    let count = 0, prefixXOR = 0, y; 
    let prefixXORCountMap = new Map()
		
	for(let i=0; i<A.length; i++)
	{
        prefixXOR ^= A[i]
            
        if(prefixXOR==B)
        {
            count += 1
        }
            
        y = prefixXOR^B
                
        if(prefixXORCountMap.get(y)!=undefined)
        {
            count += prefixXORCountMap.get(y)
        }    
            
        if(prefixXORCountMap.get(prefixXOR)==undefined)
        {
            prefixXORCountMap.set(prefixXOR, 1)
        }
        else
        {
            prefixXORCountMap.set(prefixXOR, prefixXORCountMap.get(prefixXOR) + 1)
        }
	}
		
	return count

    // Time complexity  - O(n)
    // Space complexity - O(n logn)
}

console.log(xorSubarraysCount([4,2,2,6,4],6))