Array.prototype.myRemoveDuplicates = function () {
    let countMap = new Map();
  
    for (let i = 0; i < this.length; i++) {
      if (countMap.get(this[i]) === undefined) {
        countMap.set(this[i], true);
      } else {
        this.splice(i, 1);
        i--;
      }
    }
    // Time complexity - O(n)
    // Space complexity - O(n)
  
    return arr1;
};

let arr1 = [2, 5, 7, 8, 5, 2, 2, 1, 8];
let uniqueItemsArray = arr1.myRemoveDuplicates();
console.log(uniqueItemsArray);