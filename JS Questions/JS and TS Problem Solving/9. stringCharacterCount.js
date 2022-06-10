// Given a string replace string with number times each character is repeated.
// Input: aaacdbbbb
// Output: a3c1d1b4

const stringWithCharCount = (inputString) => {
    let countObj = {}
    let resultString = ''

    for(let i=0; i<inputString.length; i++)
    {
        if(Object.keys(countObj).includes(inputString[i]))
        {
            countObj[inputString[i]] += 1
        }
        else
        {
            countObj[inputString[i]] = 1
        }
    }

    Object.entries(countObj).forEach(charEntry => {
        resultString += `${charEntry[0]}${charEntry[1]}`
    })

    return resultString
}

console.log(stringWithCharCount('aaacdbbbb'))