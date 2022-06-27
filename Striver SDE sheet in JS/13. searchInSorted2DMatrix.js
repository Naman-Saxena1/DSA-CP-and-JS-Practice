// Given an m*n 2D matrix and an integer, 
// write a program to find if the given integer exists in the matrix.

// Given matrix has the following properties:

// Integers in each row are sorted from left to right.
// The first integer of each row is greater than the last integer 
// of the previous row.

// Example 1
// Input: matrix = 
// [[1,3,5,7],
//  [10,11,16,20],
//  [23,30,34,60]], 

// target = 3

// Output: true

// Explanation: 
// As the given integer(target) exists in the given 2D matrix, 
// the function has returned true.

// Example 2
// Input: matrix = 
// [[1,3,5,7],
//  [10,11,16,20],
//  [23,30,34,60]], 

// target = 13

// Output: false

// Explanation: As the given integer(target) does not exist in the given 2D matrix, 
// the function has returned false.



// Approach 1 - Brute Force Approach
var searchMatrix = function(matrix, target) {
    let isTargetFound = false
    
    for(let i=0; i<matrix.length; i++)
    {
        matrix[i].forEach(num=>{
            if(num===target)
            {
                isTargetFound = true
            }
        })
    }
    // Time complexity - O(m*n)
    // Space complexity - O(1)
    
    return isTargetFound
};


// Approach 2
// 2 Binary Searches
// 1st Binary Search to find row whose low<=target && target<high+1
// 2nd Binary Search to find our target is selected row,
// if target is not found in the second Binary Search, 
// we can safely conclude it doesn't exist in the matrix
var searchMatrix = function(matrix, target) {
    let isTargetFound = false
    let rowLow = 0, rowHigh = matrix.length-1, rowMid;
    let rowLength = matrix[0].length;
    
    while(rowLow<=rowHigh || matrix.length==1)
    {
        // Binary search to find row with right range of numbers
        rowMid = Math.floor((rowLow+rowHigh)/2)
        
        if(matrix[rowMid][0]<=target && target<matrix[rowMid][rowLength-1]+1)
        {
            // Row's range is right, target might exist in this row
            // If target doen't exist in this row, it does not exist in the matrix
            let colLow = 0, colHigh = rowLength-1;   
            while(colLow<=colHigh)
            {
                // Binary Search on final row
                colMid = Math.floor((colLow+colHigh)/2)
                if (target === matrix[rowMid][colMid]) 
                {
                    isTargetFound = true
                    break;
                }
                if (target < matrix[rowMid][colMid]) 
                {
                  colHigh = colMid - 1
                } 
                else 
                {
                  colLow = colMid + 1
                }        
            }
            break;
        }
        else
        {
            if(matrix.length===1)
            {
                break;
            }
            else
            {
                if(matrix[rowMid][0]<target)
                {
                    // Target might exist in next rows
                    if(matrix[rowMid+1] == undefined || target<matrix[rowMid+1][0])
                    {
                        break;
                    }
                    rowLow = rowMid + 1
                }
                else
                {
                    // Target might exist in previous rows
                    if(matrix[rowMid-1] == undefined || matrix[rowMid-1][rowLength-1]<target)
                    {
                        break;
                    }
                    rowHigh = rowMid - 1

                }
            } 
        }
    }
    // m - Rows and n - Columns
    // Time Complexity - O(logm) + O(logn) = O(log(m*n))
    // O(logm) to find correct row in m no. of rows
    // O(logn) to search target in selected row of n no. of columns - Will run ONLY on final Row
    // Space Complexity - O(1)
    
    return isTargetFound
};

console.log(searchMatrix( [[1],[3]], 2 ))