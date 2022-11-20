// Given two positive integers a and b, return the number of common factors of a and b.
// An integer x is a common factor of a and b if x divides both a and b.

// Example 1:
// Input: a = 12, b = 6
// Output: 4
// Explanation: The common factors of 12 and 6 are 1, 2, 3, 6.

// Example 2:
// Input: a = 25, b = 30
// Output: 2
// Explanation: The common factors of 25 and 30 are 1, 5.


// Constraints:
// 1 <= a, b <= 1000

// Approach 1
var commonFactors = function(a, b) {
    let count = 0;
    let num = 1;
    
    if(a<b)
    {
        while(num<=a)
        {
            if((a%num==0) && (b%num==0))
            {
                ++count;
            }
            ++num;
        }
    }
    else
    {
        while(num<=b)
        {
            if((a%num==0) && (b%num==0))
            {
                ++count;
            }
            ++num;
        }
    }
    return count;
};