// You are given two integers n and maxValue, which are used to describe an ideal array.

// A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:

// Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
// Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
// Return the number of distinct ideal arrays of length n. 
// Since the answer may be very large, return it modulo 109 + 7.

 


// Example 1:
// Input: n = 2, maxValue = 5
// Output: 10
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
// - Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
// - Arrays starting with the value 3 (1 array): [3,3]
// - Arrays starting with the value 4 (1 array): [4,4]
// - Arrays starting with the value 5 (1 array): [5,5]
// There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.

// Example 2:
// Input: n = 5, maxValue = 3
// Output: 11
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (9 arrays): 
//    - With no other distinct values (1 array): [1,1,1,1,1] 
//    - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
//    - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
// - Arrays starting with the value 2 (1 array): [2,2,2,2,2]
// - Arrays starting with the value 3 (1 array): [3,3,3,3,3]
// There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.
 

// Constraints:
// 2 <= n <= 10**4
// 1 <= maxValue <= 10**4


// Approach 1 - Combinatorics
const M = 10 ** 9 + 7;
var nCr = function (n, r) {
    if (r > n) return 0;
    if (r > n / 2) {r = n - r}
    if (r === 0) return 1;

    var p = BigInt(1);
    var q = BigInt(1);
    var i;
    for (i = n; i > n - r; --i) 
    {
        p = p * BigInt(i);
    }

    for (i = 2; i <= r; ++i) 
    {
        q = q * BigInt(i);
    }
    return Number(p / q % BigInt(M));
};

/**
 * @param {number} n
 * @param {number} maxValue
 * @return {number}
 */
var idealArrays = function(n, maxValue) {
    var i, j, factor;

    // len = Maximum count of unique numbers we can have for an ideal array
    // Eg.
    // 1) maxValue = 5
    //    1 2 3 4 5
    //    Math.floor(Math.log2(maxValue)) + 1;
    //    Math.floor(Math.log2(5))        + 1;
    //    Math.floor(2.319))              + 1;
    //    2 + 1
    //    3            -> Which will be 1 2 4 
    // 1) maxValue = 4
    //    1 2 3 4 
    //    Math.floor(Math.log2(maxValue)) + 1;
    //    Math.floor(Math.log2(4))        + 1;
    //    Math.floor(2))                  + 1;
    //    2 + 1
    //    3            -> Which will be 1 2 4 
    var len = Math.floor(Math.log2(maxValue)) + 1;
    
    var strict_increase = new Array(len + 1).fill(0);

    strict_increase[1] = maxValue;

    var last = new Array(maxValue + 1).fill(1), 
        next = new Array(maxValue + 1).fill(0), 
        tmp;
    
    // Run loop from 2 to len
    // i -> Number of unique numbers used to create ideal array
    // j -> Current point
    for(i = 2; i <= len; ++i) 
    {
        next.fill(0);

        for (j = 1; j <= maxValue; ++j) 
        {
            factor = 2;
            while(j * factor <= maxValue) 
            {
                next[j * factor] = (next[j * factor] + last[j]) % M;
                ++factor;
            }
        }

        for(k = 1; k <= maxValue; ++k) 
        {
            strict_increase[i] = (strict_increase[i] + next[k]) % M;
        }
        
        // Swap last and next arrays
        tmp = last;
        last = next;
        next = tmp;
    }

    var sum = 0;

    for(i = 1; i <= len; ++i) 
    {
        sum = (sum + strict_increase[i] * nCr(n - 1, i - 1)) % M;
    }
    return sum;
};

console.log(idealArrays(5,4))

// Read hand written notes for detailed explaination