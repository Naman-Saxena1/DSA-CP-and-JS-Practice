// You are given an m x n integer matrix grid.

// We define an hourglass as a part of the matrix with the following form:
// Return the maximum sum of the elements of an hourglass.

// Note that an hourglass cannot be rotated and must be entirely contained within the matrix.

// Example 1:
// Input: grid = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
// Output: 30
// Explanation: The cells shown above represent the hourglass with the maximum sum: 6 + 2 + 1 + 2 + 9 + 2 + 8 = 30.

// Example 2:
// Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
// Output: 35
// Explanation: There is only one hourglass in the matrix, with the sum: 1 + 2 + 3 + 5 + 7 + 8 + 9 = 35.
 

// Constraints:
// m == grid.length
// n == grid[i].length
// 3 <= m, n <= 150
// 0 <= grid[i][j] <= 106

// Approach 1
var maxSum = function(grid) {
    let m = grid.length;
    let n = grid[0].length;
    let startRow = 0;
    let maxSum = 0, currentSum = 0;
    
    while(startRow!=m-2)
    {
        let topBarSum = 0, middleNum = 0, bottomBarSum = 0;
        let startCol = 0;
        let j = 0;
        
        while(startCol!=n-2)
        {
            currentSum = grid[startRow][startCol] + grid[startRow][startCol+1] + grid[startRow][startCol+2]
            + grid[startRow+1][startCol+1] + grid[startRow+2][startCol] + grid[startRow+2][startCol+1] + grid[startRow+2][startCol+2]
            
            if(maxSum<currentSum)
            {
                maxSum = currentSum
            }
            
            ++startCol;
        }
        ++startRow;
    }
    
    return maxSum;
};