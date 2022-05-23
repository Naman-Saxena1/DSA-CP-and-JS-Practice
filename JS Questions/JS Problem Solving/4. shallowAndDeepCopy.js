var obj1 = { 
    a: 1,
    b: { 
      c: 2
    }
}

//Method 1
// let obj2 = JSON.parse(JSON.stringify(obj1))
// obj2.a = 10;
// console.log(obj1);
// console.log(obj2);

//Method 2 - Currently not compatible in most browsers and versions
// let obj2 = structuredClone(obj1)
// obj2.a = 10;
// console.log(obj1);
// console.log(obj2);

//Method 3
function cloneObject(obj) {
    var clone = {};
    for(var i in obj) {
        if(obj[i] != null &&  typeof(obj[i])=="object")
            clone[i] = cloneObject(obj[i]);
        else
            clone[i] = obj[i];
    }
    return clone;
}
var newObj = cloneObject(obj1);
obj1.b.c = 20;

console.log(obj1); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } 