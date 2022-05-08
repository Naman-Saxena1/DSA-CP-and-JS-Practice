function merge(left, right) {
  let arr = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      arr.push(left.shift());
    } else {
      arr.push(right.shift());
    }
  }
  return [...arr, ...left, ...right];
}

const mergeSort = (inputArray) => {
  const half = inputArray.length / 2;

  if (inputArray.length < 2) {
    return inputArray;
  }

  const left = inputArray.splice(0, half);
  return merge(mergeSort(left), mergeSort(inputArray));
};

let arrayToSort = [69, 1020, 865, 420, 32, 3]
console.log(mergeSort(arrayToSort));