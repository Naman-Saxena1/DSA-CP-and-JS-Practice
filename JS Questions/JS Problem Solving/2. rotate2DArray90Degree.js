const rotate2DArray90Degree = (matrix) => {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < i; j++) {
        let swapVar = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = swapVar;
      }
    }
  
    matrix.forEach((rowArray) => rowArray.reverse());
    return matrix;
};

console.log(
    rotate2DArray90Degree([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
);  