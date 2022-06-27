// There is a robot on an m x n grid. 
// The robot is initially located at the top-left corner (i.e., grid[0][0]). 
// The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). 
// The robot can only move either down or right at any point in time.

// Given the two integers m and n, 
// return the number of possible unique paths that the robot can take to reach 
// the bottom-right corner.

// The test cases are generated so that the answer will be 
// less than or equal to 2 * 109.

// Example 1:
// Input: m = 3, n = 7
// Output: 28

// Example 2:
// Input: m = 3, n = 2
// Output: 3
// Explanation: From the top-left corner, 
// there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Down -> Down
// 2. Down -> Down -> Right
// 3. Down -> Right -> Down

// Constraints:
// 1 <= m, n <= 100


// Approach 1 - Brute Force Approach
// Recursively explore all paths and count them
var uniquePaths = function(m, n) {
    
    function countPaths(i, j)
    {
        if(i==m-1 && j==n-1)
        {
            return 1
        }
        
        if(i>=m || j>=n)
        {
            return 0
        }
        else
        {
            return countPaths(i+1,j) + countPaths(i,j+1)    
        }
    }
    // Time complexity - Exponential
    // Space complexity - Exponential

    return countPaths(0,0)
};


// Approach 2 - Dynammic Programming with cache table
var uniquePaths = function(m, n) {

    let cache = []
    
    for(let k=0; k<m; k++)
    {
        let subArray = []
        for(let l=0; l<n; l++)
        {
            subArray[l] = -1
        }
        cache.push(subArray)
    }

    function countPaths(i, j)
    {
        if(i==m-1 && j==n-1)
        {
            cache[i][j] = 1
            return 1
        }
        
        if(i>=m || j>=n)
        {
            return 0
        }
        else
        {
            if(cache[i][j]!=-1)
            {
                return cache[i][j]
            }
            cache[i][j] = countPaths(i+1,j) + countPaths(i,j+1)   
            return cache[i][j]    
        }
    }
    // Time complexity - O(m*n)
    // Space complexity - O(m*n)

    return countPaths(0,0)
};

console.log(uniquePaths(3,4))


// Approach 3 - Combinatorics Solution
var uniquePaths = function(m, n) {
    let N = m + n -2
    let r = m<n?m-1:n-1
    let result = 1

    for(let i=1; i<=r; i++)
    {
        result = result *(N-r+i)/i
    }

    return result
}