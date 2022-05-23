let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.everyPolyfill) {
  Array.prototype.everyPolyfill = function (callbackFn, thisArg) {
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.everyPolyfill called on null or undefined');
    }
  
    if (typeof callbackFn !== 'function')
    {
      throw TypeError(`${callbackFn} is not a function`);
    }
  
    for (let i = 0; i < this.length; i++) 
    {
      if(!callbackFn.call(thisArg, this[i], i, this))
      {
        return false
      }
    }

    return true
  };
}

let result1 = arr1.everyPolyfill(function func1(item, index){
  console.log(this)                      // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
  return (2<item && item<1900)
})                                       // thisArg in line 12 will be undefined, since it is optional parameter for .call(), .call() will set global object as the context
console.log(result1)                     // true

let result2 = arr1.everyPolyfill(function func1(item, index){
  console.log(this)                      // [69, 1020, 865, 420, 32, 3]
  return (2<item && item<1900)
},arr1)                                  // thisArg in line 12 will be arr1 and that will be the execution context of callback (this)
console.log(result2)                     // true

// let result3 = arr1.every(function func2(item, index){
//   console.log(this)
//   return (2<item && item<1900)
// })
// console.log(result3)