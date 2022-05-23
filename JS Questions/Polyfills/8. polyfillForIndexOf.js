let arr1 = [69, 1020, 865, 32, 420, '865', 3]

if (!Array.prototype.indexOfPolyfill) {
  Array.prototype.indexOfPolyfill = function (searchElement, fromIndex=0) {
  
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.indexOfPolyfill called on null or undefined');
    }

    for (fromIndex; fromIndex < this.length; fromIndex++) 
    {
      if(this[fromIndex] == searchElement)
      {
        return fromIndex
      }
    }

    return -1
  };
}

let result1 = arr1.indexOfPolyfill(865)  
console.log(result1)                     // 2

let result2 = arr1.indexOfPolyfill(865,3)  
console.log(result2)                     // 5

// let result3 = arr1.indexOf(865)
// console.log(result3)

// indexOf is type insensitive