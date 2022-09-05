// As the ruler of a kingdom, you have an army of wizards at your command.

// You are given a 0-indexed integer array strength, where strength[i] 
// denotes the strength of the ith wizard. 
// For a contiguous group of wizards (i.e. the wizards' strengths form a subarray of strength), 
// the total strength is defined as the product of the following two values:

// The strength of the weakest wizard in the group.
// The total of all the individual strengths of the wizards in the group.
// Return the sum of the total strengths of all contiguous groups of wizards. 
// Since the answer may be very large, return it modulo 109 + 7.

// A subarray is a contiguous non-empty sequence of elements within an array.

 

// Example 1:
// Input: strength = [1,3,1,2]
// Output: 44
// Explanation: The following are all the contiguous groups of wizards:
// - [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
// - [3] from [1,3,1,2] has a total strength of min([3]) * sum([3]) = 3 * 3 = 9
// - [1] from [1,3,1,2] has a total strength of min([1]) * sum([1]) = 1 * 1 = 1
// - [2] from [1,3,1,2] has a total strength of min([2]) * sum([2]) = 2 * 2 = 4
// - [1,3] from [1,3,1,2] has a total strength of min([1,3]) * sum([1,3]) = 1 * 4 = 4
// - [3,1] from [1,3,1,2] has a total strength of min([3,1]) * sum([3,1]) = 1 * 4 = 4
// - [1,2] from [1,3,1,2] has a total strength of min([1,2]) * sum([1,2]) = 1 * 3 = 3
// - [1,3,1] from [1,3,1,2] has a total strength of min([1,3,1]) * sum([1,3,1]) = 1 * 5 = 5
// - [3,1,2] from [1,3,1,2] has a total strength of min([3,1,2]) * sum([3,1,2]) = 1 * 6 = 6
// - [1,3,1,2] from [1,3,1,2] has a total strength of min([1,3,1,2]) * sum([1,3,1,2]) = 1 * 7 = 7
// The sum of all the total strengths is 1 + 9 + 1 + 4 + 4 + 4 + 3 + 5 + 6 + 7 = 44.

// Example 2:
// Input: strength = [5,4,6]
// Output: 213
// Explanation: The following are all the contiguous groups of wizards: 
// - [5] from [5,4,6] has a total strength of min([5]) * sum([5]) = 5 * 5 = 25
// - [4] from [5,4,6] has a total strength of min([4]) * sum([4]) = 4 * 4 = 16
// - [6] from [5,4,6] has a total strength of min([6]) * sum([6]) = 6 * 6 = 36
// - [5,4] from [5,4,6] has a total strength of min([5,4]) * sum([5,4]) = 4 * 9 = 36
// - [4,6] from [5,4,6] has a total strength of min([4,6]) * sum([4,6]) = 4 * 10 = 40
// - [5,4,6] from [5,4,6] has a total strength of min([5,4,6]) * sum([5,4,6]) = 4 * 15 = 60
// The sum of all the total strengths is 25 + 16 + 36 + 36 + 40 + 60 = 213.


// Constraints:
// 1 <= strength.length <= 105
// 1 <= strength[i] <= 109


// Approach 1 -  Brute Force Approach
// Gives TLE for Big Inputs
// var totalStrength = function(strength) {
//     let result = 0n, subArrMin, subArrSum;
    
//     for(let i=0; i<strength.length; i++)
//     {
//         subArrSum = 0n
//         subArrMin = BigInt(strength[i])
        
//         for(let j=i; j<strength.length; j++)
//         {
//             if(strength[j]<subArrMin)
//             {
//                 subArrMin = strength[j]
//             }
//             subArrSum += BigInt(strength[j])
//             result += BigInt(subArrMin) * BigInt(subArrSum)
//         }
//     }
//  
//     return (result%1000000007n)
//
//     // Time Complexity  - O(n**2)
//     // Space Complexity - O(1)
// };



// Approach 2
var totalStrength = function(strength) {


    const MOD = 10**9 + 7;                      // 1000000007
    const BIGMOD = BigInt(MOD);                 // 1000000007n
    let res = 0, prefixSum = 0, n = strength.length;
    let stack = [];
    let prefixSum_Of_PrefixSum = [0];

    // res = 0
    // prefixSum  = 0
    // n   = 4
    // stack = []
    // prefixSum_Of_PrefixSum = [0]

    // strength = [1,3,1,2]
    //             0 1 2 3
    
    // r = 0, 1, 2, 3, 4
    // a = 1, 3, 1, 2, 0
    for(let r=0; r<=n; r++) 
    {
        let a = r < n ? strength[r] : 0;
        prefixSum = (prefixSum + a) % MOD;
        prefixSum_Of_PrefixSum[r + 1] = (prefixSum + prefixSum_Of_PrefixSum[r]) % MOD;

        while(stack.length && strength[stack[stack.length-1]] > a) 
        {
            // Previous mins for each number is already present in our increasing Monotonic stack
            // And we just found next min, so we will calculate 
            // (Sum of all subarrays where min = strength[j]) * strength[j] 
            let j = stack.pop();
            let l = stack.length ? stack[stack.length-1] : -1;
            
            // This is just for easier code dry run
            let p = l+1;        //Index of previous min
            let i = j+1;        //Index of current min
            let n = r+1;        //Index of next min
            
            // Sum of Prefix Sums to the left side of Current Num  (Pref[p] + Pref[p+1] + Pref[p+2] + Pref[p+3] + _ _ _ + Pref[i-1])
            let sumOfLeftPrefixSumRange = l < 0 ? prefixSum_Of_PrefixSum[i-1] : prefixSum_Of_PrefixSum[i-1] - prefixSum_Of_PrefixSum[p-1];
            
            // Sum of Prefix Sums to the right side of Current Num (Pref[i] + Pref[i+1] + Pref[i+2] + Pref[i+3] + _ _ _ + Pref[n-1])
            let sumOfRightPrefixSumRange = prefixSum_Of_PrefixSum[n-1] - prefixSum_Of_PrefixSum[i-1];
            
            let before = j - l;     //Count of nos. between prev min and current Num (including current Num)
            let after  = r - j;     //Count of nos. between current Num and next min (including current Num)

            // Add result of all subarrays where min is Current Num (strength[j])
            res = 
            Number
            (
                (
                    BigInt(res) 
                    + ( BigInt(sumOfRightPrefixSumRange)*BigInt(before) - BigInt(sumOfLeftPrefixSumRange)*BigInt(after) ) 
                    % BIGMOD * BigInt(strength[j]) % BIGMOD
                ) % BIGMOD
            );
        }

        stack.push(r);
    }

    return (res + MOD) % MOD;
};


console.log(totalStrength([1,3,1,2]))

// Intuition
// Below video and read notes for detailed explaination
// https://www.youtube.com/watch?v=HYCMvFxWO7w