// Given an integer N, return the first N rows of Pascal’s triangle.
// In Pascal’s triangle, each number is the sum of the two numbers directly above it

// Input Format: N = 5

// Result:
//     1
//    1 1
//   1 2 1
//  1 3 3 1
// 1 4 6 4 1

// Explanation: 
// There are 5 rows in the output matrix. 
// Each row corresponds to each one of the rows in the image shown above.

// [
//     [1],
//     [1,1],
//     [1,2,1],
//     [1,3,3,1],
//     [1,4,6,4,1]
// ]

const generatePascalTriangle = (numRows) => {
    let pascalTriangle = []

    for(let i=0; i<numRows; i++)
    {
        pascalTriangle.push([])
        for(let j=0; j<=i; j++)
        {
            if(j==0 || j==i)
            {
                pascalTriangle[i].push(1)
            }
            else
            {
                pascalTriangle[i].push(pascalTriangle[i-1][j-1]+pascalTriangle[i-1][j])
            }
        }
    }
    // Time complexity = O(n^2) 
    // Space complexity = O(n)

    return pascalTriangle
}

console.log(generatePascalTriangle(6))





// Pascal Triangle question - Variation 2
// Given row and column number, print corresponding element of pascal triangle

let f = [];
const factorial = (n) => 
{
  if (n == 0 || n == 1)
  {
    return 1;
  }
  if (f[n] > 0)
  {
    return f[n];
  }
  return f[n] = factorial(n-1) * n;
}

const pascalTriangleSpecificElement = (row, column) => {
    let n = row - 1
    let r = column - 1

    let nCr = factorial(n)/(factorial(r)*factorial(n-r))
    // Time complexity = O(n) 
    // Space complexity = O(1)

    return nCr
}

console.log(pascalTriangleSpecificElement(5, 3))





// Pascal Triangle question - Variation 3
// Print nth row of Pascal Triangle
const generatePascalTriangleNthRow = (rowNumber) =>
{
    let pascalTriangleRow = [1]

    // nC0 = 1
    let prev = 1;
 
    for(let i = 1; i <= rowNumber; i++)
    {   
        // nCr = (nCr-1 * (n - r + 1))/r
        let curr = (prev * (rowNumber - i + 1)) / i;
        pascalTriangleRow.push(curr)
        prev = curr;
    }
    // Time complexity = O(n) 
    // Space complexity = O(n)

    return pascalTriangleRow
}

console.log(generatePascalTriangleNthRow(4))