let arr1 = [1, 1, [2, 2], [ [3, [4], 3], 2 ] ]

function flatFunc(originalArray,depth=1) {
  const resultArray = [];

  originalArray.forEach(item => {
    let depthForThisItem = depth
    if (Array.isArray(item) && depthForThisItem>0) {
      depthForThisItem -= 1
      resultArray.push(...flatFunc(item,depthForThisItem));
    } else {
      resultArray.push(item);
    }
  });
  
  return resultArray;
}

// Method 2
// function flatFunc(arr1, d = 1) {
//   return (
//     d > 0 
//     ? arr1.reduce( 
//       (acc, val) => acc.concat(Array.isArray(val) ? flatFunc(val, d - 1) : val), 
//       []
//     )
//     : arr1.slice()
//   )
// };

// Method 3 - Only 1 depth
// let flattenedArray = [].concat(...arr1)

console.log(flatFunc(arr1,2))