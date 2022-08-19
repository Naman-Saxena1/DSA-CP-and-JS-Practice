// You are given an n x n integer matrix grid.

// Generate an integer matrix maxLocal of size (n - 2) x (n - 2) such that:

// maxLocal[i][j] is equal to the largest value of the 3 x 3 matrix 
// in grid centered around row i + 1 and column j + 1.
// In other words, we want to find the largest value in every contiguous 
// 3 x 3 matrix in grid.

// Return the generated matrix.

// Example 1:
// Input: grid = [[9,9,8,1],[5,6,2,6],[8,2,6,4],[6,2,2,2]]
// Output: [[9,9],[8,6]]
// Explanation: The diagram above shows the original matrix and the generated matrix.
// Notice that each value in the generated matrix corresponds to the 
// largest value of a contiguous 3 x 3 matrix in grid.

// Example 2:
// Input: grid = [[1,1,1,1,1],[1,1,1,1,1],[1,1,2,1,1],[1,1,1,1,1],[1,1,1,1,1]]
// Output: [[2,2,2],[2,2,2],[2,2,2]]
// Explanation: Notice that the 2 is contained within every contiguous 3 x 3 matrix in grid.


// Constraints:
// n == grid.length == grid[i].length
// 3 <= n <= 100
// 1 <= grid[i][j] <= 100


// Approach 1
var largestLocal = function(grid) {
    let n = grid.length, subMatrixMax = 0, maxLocal = [];
    let l = n-2;
    
    for(let i=0; i<l; i++)
    {
        if(maxLocal[i]==undefined)
        {
            maxLocal.push([])
        }
        
        for(let j=0; j<l; j++)
        {
            subMatrixMax = 0
            
            for(let k=i; k<=i+2; k++)
            {
                for(let m=j; m<=j+2; m++)
                {
                    if(subMatrixMax<grid[k][m])
                    {
                        subMatrixMax = grid[k][m]
                    }
                }
            }
            maxLocal[i][j] = subMatrixMax
        }
    }
    
    return maxLocal
};


console.log(largestLocal(
    [
        [9,9,8,1],
        [5,6,2,6],
        [8,2,6,4],
        [6,2,2,2]
    ]
))

// Output
// [
//     [9,9],
//     [8,6]
// ]