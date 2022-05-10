// Given a matrix if an element in the matrix is 0 then you 
// will have to set its entire column and row to 0 and then 
// return the matrix.

// Examples 1:

// Input: matrix=[[1,1,1],[1,0,1],[1,1,1]]

// Output: [[1,0,1],[0,0,0],[1,0,1]]

// Explanation: Since matrix[2][2]=0.
// Therfore the 2nd column and 2nd row wil be set to 0.
 
// Input: matrix=[[0,1,2,0],[3,4,5,2],[1,3,1,5]]

// Output:[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

// Explanation:Since matrix[0][0]=0 and matrix[0][3]=0. 
// Therefore 1st row, 1st column and 4th column will be set to 0



// Approch - 1 (Using 2 dummy arrays for reference) 
// const setMatrixZero = (matrix) => {

//     let zeroCoordinatesX = [], zeroCoordinatesY = []

//     for(let i=0; i<matrix.length; i++)
//     {
//         for(let j=0; j<matrix[i].length; j++)
//         {
//             if(matrix[i][j]===0)
//             {
//                 // Push i and j values to zeroCoordinates array
//                 zeroCoordinatesX[i] = 0
//                 zeroCoordinatesY[j] = 0
//             }    
//         }
//     }
//     // Time complexity = O(m*n)

//     for(let k=0; k<matrix.length; k++)
//     {
//         for(let l=0; l<matrix[k].length; l++)
//         {
//             if(zeroCoordinatesX[k]===0||zeroCoordinatesY[l]===0)
//             {
//                 matrix[k][l] = 0
//             }
//         }
//     }
//     // Time complexity = O(m*n)

//     // m -> No. of rows 
//     // n -> No. of cols 
//     // Total Time complexity = O(m*n + m*n)
//     // Total Space complexity = O(m+n)

//     return matrix
// }





// Approch 2 - Using dummy array inside matrix itself 
// (Reduces space complexity by not using 2 dummy arrays)
const setMatrixZero = (matrix) => {

    let col0 = 1, rows = matrix.length, cols = matrix[0].length;

    for(let i=0; i<rows; i++)
    {
        if(matrix[i][0]===0)
        {
            col0 = 0
        }
        for(let j=1; j<cols; j++)
        {
            if(matrix[i][j]===0)
            {
                matrix[i][0] = 0
                matrix[0][j] = 0
            }    
        }
    }
    // Time complexity = O(m*n)

    // Traversing matrix from reverse 
    // and updating values as per dummy row/column and col0 
    for(let k=rows-1; k>=0; k--)
    {
        for(let l=cols-1; l>=1; l--)
        {
            if(matrix[k][0]===0||matrix[0][l]===0)
            {
                matrix[k][l] = 0
            }
        }
        if(col0===0)
        {
            // Now since this k row has been updated, 
            // we can update dummy as per col0
            matrix [k][0] = 0
        }
    }
    // Time complexity = O(m*n)
    // Total Time complexity = O(m*n + m*n)
    // Total Space complexity = O(1)

    return matrix
}

console.log(setMatrixZero([[-4,-2147483648,6,-7,0],[-8,6,-8,-6,0],[2147483647,2,-9,-6,-10]]))