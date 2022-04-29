const bubbleSortArray = (inputUnsortedArray) => {

    for(let i=0 ; i<inputUnsortedArray.length-1 ; i++)
    {
        for(let j=0 ; j<inputUnsortedArray.length-1-i ; j++)
        {
            if(inputUnsortedArray[j]>inputUnsortedArray[j+1])
            {
                let swapVariable = inputUnsortedArray[j]
                inputUnsortedArray[j] = inputUnsortedArray[j+1]
                inputUnsortedArray[j+1] = swapVariable
            }
        }
    }
    return inputUnsortedArray
}

console.log(bubbleSortArray([69, 865, 420, 32, 3, 50]));