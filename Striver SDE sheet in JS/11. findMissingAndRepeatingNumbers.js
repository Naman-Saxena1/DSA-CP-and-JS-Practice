// You are given a read only array of n integers from 1 to n.

// Each integer appears exactly once except A which appears 
// twice and B which is missing.

// Return A and B.

// Note: Your algorithm should have a linear runtime complexity. 
// Could you implement it without using extra memory?

// Note that in your output A should precede B.

// Example:
// Input:[3 1 2 5 3] 
// Output:[3, 4] 
// A = 3, B = 4


// Approach 1 - Brute Force Approach
function findMissingAndRepeatingNums(A){
    let a = []
    let valuesMap = new Map()

    A.forEach(num=>{
        if(valuesMap.get(num)>=1)
        {
            valuesMap.set(num, valuesMap.get(num)+1)
        }
        else
        {
            valuesMap.set(num, 1)
        }
    })

    for(let i=0; i<A.length; i++)
    {
        if(valuesMap.get(i+1) == 2)
        {
            a[0] = i+1
        }
        if(valuesMap.get(i+1) == undefined )
        {
            a[1] = i+1
        }
    }
    // Time complexity - O(2n)
    // Space complexity - O(n)          // Space due to map data structure

    return a
}

// console.log( findMissingAndRepeatingNums([1,2,3,5,2]) )


// Approach 2 - Sort input and then compare numbers with their next numbers
// Problem with this approach is it manipulates input array A
function findMissingAndRepeatingNums2(A){
    let a = []

    A.sort((a,b)=>a-b)

    for(let i=0; i<A.length; i++)
    {
        if(A[i] == A[i+1])
        {
            a[0] = i+1
        }
        if(A[i]+2 == A[i+1])
        {
            a[1] = i+1
        }
    }
    // Time complexity - O(nlogn) + O(n)
    // Space complexity - O(1nn)

    return a
}

// console.log( findMissingAndRepeatingNums2([1,2,3,5,2]) )


// Approach 3 
// Using sum of n numbers(1+2+3+...+n) 
// And sum of square of n numbers(1**2 + 2**2 + 3**2 + ... + n**2)
function findMissingAndRepeatingNums3(A){

    let length = A.length
    let differenceWithSumOfNNumbers = length*(length+1)/2
    let differenceWithSumOfNSquareNumbers = length*(length+1)*(2*length+1)/6

    for(let i=0; i<length; i++)
    {
        // S - [1 + 2 + 3 + 5 + 2]   -> X-Y
        differenceWithSumOfNNumbers -= A[i]                     
    }

    for(let j=0; j<length; j++)
    {
        // S**2 - [1**2 + 2**2 + 3**2 + 5**2 + 2**2]    -> X**2-Y**2
        differenceWithSumOfNSquareNumbers -= A[j]**2            
    }

    // X**2-Y**2/X-Y = (X+Y)(X-Y)/(X-Y) = X+Y
    let sumOfMissingAndRepeatingNum = differenceWithSumOfNSquareNumbers/differenceWithSumOfNNumbers         
    
    // (X-Y + X+Y)/2 = 2X/2 = X
    let firstNumber = ( differenceWithSumOfNNumbers + sumOfMissingAndRepeatingNum )/2           
    
    // X+Y - X = Y
    let secondNumber = sumOfMissingAndRepeatingNum - firstNumber 

    let a = []
    
    for(let k=0; k<length; k++)
    {
        if(A[k]===firstNumber)
        {
            a = [firstNumber, secondNumber]
            break;
        }
        if(A[k]===secondNumber)
        {
            a = [secondNumber, firstNumber]
            break;
        }
    }
    
    // Time complexity - O(3n)
    // Space complexity - O(1)

    return a
}

console.log( findMissingAndRepeatingNums3([1,2,3,5,2]) )


// Approach 4 - Using XOR
function findMissingAndRepeatingNums4(A){

    let xor = 0
    for(let i=0; i<A.length; i++)
    {
        xor ^= A[i]
        xor ^= i+1
    }

    let rightMostSetBit = xor & ~(xor-1)

    let bucket = [0,0]

    for(let j=0; j<A.length; j++)
    {
        if(A[j] & rightMostSetBit)
        {
            bucket[0] ^= A[j]
        }
        else
        {
            bucket[1] ^= A[j]
        }

        if(j+1 & rightMostSetBit)
        {
            bucket[0] ^= j+1
        }
        else
        {
            bucket[1] ^= j+1
        }
    }

    for(let k=0; k<A.length; k++)
    {
        if(A[k]===bucket[0])
        {
            break;
        }
        if(A[k]===bucket[1])
        {
            // Swap answer
            let temp = bucket[0]
            bucket[0] = bucket[1]
            bucket[1] = temp
            break;
        }
    }
    // Time complexity - O(3n)
    // Space complexity - O(1)

    return bucket
}

// console.log( findMissingAndRepeatingNums4([1,2,3,5,2]) )