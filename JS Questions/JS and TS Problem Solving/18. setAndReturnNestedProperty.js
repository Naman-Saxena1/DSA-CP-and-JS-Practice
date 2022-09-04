function getNestedValue(obj1, nestedProperty, targetValue)
{
  let nestedPropertyArr = nestedProperty.split('.')
  let currentObj = obj1

  for(let i=0; i<nestedPropertyArr.length; i++)
  {
    
    if(currentObj[nestedPropertyArr[i]]==undefined)
    {
      if(i==nestedPropertyArr.length-1)
      {
        currentObj[nestedPropertyArr[i]] = targetValue
        return obj1
      }
      currentObj[nestedPropertyArr[i]] = {}
    }
    else
    {
      if(i==nestedPropertyArr.length-1)
      {
        return currentObj[nestedPropertyArr[i]]
      }
    }

    currentObj = currentObj[nestedPropertyArr[i]]
  }
}

// Test case 1
var obj1 = { a: { b: { c: { d: 'hello' } } } };
// if value is not there then set the value
var output1 = getNestedValue(obj1, 'a.b.c.d', 'hi');
console.log('output1:', output1);
// found so return value i.e hello

// Test case 2
var obj2 = { u: { v: { w: { x: 'hello' } } } };
var output2 = getNestedValue(obj2, 'u.v.w.k', 'hi');
console.log('output2:', JSON.stringify(output2));
// not found so return the object
// var obj2 = {u: {v: {w: {x: "hello", k: "hi"}}}};

var output3 = getNestedValue(obj1, 'a.b.m.n', 'hi');
console.log('output:3', JSON.stringify(output3));
// var obj3 = {
//   a: {
//     b: {
//       c: {
//         p: 'hello',
//         d: 'hi',
//       },
//       m: {
//         n: 'hi',
//       },
//     },
//   },
// };
