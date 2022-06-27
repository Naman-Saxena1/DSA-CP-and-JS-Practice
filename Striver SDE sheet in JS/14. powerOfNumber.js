// Implement pow(x, n), which calculates x raised to the power n (i.e., xn).

// Example 1:
// Input: x = 2.00000, n = 10
// Output: 1024.00000

// Example 2:
// Input: x = 2.10000, n = 3
// Output: 9.26100

// Example 3:
// Input: x = 2.00000, n = -2
// Output: 0.25000
// Explanation: 2-2 = 1/22 = 1/4 = 0.25

// Constraints:
// -100.0 < x < 100.0
// -231 <= n <= 231-1
// -104 <= xn <= 104

// Approach 1 - Brute Force Approach
var myPow1 = function(x, n) {
    let result;
    
    if(x==1 || n==0)
    {
        return 1
    }
    
    if(x==-1)
    {
        if(n%2==0)
        {
            return 1
        }
        else
        {
            return -1
        }
    }
    
    if(n>=1)
    {   
        result = x;
        while(n>1)
        {
            result *= x 
            --n
        }
    }
    else
    {
        if(n<0)
        {
            result = 1
            while(n<0)
            {
                result /= x 
                ++n
            }
        }
    }
    // Time complexity - O(n)
    // Space complexity - O(1)
    
    return  result
};


// Approach 2 - Binary Exponentiation
var myPow = function(x, n) {
    let result = 1;
    let currentPower = n

    if(currentPower<0)
    {
        currentPower *= -1
    }

    while(currentPower)
    {
        if(currentPower%2 == 0)
        {
            x = x*x
            currentPower /= 2
        }
        else
        {
            result *= x
            currentPower -= 1
        }
    }

    if(n<0)
    {
        result = 1/result
    }
    // Time complexity - O(n logn)
    // Space complexity - O(1)

    return result
};

console.log(myPow(2.00000,7))