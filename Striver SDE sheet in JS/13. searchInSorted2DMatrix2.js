// This is another variant of 2D Matrix search problem
// Write an efficient algorithm that searches for a value 
// target in an m x n integer matrix matrix. 
// This matrix has the following properties:

// Integers in each row are sorted in ascending from left to right.
// Integers in each column are sorted in ascending from top to bottom.

// Input: 
// matrix = [
//     [ 1, 4, 7,11,15],
//     [ 2, 5, 8,12,19],
//     [ 3, 6, 9,16,22],
//     [10,13,14,17,24],
//     [18,21,23,26,30]
// ], target = 5
// Output: true

// Input: 
// matrix = [
//     [ 1, 4, 7,11,15],
//     [ 2, 5, 8,12,19],
//     [ 3, 6, 9,16,22],
//     [10,13,14,17,24],
//     [18,21,23,26,30]
// ], target = 20
// Output: false

var searchMatrix = function(matrix, target) {
    
    let i=0; 
    let j=matrix[0].length-1;
    
    while(i<matrix.length && j>=0)
    {
        if(matrix[i][j]===target)
        {
            return true
        }
        
        if(target<matrix[i][j])
        {
            --j
        }
        else
        {
            ++i
        }
    }
    // Time complexity - O(m+n)
    // Space complexity - O(1)

    return false
};