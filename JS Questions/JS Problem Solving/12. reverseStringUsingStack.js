// Reverse a string using stack
// Input: "Apple"
// Output: "elppA"

const reverseStringUsingStack = (inputString) => {
    let reversedArray = []

    for(let i = inputString.length-1; i>=0; i--)
    {
        reversedArray.push(inputString[i]) 
    }

    return reversedArray.join('')
}

console.log(reverseStringUsingStack("Apple"))