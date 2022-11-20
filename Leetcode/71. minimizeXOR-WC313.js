// Given two positive integers num1 and num2, find the positive integer x such that:

// x has the same number of set bits as num2, and
// The value x XOR num1 is minimal.
// Note that XOR is the bitwise XOR operation.

// Return the integer x. The test cases are generated such that x is uniquely determined.

// The number of set bits of an integer is the number of 1's in its binary representation.

 

// Example 1:
// Input: num1 = 3, num2 = 5
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0011 and 0101, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.

// Example 2:
// Input: num1 = 1, num2 = 12
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0001 and 1100, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.


// Constraints:
// 1 <= num1, num2 <= 109


// Approach 1
var minimizeXor = function(num1, num2) {
    
    function countNoOfSetBits(num)
    {
        let count = 0;
        
        while(num)
        {
            if((num&1)!==0)
            {
                ++count;
            }
            num = num>>>1
        }
        
        return count;
    }
    
    let num1SetBits = countNoOfSetBits(num1)
    let num2SetBits = countNoOfSetBits(num2)
    let n = 0;
    
    if(num1SetBits==num2SetBits)
    {
        return num1
    }
    else
    {
        if(num1SetBits<num2SetBits)
        {
            let extra = num2SetBits-num1SetBits;
            while(extra)
            {
                while((num1 & (1<<n))!==0)
                {
                    ++n;
                }
                num1 = num1 | (1<<n);
                ++n;
                --extra;
            }
            
            return num1
        }
        else
        {
            let deficient = num1SetBits-num2SetBits;
            while(deficient)
            {
                while((num1 & (1<<n))===0)
                {
                    ++n;
                }
                num1 = num1 & ~(1 << (n+1-1));
                ++n;
                --deficient;
            }
                
            return num1
        }
    }
};