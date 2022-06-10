const getFirstNonRepeatChar = (inputString) => {
  let nonRepeatCharObj = {},
    resultIndex = -1;

  for (let index in inputString) {
    if (nonRepeatCharObj[inputString[index]] === undefined) {
      nonRepeatCharObj[inputString[index]] = [Number(index), 1];
    } else {
      nonRepeatCharObj[inputString[index]] = [
        nonRepeatCharObj[inputString[index]][0],
        nonRepeatCharObj[inputString[index]][1] + 1
      ];
    }
  }

  for (let index in nonRepeatCharObj) {
    if (nonRepeatCharObj[index][1] === 1) {
      resultIndex = index;
      break;
    }
  }

  return resultIndex;
};

console.log(getFirstNonRepeatChar("nneeooggccgaammpp"));

// {
//   "n": [0,1],      -> key=letter, [index, count]
//   "e": [2,1]
// }