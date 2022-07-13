// You are given an m x n integer matrix grid, 
// where you can move from a cell to any adjacent cell in all 4 directions.

// Return the number of strictly increasing paths in the grid 
// such that you can start from any cell and end at any cell. 
// Since the answer may be very large, return it modulo 109 + 7.

// Two paths are considered different if they do not have exactly 
// the same sequence of visited cells.

// Example 1:
// Input: grid = [[1,1],[3,4]]
// Output: 8
// Explanation: The strictly increasing paths are:
// - Paths with length 1: [1], [1], [3], [4].
// - Paths with length 2: [1 -> 3], [1 -> 4], [3 -> 4].
// - Paths with length 3: [1 -> 3 -> 4].
// The total number of paths is 4 + 3 + 1 = 8.

// Example 2:
// Input: grid = [[1],[2]]
// Output: 3
// Explanation: The strictly increasing paths are:
// - Paths with length 1: [1], [2].
// - Paths with length 2: [1 -> 2].
// The total number of paths is 2 + 1 = 3.


// Constraints:
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 1000
// 1 <= m * n <= 105
// 1 <= grid[i][j] <= 105


var countPaths = function(grid) {
    let mod = Math.pow(10, 9) + 7;
    let result = 0;
    let rows = grid.length, columns = grid[0].length;
    let dp = Array(rows).fill(null).map(_ => Array(columns).fill(0));

    let count = 0;
    const dfs = (r, c, preVal) => 
    {
        count += 1
        if (r < 0 || r == rows || c < 0 || c == columns || grid[r][c] <= preVal) 
        {
            // return 0 if any of below condition is true:
            // 1.   This cell is out of boundary, no path possible from and to this cell
            //      r < 0 || r == rows || c < 0 || c == columns
            // 2.   current cell value <= preVal, we are only counting "Strictly increasing paths" as per question
            return 0
        }
            
        if (dp[r][c]) 
        { 
            // Value already present, no need to re-calculate, directly return 
            return dp[r][c] 
        }
            
        // Paths possible for that cell 
        // = 1 (That cell itself)
        // + Sum of Bottom Traversal paths
        // + Sum of Top Traversal paths
        // + Sum of Right Traversal paths
        // + Sum of Left Traversal paths
        dp[r][c] =   ( 
                                1 + dfs(r + 1, c, grid[r][c])  + 
                                    dfs(r - 1, c, grid[r][c])  + 
                                    dfs(r , c + 1, grid[r][c]) +  
                                    dfs(r , c - 1, grid[r][c])   
                            ) % mod;

        return dp[r][c]
    }
    
    for(let i = 0; i < rows; i++) 
    {
        for(let j = 0; j < columns; j++) 
        {
            // Iterate through all cells to get sum of all paths possible from each cell
            result += dfs(i, j, -1) % mod;
        }
    }
    
    return result % mod;
};

console.log(countPaths([[1,1],[3,4]]))