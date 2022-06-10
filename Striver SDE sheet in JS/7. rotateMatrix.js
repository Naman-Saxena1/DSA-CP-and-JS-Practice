// You are given an n x n 2D matrix representing an image, 
// rotate the image by 90 degrees (clockwise).

// You have to rotate the image in-place, 
// which means you have to modify the input 2D matrix directly. 
// DO NOT allocate another 2D matrix and do the rotation.

var rotate = function(matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        let swapVar = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = swapVar;
      }
    }
  
    matrix.forEach((rowArray) => rowArray.reverse());

    // Time complexity - O(n^2) + O(n^2)
    // Space complexity - O(1)
    
    return matrix;
};