let arr1 = [1, 1, [2, 2], [ [3, [4], 3], 2 ] ]

if (!Array.prototype.flatPolyfill) 
{
	Array.prototype.flatPolyfill =  function flatPolyfill (depth=1) 
                        {
                            let originalArray = this;
                            const resultArray = [];

                            originalArray.forEach(item => {
                                
                                let depthForThisItem = depth
                                if (Array.isArray(item) && depthForThisItem>0) 
                                {
                                    depthForThisItem -= 1
                                    resultArray.push(...item.flatPolyfill(depthForThisItem));
                                } 
                                else 
                                {
                                    resultArray.push(item);
                                }
                            });
                            
                            return resultArray;
                        }
}

let result1 = arr1.flatPolyfill()                                       
console.log(result1)                     // [ 1, 1, 2, 2, [ 3, [ 4 ], 3 ], 2 ]

let result2 = arr1.flatPolyfill(2)                                 
console.log(result2)                     // [ 1, 1, 2, 2, 3, [ 4 ], 3, 2 ]

// let result3 = arr1.flat()
// console.log(result3)