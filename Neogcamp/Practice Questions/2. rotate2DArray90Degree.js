const rotate2DArray90Degree = (inputArray) => {
    for (let i = 0; i < inputArray.length; i++) {
      for (let j = 0; j < i; j++) {
        let swapVar = inputArray[i][j];
        inputArray[i][j] = inputArray[j][i];
        inputArray[j][i] = swapVar;
      }
    }
  
    inputArray.forEach((rowArray) => rowArray.reverse());
    return inputArray;
};

console.log(
    rotate2DArray90Degree([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ])
);  