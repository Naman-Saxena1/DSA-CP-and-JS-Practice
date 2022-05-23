let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.forEachPolyfill) {
  Array.prototype.forEachPolyfill = function (callbackFn, thisArg) {
    if (this == null || this === window)
    {
      throw TypeError('Array.prototype.forEachPolyfill called on null or undefined');
    }
  
    if (typeof callbackFn !== 'function')
    {
      throw TypeError(`${callbackFn} is not a function`);
    }
  
    for (let i = 0; i < this.length; i++) 
    {
      callbackFn.call(thisArg, this[i], i, this);
    }
  };
}

arr1.forEachPolyfill(function func1(item, index){
  console.log(this)                   // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
  console.log(`${index}: ${item}`)
})                                    // thisArg in line 12 will be undefined, since it is optional parameter for .call(), .call() will set global object as the context

arr1.forEachPolyfill(function func1(item, index){
  console.log(this)                   // (6) [69, 1020, 865, 420, 32, 3] for each item
  console.log(`${index}: ${item}`)
},arr1)                               // thisArg in line 12 will be arr1 and that will be the execution context of callback (this)

// arr1.forEach(function func2(item, index){
//   console.log(this)
//   console.log(`${index}: ${item}`)
// })