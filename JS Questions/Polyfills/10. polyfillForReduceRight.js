// Implementing own reduceRight function
let arr1 = [69, 1020, 865, 420, 32, 3]

if (!Array.prototype.reduceRightPolyfill) {
    Array.prototype.reduceRightPolyfill = function (callbackFn, initialValue) {
      if (this == null || this === window)
      {
        throw TypeError('Array.prototype.reducePolyfill called on null or undefined');
      }
    
      if (typeof callbackFn !== 'function')
      {
        throw TypeError(`${callbackFn} is not a function`);
      }
  
      let accumulator = initialValue;
      let endIndex = this.length-1;
  
      if (initialValue == null) {
        accumulator = this[this.length-1];
        endIndex = this.length-2;
      }
  
      if(accumulator == null)
        throw TypeError('Reduce of empty array with no initial value');
  
      for(let index = endIndex ; index>=0 ; index--) 
      {
        accumulator = callbackFn(accumulator, this[index], index, this);
      }
  
      return accumulator;
    };
}

let result1 = arr1.reduceRightPolyfill(function func1(accumulator, value, currentIndex, array){
    console.log(this)                     // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
    return accumulator+value
})                                      
console.log(result1)                      // 2409

let result2 = arr1.reduceRightPolyfill(function func1(accumulator, value, currentIndex, array){
    console.log(this)                     // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …} for each item
    return accumulator+value
},0)                                      
console.log(result2)                      // 2409