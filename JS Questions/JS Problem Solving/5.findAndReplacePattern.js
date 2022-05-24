// Input -
// Array - ["a","b","x","y","h"]
// Pattern to Find (Can be dynamic - No hardcoding values) - ["b","x"]
// Replacement of the pattern - ["p","q","r"]

// Output -
// ["a","p","q","r","y","h"]

const replacePatternInArray = (originalArray, patternArray, replacementArray) => {
    let newArray = [], skipCount = 0;

    // originalArray    -> ["a","b","x","y","h"]
    // patternArray     -> ["b","x"]
    // replacementArray -> ["p","q","r"]

    for(let index1 = 0; index1<originalArray.length; index1++)
    {
        if(skipCount===0)
        {
            if(originalArray[index1]===patternArray[0])
            {
                //Pattern starts with current element
                if(patternArray.length>1)
                {
                    let originalArrayIndex = index1+1;
                    let patternExistsFlag = true;

                    //Checking if whole pattern matches exists
                    for(let index2 = 1; index2<patternArray.length; index2++)
                    {
                        if(patternArray[index2]!==originalArray[originalArrayIndex])
                        {
                            patternExistsFlag = false;
                        }
                        originalArrayIndex += 1
                    }

                    if(patternExistsFlag)
                    {
                        newArray.push(...replacementArray)
                        skipCount = patternArray.length-1
                    }
                    else
                    {
                        newArray.push(originalArray[index1])
                    }
                }
                else
                {
                    newArray.push(...replacementArray)
                }
            }
            else
            {
                //Pattern does not start with Current element, 
                //simply push current element 
                newArray.push(originalArray[index1])
            }
        }
        else
        {
            skipCount -= 1;
        }
    }
    return newArray
}

console.log(replacePatternInArray(["a","b","x","y","h","b","x","z","g"],["b","x"],["p","q","r"]))