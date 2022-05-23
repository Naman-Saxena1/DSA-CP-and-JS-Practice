let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.findIndexPolyfill) {
  Array.prototype.findIndexPolyfill = function (callbackFn, thisArg) {
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.findIndexPolyfill called on null or undefined');
    }
  
    if (typeof callbackFn !== 'function')
    {
      throw TypeError(`${callbackFn} is not a function`);
    }
  
    for (let index = 0; index < this.length; index++) 
    {
        if(callbackFn.call(thisArg, this[index], index, this))
        {
            return index
        }
    }

    return -1
  };
}

let result1 = arr1.findIndexPolyfill(function func1(item, index){
  console.log(this)                      // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
  return item%7==0
})                                       // thisArg in line 12 will be undefined, since it is optional parameter for .call(), .call() will set global object as the context
console.log(result1)                     // 3

let result2 = arr1.findIndexPolyfill(function func1(item, index){
  console.log(this)                      // (6) [69, 1020, 865, 420, 32, 3] for each item
  return item%11==0
},arr1)                                  // thisArg in line 12 will be arr1 and that will be the execution context of callback (this)
console.log(result2)                     // 3

// let result3 = arr1.findIndex(function func2(item, index){
//   console.log(this)
//   return item%7==0
// })
// console.log(result3)