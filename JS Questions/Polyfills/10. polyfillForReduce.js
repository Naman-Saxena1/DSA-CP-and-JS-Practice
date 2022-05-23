let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.reducePolyfill) {
  Array.prototype.reducePolyfill = function (callbackFn, initialValue) {
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.reducePolyfill called on null or undefined');
    }
  
    if (typeof callbackFn !== 'function')
    {
      throw TypeError(`${callbackFn} is not a function`);
    }

    let accumulator = initialValue;
    let startIndex = 0;

    if (initialValue == null) {
      accumulator = this[0];
      startIndex = 1;
    }

    if(accumulator == null)
      throw TypeError('Reduce of empty array with no initial value');

    for(let index = startIndex; index < this.length; index++) 
    {
      accumulator = callbackFn(accumulator, this[index], index, this);
    }

    return accumulator;
  };
}

let result1 = arr1.reducePolyfill(function func1(accumulator, value, currentIndex, array){
    console.log(this)                     // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
    return accumulator+value
})                                      
console.log(result1)                      // 2409

let result2 = arr1.reducePolyfill(function func1(accumulator, value, currentIndex, array){
    console.log(this)                     // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
    return accumulator+value
},0)                                      
console.log(result2)                      // 2409

// let result3 = arr1.reduce(function func2(accumulator, value){
//   console.log(this)
//   return accumulator+value
// })
// console.log(result3)





// Use of reduce 4th parameter - array
// Here is a (slightly) less-contrived example to sum up unique values in an array, 
// skipping duplicates, using the index and array arguments to find unique values:

// [0, 1, 2, 3, 2, 1, 0].reduce(function(previousValue, currentValue, index, array) 
// {
//   return array.indexOf(currentValue) === index ? // value used already?
//          previousValue + currentValue :  // not used yet, add to sum
//          previousValue; // used already, skip currentValue
// }); // == 6  ( 0+1+2+3 )